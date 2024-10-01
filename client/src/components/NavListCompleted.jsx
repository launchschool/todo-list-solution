import NavList from "./NavList";
import { groupAndCountTodosByDueDate } from "../utils/utils";
import NavHeader from "./NavHeader";

const NavListCompleted = ({
  todos,
  selectedNavElement,
  setSelectedNavElement,
}) => {
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
