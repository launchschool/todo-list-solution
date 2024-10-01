import NavListAll from "./NavListAll.tsx";
import NavListCompleted from "./NavListCompleted.tsx";
import { Todo, SelectedNavElement } from "../types/types";

interface NavProps {
  todos: Todo[];
  selectedNavElement: SelectedNavElement;
  setSelectedNavElement: React.Dispatch<
    React.SetStateAction<SelectedNavElement>
  >;
}

const Nav = ({
  todos,
  selectedNavElement,
  setSelectedNavElement,
}: NavProps) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  return (
    <nav id="nav" aria-label="Todo lists">
      <NavListAll
        todos={todos}
        selectedNavElement={selectedNavElement}
        setSelectedNavElement={setSelectedNavElement}
      />
      <NavListCompleted
        todos={completedTodos}
        selectedNavElement={selectedNavElement}
        setSelectedNavElement={setSelectedNavElement}
      />
    </nav>
  );
};
export default Nav;
