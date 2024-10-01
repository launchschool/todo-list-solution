import React from "react";
import TodoForm from "./TodoForm";
import MainHeader from "./MainHeader";
import TodoList from "./TodoList";

const Main = ({
  todos,
  onCreateProduct,
  onUpdateProduct,
  onDelete,
  selectedNavElement,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editTodoId, setEditTodoId] = React.useState(null);
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      handleToggleModal();
    }
  };
  let editTodo = null;
  if (editTodoId) {
    editTodo = todos.find((todo) => todo.id === editTodoId);
  }

  const handleCompleted = (todo, callback) => {
    onUpdateProduct({ id: todo.id, completed: todo.completed }, callback);
  };
  return (
    <main>
      <label htmlFor="nav-toggle" aria-label="Toggle navigation menu"></label>

      <MainHeader selectedNavElement={selectedNavElement} />

      <button
        className="add-todo"
        onClick={() => {
          setEditTodoId(null);
          handleToggleModal();
        }}
      >
        Add new to do
      </button>
      <TodoList
        todos={todos}
        onToggleModal={handleToggleModal}
        setEditTodoId={setEditTodoId}
        onCompleted={handleCompleted}
        onDelete={onDelete}
        selectedNavElement={selectedNavElement}
      />

      {isModalOpen && (
        <aside onMouseDown={handleMouseDown}>
          <TodoForm
            isEditTodo={!!editTodoId}
            editTodo={editTodo}
            onCompleted={handleCompleted}
            onCreateProduct={onCreateProduct}
            onUpdateProduct={onUpdateProduct}
            onToggleModal={handleToggleModal}
          />
        </aside>
      )}
    </main>
  );
};
export default Main;
