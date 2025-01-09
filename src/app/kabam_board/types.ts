export type Id = "TODO" | "DOING" | "DONE" | string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: string | number;
  content: string;
  _id?: string | number;
  titulo?: string;
  descricao?: string;
  status?: Id;
  createdAt?: Date;
  updatedAt?: Date;
};
