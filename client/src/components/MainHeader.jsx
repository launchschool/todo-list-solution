import { formatHeader } from "../utils/utils";

const MainHeader = ({ selectedNavElement }) => {
  const headerTitle = formatHeader(selectedNavElement.groupKey);
  return (
    <h1>
      {headerTitle}{" "}
      <span className="badge badge-selected" aria-label="8 todos">
        {selectedNavElement.count}
      </span>
    </h1>
  );
};

export default MainHeader;
