import NavListItem from "./NavListItem";

const NavList = ({
  todos,
  setSelectedNavElement,
  selectedNavElement,
  completed,
}) => {
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
