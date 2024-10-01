import axios from "axios";
import { NewTodo, Todo, UpdateTodo } from "../types/types";

export const getTodos = async () => {
  const { data } = await axios.get<Todo[]>("/api/todos");
  return data;
};

export const createTodo = async (todo: NewTodo) => {
  const { data } = await axios.post<Todo>("/api/todos", todo);
  return data;
};

export const updateTodo = async (todo: UpdateTodo) => {
  const { data } = await axios.put<Todo>(`/api/todos/${todo.id}`, todo);
  return data;
};

export const deleteTodo = async (todoId: number) => {
  await axios.delete(`/api/todos/${todoId}`);
};
