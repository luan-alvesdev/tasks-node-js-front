"use client";

import React, { useEffect, useState } from "react";
import {
  listarTarefas,
  deletarTarefa,
  editarTarefa,
  cadastrarTarefa,
} from "/src/services/api";
import Todo from "../app/Todo";
import Doing from "../app/Doing";
import Done from "../app/Done";
import Form from "../app/Form";

function Card() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    listarTarefas().then((response) => {
      setTarefas(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    deletarTarefa(id).then(() => {
      setTarefas((prevTarefas) =>
        prevTarefas.filter((tarefa) => tarefa._id !== id)
      );
    });
  };

  const handleSave = (id, updates) => {
    editarTarefa(id, updates).then(() => {
      setTarefas((prevTarefas) =>
        prevTarefas.map((tarefa) =>
          tarefa._id === id ? { ...tarefa, ...updates } : tarefa
        )
      );
    });
  };

  const handleAdd = (novaTarefa) => {
    setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
  };

  const tarefasTodo = Array.isArray(tarefas)
    ? tarefas.filter((tarefa) => tarefa.status === "TODO")
    : [];
  const tarefasDoing = Array.isArray(tarefas)
    ? tarefas.filter((tarefa) => tarefa.status === "DOING")
    : [];
  const tarefasDone = Array.isArray(tarefas)
    ? tarefas.filter((tarefa) => tarefa.status === "DONE")
    : [];

  return (
    <div>
      <Form onAdd={handleAdd} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border p-2">
          <h2 className="text-2xl font-bold mb-4 text-center">TODO</h2>
          <Todo
            tarefas={tarefasTodo}
            setTarefas={setTarefas}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        </div>
        <div className="border p-2">
          <h2 className="text-2xl font-bold mb-4 text-center">DOING</h2>
          <Doing
            tarefas={tarefasDoing}
            setTarefas={setTarefas}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        </div>
        <div className="border p-2">
          <h2 className="text-2xl font-bold mb-4 text-center">DONE</h2>
          <Done
            tarefas={tarefasDone}
            setTarefas={setTarefas}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
