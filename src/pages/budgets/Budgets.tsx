import axios from "axios";
import Budget from "../../models/Budget";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { MdDelete, MdEdit, MdAttachMoney } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const Budgets = () => {
  const [loading, setLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [expenseValue, setExpenseValue] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    amount: "",
    startDate: "",
    endDate: "",
  });

  const handleExpense = (e: any) => {
    e.preventDefault();
    const newAmountLeft = selectedBudget!.amountLeft - parseInt(expenseValue);
    setLoading(true);

    axios
      .put(`http://localhost:3000/api/budgets/${selectedBudget!.id}`, {
        amountLeft: newAmountLeft,
      })
      .then( () => {
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });

    setSelectedBudget(null);
  };

  const handleExpenseChange = (e: any) => {
    setExpenseValue(e.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setSelectedBudget((prevBudget) => {
      if (prevBudget) {
        return {
          ...prevBudget,
          [name]: value,
        };
      }
      return null;
    });
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/api/budgets/${id}`, {})
      .then( () => {
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

    axios
      .post("http://localhost:3000/api/budgets", {
        name: formState.name,
        description: formState.description,
        amount: formState.amount,
        amountLeft: formState.amount,
        startDate: new Date(formState.startDate),
        endDate: new Date(formState.endDate),
      })
      .then( () => {
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    setFormState({
      name: "",
      description: "",
      amount: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    axios
      .put(`http://localhost:3000/api/budgets/${selectedBudget!.id}`, {
        ...selectedBudget,
        startDate: new Date(selectedBudget!.startDate),
        endDate: new Date(selectedBudget!.endDate),
      })
      .then( () => {
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    setSelectedBudget(null);
  };

  const openModal = (budget: Budget | null) => {
    setSelectedBudget(budget);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedBudget(null);
    setFormState({
      name: "",
      description: "",
      amount: "",
      startDate: "",
      endDate: "",
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/budgets");
      const formattedBudgets = response.data.map((budget: Budget) => ({
        ...budget,
        startDate: budget.startDate.split("T")[0],
        endDate: budget.endDate.split("T")[0],
      }));
      setBudgets(formattedBudgets);
      setSelectedBudget(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold my-1">Budgets</h1>
        <button
          onClick={() => {
            setModalTitle("Create");
            openModal(null);
          }}
          className="bg-indigo-500 w-36 hover:bg-indigo-600 text-white font-bold rounded sm:w-40 lg:w-40"
        >
          Create Budget
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
              <tr className="bg-[#B9E6C7]">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Amount Left</th>
                <th className="py-2 px-4">Start Date</th>
                <th className="py-2 px-4">End Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget: Budget) => (
                <tr className="border-b" key={budget.id}>
                  <td className="py-2 px-4">{budget.name}</td>
                  <th className="py-2 px-4 font-normal">
                    {budget.description}
                  </th>
                  <td className="py-2 px-4">{budget.amount}</td>
                  <td className="py-2 px-4">{budget.amountLeft}</td>
                  <th className="py-2 px-4 font-normal">{budget.startDate}</th>
                  <th className="py-2 px-4 font-normal">{budget.endDate}</th>
                  <td className="py-2 px-4">
                    <div className="flex justify-evenly">
                      <button
                        onClick={() => {
                          setModalTitle("Expense");
                          openModal(budget);
                        }}
                        className="text-green-600"
                      >
                        <MdAttachMoney />
                      </button>
                      <button
                        onClick={() => {
                          setModalTitle("Edit");
                          openModal(budget);
                        }}
                        className="text-yellow-500"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {
                          setModalTitle("Delete");
                          handleDelete(budget.id);
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
            <h2 className="text-2xl font-bold mb-3">Create Budget</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
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
                <label className="block mb-2 text-gray-800" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formState.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="endDate">
                  End Date
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formState.endDate}
                  onChange={handleChange}
                />
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
        ) : modalTitle === "Edit" && selectedBudget ? (
          <>
            <h2 className="text-2xl font-bold mb-3">Edit Budget</h2>
            <form onSubmit={handleEdit} className="w-full max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="name"
                  name="name"
                  value={selectedBudget.name}
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
                  value={selectedBudget.description}
                  onChange={handleChange}
                ></textarea>
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
                  disabled
                  value={selectedBudget.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="date"
                  id="startDate"
                  name="startDate"
                  disabled
                  value={selectedBudget.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="endDate">
                  End Date
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={selectedBudget.endDate}
                  onChange={handleChange}
                />
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
        ) : modalTitle === "Expense" ? (
          <>
            <h2 className="text-2xl font-bold mb-3">Add Expense</h2>
            <p className="text-gray-600">
              Add the amount you have spent to be discounted from your total
              amount.
            </p>
            <form
              onSubmit={handleExpense}
              className="w-full max-w-lg mx-auto my-5"
            >
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="endDate">
                  Amount
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="expense"
                  value={expenseValue}
                  name="expense"
                  onChange={handleExpenseChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Add
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

export default Budgets;
