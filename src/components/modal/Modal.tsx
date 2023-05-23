const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className="bg-white p-6 rounded-lg z-10 w-6/12 mx-auto mt-10 mb-10 overflow-auto"
        style={{ maxHeight: "80vh" }}
      >
        {children}
        <button
          className="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
