import { GroupKey, DueDate, SelectedNavElement } from "../types/types";

interface NavListItemProps {
  dueDate: DueDate;
  count: number;
  setSelectedNavElement: React.Dispatch<
    React.SetStateAction<SelectedNavElement>
  >;
  selectedNavElement: SelectedNavElement;
  completed: boolean;
}

const NavListItem = ({
  dueDate,
  count,
  setSelectedNavElement,
  selectedNavElement,
  completed,
}: NavListItemProps) => {
  const groupType = completed ? "completed" : "all";
  const groupKey: GroupKey = `${dueDate}|${groupType}`;
  const isSelected = selectedNavElement.groupKey === groupKey;
  return (
    <li
      className={isSelected ? "selected" : ""}
      onClick={() => setSelectedNavElement({ groupKey, count })}
    >
      <span>{dueDate}</span>
      <span
        className={`badge${isSelected ? " badge-selected" : ""}`}
        aria-label="8 todos"
      >
        {count}
      </span>
    </li>
  );
};

export default NavListItem;
