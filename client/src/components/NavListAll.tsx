import NavList from "./NavList";
import { groupAndCountTodosByDueDate } from "../utils/utils";
import NavHeader from "./NavHeader";
import { Todo, SelectedNavElement } from "../types/types";

interface NavListAllProps {
  todos: Todo[];
  selectedNavElement: SelectedNavElement;
  setSelectedNavElement: React.Dispatch<
    React.SetStateAction<SelectedNavElement>
  >;
}

const NavListAll = ({
  todos,
  selectedNavElement,
  setSelectedNavElement,
}: NavListAllProps) => {
  const groupedTodos = groupAndCountTodosByDueDate(todos);
  const isSelected = selectedNavElement.groupKey === "all-todos";
  return (
    <>
      <NavHeader
        setSelectedNavElement={setSelectedNavElement}
        todosLength={todos.length}
        isSelected={isSelected}
        text="All Todos"
      />
      <NavList
        todos={groupedTodos}
        completed={false}
        selectedNavElement={selectedNavElement}
        setSelectedNavElement={setSelectedNavElement}
      />
    </>
  );
};
export default NavListAll;
