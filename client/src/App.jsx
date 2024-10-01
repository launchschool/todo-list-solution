import "./App.css";
import React from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import axios from "axios";
import { correctMonthandYearTodos, correctMonthandYear } from "./utils/utils";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [selectedNavElement, setSelectedNavElement] = React.useState({
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

  const handleSubmit = async (todo, callback) => {
    const { id, ...restOfTodo } = todo;
    if (id) {
      const { data } = await axios.put(`/api/todos/${id}`, restOfTodo);
      setTodos((prevState) =>
        prevState.map((t) => {
          if (t.id === id) {
            return { ...correctMonthandYear(data) };
          } else {
            return t;
          }
        })
      );
    } else {
      const { data } = await axios.post("/api/todos", todo);
      setTodos((prevState) => prevState.concat(data));
    }
    if (callback) {
      callback();
    }
  };

  const handleDelete = async (todoId) => {
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
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        selectedNavElement={selectedNavElement}
      />
    </>
  );
}

export default App;
