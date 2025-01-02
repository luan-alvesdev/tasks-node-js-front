import React, { useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Valor digitado:", inputValue);
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Digite algo</h2>
            <form id="modal-form" onSubmit={handleSubmit}>
              <label
                htmlFor="input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Seu texto:
              </label>
              <input
                id="input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                id="input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={openModal}
      >
        Abrir Modal
      </button>
    </>
  );
}

export default Modal;
