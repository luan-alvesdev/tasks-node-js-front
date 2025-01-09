import React, { useState } from "react";
import { cadastrarTarefa } from "../../src/services/api";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Valor digitado:", titulo, descricao);
    await cadastrarTarefa({ titulo, descricao });
    closeModal();
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl p-2"
              onClick={closeModal}
            >
              &times;
            </button>
            <form id="modal-form" onSubmit={handleSubmit}>
              <label
                htmlFor="input"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Descreva sua tarefa:
              </label>
              <input
                id="input"
                type="text"
                value={titulo}
                placeholder="Título da tarefa"
                onChange={(e) => setTitulo(e.target.value)}
                className="block w-full p-2 mb-2 border border-gray-300 rounded-md text-black"
              />
              <input
                id="input"
                type="text"
                placeholder="Descrição da tarefa"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md text-black"
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
        Nova tarefa
      </button>
    </>
  );
}

export default Modal;
