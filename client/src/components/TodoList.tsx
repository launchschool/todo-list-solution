import TodoItem from "./TodoItem";
import { filterTodosByNavElement, sortTodosByCompletion } from "../utils/utils";
import { SelectedNavElement, Todo, UpdateTodo } from "../types/types";

interface TodoListProps {
  todos: Todo[];
  onToggleModal: () => void;
  setEditTodoId: (id: number) => void;
  onCompleted: (todo: UpdateTodo, callback?: () => void) => void;
  onDelete: (todoId: number) => void;
  selectedNavElement: SelectedNavElement;
}

const TodoList = ({
  todos,
  onToggleModal,
  setEditTodoId,
  onCompleted,
  onDelete,
  selectedNavElement,
}: TodoListProps) => {
  todos = filterTodosByNavElement(todos, selectedNavElement.groupKey);
  return (
    <ul>
      {sortTodosByCompletion(todos).map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleModal={onToggleModal}
          setEditTodoId={setEditTodoId}
          onCompleted={onCompleted}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
