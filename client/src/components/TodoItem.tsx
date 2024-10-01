import { formatDueDate } from "../utils/utils";
import { Todo, UpdateTodo } from "../types/types";

interface TodoItemProps {
  todo: Todo;
  setEditTodoId: (id: number) => void;
  onToggleModal: () => void;
  onCompleted: (todo: UpdateTodo, callback?: () => void) => void;
  onDelete: (todoId: number) => void;
}

const TodoItem = ({
  todo,
  setEditTodoId,
  onToggleModal,
  onCompleted,
  onDelete,
}: TodoItemProps) => {
  const dueDate = formatDueDate(todo);
  return (
    <li
      className={todo.completed ? "completed" : ""}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onToggleModal();
          setEditTodoId(todo.id);
        }
      }}
    >
      <div
        className="checkbox"
        onClick={(e) => {
          e.stopPropagation();
          onCompleted({ id: todo.id, completed: !todo.completed });
        }}
      />
      <span
        className="todo-title"
        onClick={() => {
          onToggleModal();
          setEditTodoId(todo.id);
        }}
      >
        {todo.title} - {dueDate}
      </span>
      <button
        className="delete"
        aria-label="Delete Item"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
