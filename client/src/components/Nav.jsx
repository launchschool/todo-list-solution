import NavListAll from "./NavListAll";
import NavListCompleted from "./NavListCompleted";

const Nav = ({ todos, selectedNavElement, setSelectedNavElement }) => {
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
