import axios from "axios";

const api = axios.create({
  baseURL: "https://gestao-de-tarefas.luancode.dev/api/tarefa",
  headers: {
    "Content-Type": "application/json",
  },
});

export const listarTarefas = () => api.get("/listar");
export const cadastrarTarefa = (tarefa) => api.post("/cadastrar", tarefa);
export const editarStatusTarefa = (id, status) =>
  api.patch(`/editar/status/${id}`, { status });
export const editarTarefa = (id, updates) => api.put(`/editar/${id}`, updates);
export const deletarTarefa = (id) => api.delete(`/deletar/${id}`);
