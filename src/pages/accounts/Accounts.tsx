import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import Account from "../../models/Account";
//import Card from "../../models/Card";

const Accounts = () => {
  const [loading, setLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [_cards, setCards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    balance: "",
    // cards: "",
  });

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setSelectedAccount((prevAccount) => {
      if (prevAccount) {
        return {
          ...prevAccount,
          [name]: value,
        };
      }
      return null;
    });
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/api/accounts/${id}`, {})
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
    closeModal();

    axios
      .post("http://localhost:3000/api/accounts", {
        name: formState.name,
        balance: formState.balance,
        // cards: formState.cards,
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
      balance: "",
      //   cards: "",
    });
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    closeModal();

    axios
      .put(`http://localhost:3000/api/accounts/${selectedAccount!.id}`, {
        ...selectedAccount,
      })
      .then( () => {
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    setSelectedAccount(null);
  };

  const openModal = (account: Account | null) => {
    setSelectedAccount(account);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedAccount(null);
    setFormState({
      name: "",
      balance: "",
      //   cards: "",
    });
  };
  useEffect(() => {
    fetchData();
    fetchCardData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/accounts");
      setAccounts(response.data);
      setSelectedAccount(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCardData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cards");
      setCards(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold my-1">Accounts</h1>
        <button
          onClick={() => {
            setModalTitle("Create");
            openModal(null);
          }}
          className="bg-indigo-500 w-36 hover:bg-indigo-600 text-white font-bold rounded sm:w-40 lg:w-40"
        >
          Create Account
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
              <tr className="bg-[#FFD59A]">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Balance</th>
                {/* <th className="py-2 px-4">Cards</th> */}
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account: Account) => (
                <tr className="border-b" key={account.id}>
                  <td className="py-2 px-4">{account.name}</td>
                  <td className="py-2 px-4">{account.balance}</td>
                  {/* <td className="py-2 px-4">
                    {account?.cards?.[0]?.bankName || ""}
                  </td> */}
                  <td className="py-2 px-4">
                    <div className="flex justify-evenly">
                      <button
                        onClick={() => {
                          setModalTitle("Edit");
                          openModal(account);
                        }}
                        className="text-yellow-500"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {
                          setModalTitle("Delete");
                          handleDelete(account.id);
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
            <h2 className="text-2xl font-bold mb-3">Create Account</h2>
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
                <label className="block mb-2 text-gray-800" htmlFor="balance">
                  Balance
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="balance"
                  name="balance"
                  value={formState.balance}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="cards">
                  Cards
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  name="cards"
                  id="cards"
                  value={formState.cards}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a card
                  </option>
                  {cards.map((card: Card) => (
                    <option key={card.id} value={card.id}>
                      {card.bankName}
                    </option>
                  ))}
                </select>
              </div> */}

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
        ) : modalTitle === "Edit" && selectedAccount ? (
          <>
            <h2 className="text-2xl font-bold mb-3">Edit Account</h2>
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
                  value={selectedAccount.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="balance">
                  Balance
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="balance"
                  name="balance"
                  value={selectedAccount.balance}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="cards">
                  Cards
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  name="cards"
                  id="cards"
                  value={selectedAccount.cards}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a card
                  </option>
                  {cards.map((card: Card) => (
                    <option key={card.id} value={card.id}>
                      {card.bankName}
                    </option>
                  ))}
                </select>
              </div> */}

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

export default Accounts;
