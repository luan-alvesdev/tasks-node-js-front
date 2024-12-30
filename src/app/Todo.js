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
        <div key={tarefa._id} className="mb-4">
          {editId === tarefa._id ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="mb-2"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="mb-2"
              />
              <button onClick={() => handleSave(tarefa._id)}>Save</button>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl font-bold text-blue-500 underline mb-2">
                {tarefa.titulo}
                <FaEdit
                  onClick={() => handleEdit(tarefa)}
                  className="ml-2 cursor-pointer"
                />
              </h1>
              <p>
                {tarefa.descricao}
                <FaEdit
                  onClick={() => handleEdit(tarefa)}
                  className="ml-2 cursor-pointer"
                />
                <FaTrashAlt
                  onClick={() => onDelete(tarefa._id)}
                  className="ml-2 cursor-pointer"
                />
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Todo;
