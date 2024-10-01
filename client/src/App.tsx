import "./App.css";
import React from "react";
import Nav from "./components/Nav.tsx";
import Main from "./components/Main.tsx";
import axios from "axios";
import {
  correctMonthandYearTodos,
  correctMonthandYear,
} from "./utils/utils.ts";
import { Todo, NewTodo, UpdateTodo, SelectedNavElement } from "./types/types";

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [selectedNavElement, setSelectedNavElement] =
    React.useState<SelectedNavElement>({
      groupKey: "all-todos",
      count: 0,
    });
  React.useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get("/api/todos");
      setTodos(correctMonthandYearTodos(data));
      setSelectedNavElement({ groupKey: "all-todos", count: data.length });
    };
    fetchTodos();
  }, []);

  const handleCreateProduct = async (todo: NewTodo, callback?: () => void) => {
    const { data } = await axios.post("/api/todos", todo);
    setTodos((prevState) => prevState.concat(data));
    if (callback) {
      callback();
    }
  };

  const handleUpdateProduct = async (
    todo: UpdateTodo,
    callback?: () => void
  ) => {
    const { id, ...restOfTodo } = todo;
    const { data } = await axios.put(`/api/todos/${id}`, restOfTodo);
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === id) {
          return { ...correctMonthandYear(data) };
        } else {
          return t;
        }
      });
    });
    if (callback) {
      callback();
    }
  };

  const handleDelete = async (todoId: number) => {
    await axios.delete(`/api/todos/${todoId}`);
    setTodos((prevState) => prevState.filter((todo) => todo.id !== todoId));
  };
  return (
    <>
      <input
        type="checkbox"
        name="nav-toggle"
        id="nav-toggle"
        aria-label="Toggle navigation"
      />
      <Nav
        todos={todos}
        selectedNavElement={selectedNavElement}
        setSelectedNavElement={setSelectedNavElement}
      />
      <Main
        todos={todos}
        onCreateProduct={handleCreateProduct}
        onUpdateProduct={handleUpdateProduct}
        onDelete={handleDelete}
        selectedNavElement={selectedNavElement}
      />
    </>
  );
}

export default App;
