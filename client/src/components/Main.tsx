import React from "react";
import TodoForm from "./TodoForm.tsx";
import MainHeader from "./MainHeader.tsx";
import TodoList from "./TodoList.tsx";
import { Todo, NewTodo, UpdateTodo, SelectedNavElement } from "../types/types";

interface MainProps {
  todos: Todo[];
  onCreateProduct: (todo: NewTodo, callback?: () => void) => void;
  onUpdateProduct: (todo: UpdateTodo, callback?: () => void) => void;
  onDelete: (todoId: number) => void;
  selectedNavElement: SelectedNavElement;
}

const Main = ({
  todos,
  onCreateProduct,
  onUpdateProduct,
  onDelete,
  selectedNavElement,
}: MainProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editTodoId, setEditTodoId] = React.useState<number | null>(null);
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleMouseDown = (event: React.SyntheticEvent) => {
    if (event.target === event.currentTarget) {
      handleToggleModal();
    }
  };
  let editTodo: Todo | null = null;
  if (editTodoId) {
    editTodo = todos.find((todo) => todo.id === editTodoId)!;
  }

  const handleCompleted = (todo: UpdateTodo, callback?: () => void) => {
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
