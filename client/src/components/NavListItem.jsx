const NavListItem = ({
  dueDate,
  count,
  setSelectedNavElement,
  selectedNavElement,
  completed,
}) => {
  const groupKey = `${dueDate}|${completed}`;
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
