import { SelectedNavElement } from "../types/types";

interface NavHeaderProps {
  setSelectedNavElement: React.Dispatch<
    React.SetStateAction<SelectedNavElement>
  >;
  todosLength: number;
  isSelected: boolean;
  text: "All Todos" | "Completed";
}

const NavHeader = ({
  setSelectedNavElement,
  todosLength,
  isSelected,
  text,
}: NavHeaderProps) => {
  const groupKey = text === "All Todos" ? "all-todos" : "completed";
  return (
    <h2
      className={groupKey === "all-todos" ? "all-todos" : "completed"}
      onClick={() =>
        setSelectedNavElement({ groupKey: groupKey, count: todosLength })
      }
    >
      <span>{text}</span>
      <span className={`badge${isSelected ? " badge-selected" : ""}`}>
        {todosLength}
      </span>
    </h2>
  );
};

export default NavHeader;
