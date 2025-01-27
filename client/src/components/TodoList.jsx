import TodoItem from "./TodoItem";
import { filterTodosByNavElement, sortTodosByCompletion } from "../utils/utils";

const TodoList = ({
  todos,
  onToggleModal,
  setEditTodoId,
  onCompleted,
  onDelete,
  selectedNavElement,
}) => {
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
