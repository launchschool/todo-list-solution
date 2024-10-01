import axios from "axios";

export const getTodos = async () => {
  const response = await axios.get("/api/todos");
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post("/api/todos", todo);
  return response.data;
};

export const updateTodo = async (todo) => {
  const response = await axios.put(`/api/todos/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`/api/todos/${id}`);
  return response.data;
};
