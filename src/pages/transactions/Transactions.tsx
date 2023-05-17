import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import Transaction from "../../models/Transaction";

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [formState, setFormState] = useState({
    type: "",
    amount: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setSelectedTransaction((prevTransaction) => {
      if (prevTransaction) {
        return {
          ...prevTransaction,
          [name]: value,
        };
      }
      return null;
    });
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/api/transactions/${id}`, {})
      .then((res) => {
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    closeModal();

    axios
      .post("http://localhost:3000/api/transactions", {
        type: formState.type,
        amount: formState.amount,
        description: formState.description,
      })
      .then((res) => {
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    setFormState({
      type: "",
      amount: "",
      description: "",
    });
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    closeModal();

    axios
      .put(
        `http://localhost:3000/api/transactions/${selectedTransaction!.id}`,
        {
          ...selectedTransaction,
          transactionDate: new Date(selectedTransaction!.transactionDate),
        }
      )
      .then((res) => {
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    setSelectedTransaction(null);
  };

  const openModal = (transaction: Transaction | null) => {
    setSelectedTransaction(transaction);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTransaction(null);
    setFormState({
      type: "",
      amount: "",
      description: "",
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/transactions"
      );
      const formattedTransactions = response.data.map(
        (transaction: Transaction) => ({
          ...transaction,
          transactionDate: transaction.transactionDate.split("T")[0],
        })
      );
      setTransactions(formattedTransactions);
      setSelectedTransaction(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold my-1">Cards</h1>
        <button
          onClick={() => {
            setModalTitle("Create");
            openModal(null);
          }}
          className="bg-indigo-500 w-36 hover:bg-indigo-600 text-white font-bold rounded sm:w-40 lg:w-40"
        >
          Create Transaction
        </button>
      </div>
      <div className="w-full h-full text-center">
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <ClipLoader color="#000000" loading={loading} size={35} />
          </div>
        ) : (
          <table className="w-full h-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Transaction Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction: Transaction) => (
                <tr className="border-b" key={transaction.id}>
                  <td className="py-2 px-4">{transaction.type}</td>
                  <td className="py-2 px-4">{transaction.amount}</td>
                  <td className="py-2 px-4">{transaction.description}</td>
                  <td className="py-2 px-4">{transaction.transactionDate}</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-evenly">
                      <button
                        onClick={() => {
                          setModalTitle("Edit");
                          openModal(transaction);
                        }}
                        className="text-yellow-500"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {
                          setModalTitle("Delete");
                          handleDelete(transaction.id);
                        }}
                        className="text-red-500"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalTitle === "Create" ? (
          <>
            <h2 className="text-2xl font-bold mb-3">Create Transaction</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="type">
                  Type
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  name="type"
                  id="type"
                  value={formState.type}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="amount"
                  name="amount"
                  value={formState.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-gray-800"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : modalTitle === "Edit" && selectedTransaction ? (
          <>
            <h2 className="text-2xl font-bold mb-3">Edit Card</h2>
            <form onSubmit={handleEdit} className="w-full max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="type">
                  Type
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  name="type"
                  id="type"
                  value={selectedTransaction.type}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="amount"
                  name="amount"
                  value={selectedTransaction.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-gray-800"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  id="description"
                  name="description"
                  value={selectedTransaction.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default Transactions;
