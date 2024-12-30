import { useState } from "react";
import { cadastrarTarefa } from "@/services/api";

function Form({ onAdd }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaTarefa = { titulo, descricao, status };
    cadastrarTarefa(novaTarefa).then((response) => {
      onAdd(response.data);
      setTitulo("");
      setDescricao("");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Adicionar Tarefa
      </button>
    </form>
  );
}

export default Form;
