export type Id = "TODO" | "DOING" | "DONE" | string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: string | number;
  status: Id;
  content: string;
  _id?: string | number;
  titulo?: string;
  descricao?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
