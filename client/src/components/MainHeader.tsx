import { formatHeader } from "../utils/utils";
import { SelectedNavElement } from "../types/types";

interface MainHeaderProps {
  selectedNavElement: SelectedNavElement;
}

const MainHeader = ({ selectedNavElement }: MainHeaderProps) => {
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
