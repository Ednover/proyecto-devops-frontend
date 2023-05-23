import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import Card from "../../models/Card";

const Cards = () => {
  const [loading, setLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [formState, setFormState] = useState({
    type: "",
    bankName: "",
    number: "",
    expiryDate: "",
  });

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setSelectedCard((prevCard) => {
      if (prevCard) {
        return {
          ...prevCard,
          [name]: value,
        };
      }
      return null;
    });
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/api/cards/${id}`, {})
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
      .post("http://localhost:3000/api/cards", {
        type: formState.type,
        bankName: formState.bankName,
        number: formState.number,
        expiryDate: formState.expiryDate,
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
      bankName: "",
      number: "",
      expiryDate: "",
    });
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    closeModal();

    axios
      .put(`http://localhost:3000/api/cards/${selectedCard!.id}`, {
        ...selectedCard,
      })
      .then((res) => {
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    setSelectedCard(null);
  };

  const openModal = (card: Card | null) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCard(null);
    setFormState({
      type: "",
      bankName: "",
      number: "",
      expiryDate: "",
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/cards");
      setCards(response.data);
      setSelectedCard(null);
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
          Create Card
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
              <tr className="bg-[#A5D8F3]">
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Bank Name</th>
                <th className="py-2 px-4">Number</th>
                <th className="py-2 px-4">Expiry Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card: Card) => (
                <tr className="border-b" key={card.id}>
                  <td className="py-2 px-4">{card.type}</td>
                  <td className="py-2 px-4">{card.bankName}</td>
                  <td className="py-2 px-4">{card.number}</td>
                  <td className="py-2 px-4">{card.expiryDate}</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-evenly">
                      <button
                        onClick={() => {
                          setModalTitle("Edit");
                          openModal(card);
                        }}
                        className="text-yellow-500"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {
                          setModalTitle("Delete");
                          handleDelete(card.id);
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
            <h2 className="text-2xl font-bold mb-3">Create Card</h2>
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
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="bankName">
                  Bank Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formState.bankName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="number">
                  Card Number
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="number"
                  name="number"
                  value={formState.number}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-gray-800"
                  htmlFor="expiryDate"
                >
                  Expiry Date
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formState.expiryDate}
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
        ) : modalTitle === "Edit" && selectedCard ? (
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
                  value={selectedCard.type}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="bankName">
                  Bank Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={selectedCard.bankName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800" htmlFor="number">
                  Card Number
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="number"
                  name="number"
                  value={selectedCard.number}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-gray-800"
                  htmlFor="expiryDate"
                >
                  Expiry Date
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={selectedCard.expiryDate}
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
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default Cards;
