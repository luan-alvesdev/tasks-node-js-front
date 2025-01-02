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
import KanbanBoard from "@/app/kabam_board/KanbanBoard";

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
    <KanbanBoard />
  );
}

export default Card;
