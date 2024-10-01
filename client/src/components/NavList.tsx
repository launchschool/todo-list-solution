import NavListItem from "./NavListItem.tsx";
import { SelectedNavElement, NavTodo } from "../types/types";

interface NavListProps {
  todos: NavTodo[];
  setSelectedNavElement: React.Dispatch<
    React.SetStateAction<SelectedNavElement>
  >;
  selectedNavElement: SelectedNavElement;
  completed: boolean;
}

const NavList = ({
  todos,
  setSelectedNavElement,
  selectedNavElement,
  completed,
}: NavListProps) => {
  return (
    <ul className={completed ? "completed" : ""}>
      {todos.map((navTodo) => {
        return (
          <NavListItem
            key={navTodo.dueDate}
            dueDate={navTodo.dueDate}
            count={navTodo.count}
            completed={completed}
            selectedNavElement={selectedNavElement}
            setSelectedNavElement={setSelectedNavElement}
          />
        );
      })}
    </ul>
  );
};

export default NavList;
