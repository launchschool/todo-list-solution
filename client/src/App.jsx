import "./App.css";
import React from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { correctDate, correctDateTodos } from "./utils/utils";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/todos";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [selectedNavElement, setSelectedNavElement] = React.useState({
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
  const handleCreateProduct = async (todo, callback) => {
    const data = await createTodo(todo);
    setTodos((prevState) => prevState.concat(correctDate(data)));
    if (callback) {
      callback();
    }
  };

  const handleUpdateProduct = async (todo, callback) => {
    const data = await updateTodo(todo);
    setTodos((prevState) =>
      prevState.map((t) => {
        if (t.id === todo.id) {
          return { ...correctDate(data) };
        } else {
          return t;
        }
      })
    );
    if (callback) {
      callback();
    }
  };

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId);
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
