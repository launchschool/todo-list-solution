import NavList from "./NavList";
import { groupAndCountTodosByDueDate } from "../utils/utils";
import NavHeader from "./NavHeader";
import { Todo, SelectedNavElement } from "../types/types";

interface NavListCompletedProps {
  todos: Todo[];
  setSelectedNavElement: React.Dispatch<
    React.SetStateAction<SelectedNavElement>
  >;
  selectedNavElement: SelectedNavElement;
}

const NavListCompleted = ({
  todos,
  selectedNavElement,
  setSelectedNavElement,
}: NavListCompletedProps) => {
  const groupedTodos = groupAndCountTodosByDueDate(todos);
  return (
    <>
      <NavHeader
        setSelectedNavElement={setSelectedNavElement}
        todosLength={todos.length}
        isSelected={selectedNavElement.groupKey === "completed"}
        text="Completed"
      />
      <NavList
        todos={groupedTodos}
        completed={true}
        selectedNavElement={selectedNavElement}
        setSelectedNavElement={setSelectedNavElement}
      />
    </>
  );
};

export default NavListCompleted;
