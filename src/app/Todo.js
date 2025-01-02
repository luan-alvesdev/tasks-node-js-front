import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { editarTarefa, deletarTarefa } from "../services/api";

function Todo({ tarefas, onDelete, onSave, setTarefas }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEdit = (tarefa) => {
    setEditId(tarefa._id);
    setEditTitle(tarefa.titulo);
    setEditDescription(tarefa.descricao);
  };

  const handleSave = (id) => {
    const updates = { titulo: editTitle, descricao: editDescription };
    editarTarefa(id, updates).then(() => {
      setEditId(null);
      onSave(id, updates);
    });
  };

  const handleDelete = (id) => {
    deletarTarefa(id).then(() => {
      const tarefa = tarefas.find((tarefa) => tarefa._id === id);
      setTarefas(tarefa);
    });
  };

  if (!Array.isArray(tarefas)) {
    return null;
  }

  return (
    <div>
      {tarefas.map((tarefa) => (
        <div key={tarefa._id} className="mb-4 border rounded p-2 flex-nowrap">
          {editId === tarefa._id ? (
            <div className="flex-nowrap">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="m-2"
              />
              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="m-2"
              />
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={() => handleSave(tarefa._id)}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl text-blue-500 mb-2 font-semibold">
                  {tarefa.titulo}
                </h1>
                <FaEdit
                  onClick={() => handleEdit(tarefa)}
                  className="ml-2 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                {tarefa.descricao}
                <span className="flex items-center">
                  <FaTrashAlt
                    onClick={() => onDelete(tarefa._id)}
                    className="ml-2 cursor-pointer"
                  />
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Todo;
