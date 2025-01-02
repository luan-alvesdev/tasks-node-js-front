import { FaTrashAlt } from "react-icons/fa";

function Doing({ tarefas, onDelete }) {
  if (!Array.isArray(tarefas)) {
    return null;
  }

  return (
    <div>
      {tarefas.map((tarefa) => (
        <div key={tarefa._id} className="mb-4 border rounded p-2">
          <h1 className="text-4xl text-blue-500 font-medium mb-2">
            {tarefa.titulo}
          </h1>
          <div className="flex items-center justify-between">
            <p>{tarefa.descricao}</p>
            <FaTrashAlt
              onClick={() => onDelete(tarefa._id)}
              className="ml-2 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Doing;
