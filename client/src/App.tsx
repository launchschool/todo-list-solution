import "./App.css";
import React from "react";
import Nav from "./components/Nav.tsx";
import Main from "./components/Main.tsx";
import { correctDate, correctDateTodos } from "./utils/utils.ts";
import { Todo, NewTodo, UpdateTodo, SelectedNavElement } from "./types/types";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./services/todos.ts";

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [selectedNavElement, setSelectedNavElement] =
    React.useState<SelectedNavElement>({
      groupKey: "all-todos",
      count: 0,
    });
  React.useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(correctDateTodos(data));
      setSelectedNavElement({ groupKey: "all-todos", count: data.length });
    };
    fetchTodos();
  }, []);

  const handleCreateProduct = async (todo: NewTodo, callback?: () => void) => {
    const data = await createTodo(todo);
    setTodos((prevState) => prevState.concat(correctDate(data)));
    if (callback) {
      callback();
    }
  };

  const handleUpdateProduct = async (
    todo: UpdateTodo,
    callback?: () => void
  ) => {
    const data = await updateTodo(todo);
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === todo.id) {
          return { ...correctDate(data) };
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
    deleteTodo(todoId);
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
