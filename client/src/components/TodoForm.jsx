import React from "react";
import { monthToNumber, numberToMonth, MONTHS } from "../utils/utils";
const TodoForm = ({
  isEditTodo,
  editTodo,
  onSubmit,
  onCompleted,
  onToggleModal,
}) => {
  const [title, setTitle] = React.useState(isEditTodo ? editTodo.title : "");
  const [description, setDescription] = React.useState(
    isEditTodo ? editTodo.description : ""
  );
  const [selectedDay, setSelectedDay] = React.useState(
    isEditTodo ? editTodo.day : ""
  );
  const [selectedMonth, setSelectedMonth] = React.useState(
    isEditTodo ? numberToMonth(editTodo.month) : ""
  );
  const [selectedYear, setSelectedYear] = React.useState(
    isEditTodo ? editTodo.year : ""
  );
  const [daysInMonth, setDaysInMonth] = React.useState([]);

  const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDaysInMonth = (month, year) => {
    if (month === "February") {
      return isLeapYear(year) ? 29 : 28;
    }
    const daysIn30DayMonths = ["April", "June", "September", "November"];
    return daysIn30DayMonths.includes(month) ? 30 : 31;
  };

  React.useEffect(() => {
    if (selectedMonth && selectedYear) {
      const daysCount = getDaysInMonth(selectedMonth, parseInt(selectedYear));
      setDaysInMonth(Array.from({ length: daysCount }, (_, i) => i + 1));
    }
  }, [selectedMonth, selectedYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let todoData;

    if (isEditTodo) {
      todoData = {
        id: editTodo.id,
        title,
        description,
        day: selectedDay,
        month: monthToNumber(selectedMonth),
        year: selectedYear || "0000",
      };
    } else {
      todoData = {
        title,
        ...(description && { description }),
        ...(selectedDay && { day: selectedDay }),
        ...(selectedMonth && { month: monthToNumber(selectedMonth) }),
        ...(selectedYear && { year: selectedYear }),
      };
    }

    onSubmit(todoData, onToggleModal);
  };

  const isDaySelectDisabled = !selectedMonth || !selectedYear;
  return (
    <form action="#" method="post" id="modal">
      <fieldset>
        <dl>
          <dt>
            <label htmlFor="title">Title</label>
          </dt>
          <dd>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Item 1"
              required
            />
          </dd>
        </dl>
      </fieldset>

      <fieldset>
        <dl>
          <dt>
            <label htmlFor="date-day">Due Date</label>
          </dt>
          <dd>
            <select
              name="date-day"
              id="date-day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              disabled={isDaySelectDisabled}
            >
              <option value="" disabled>
                Day
              </option>
              {daysInMonth.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </dd>
          <dt>
            <label htmlFor="date-month" className="visually-hidden">
              Month
            </label>
            <span className="select-separator">/</span>
          </dt>
          <dd>
            <select
              name="date-month"
              id="date-month"
              value={selectedMonth}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedMonth(value === "reset" ? "" : value);
                if (value === "reset") {
                  setSelectedDay("");
                }
              }}
            >
              <option value="" disabled>
                Month
              </option>

              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
              <option value="reset" className="reset-option">
                Reset Month
              </option>
            </select>
          </dd>
          <dt>
            <label htmlFor="date-year" className="visually-hidden">
              Year
            </label>
            <span className="select-separator">/</span>
          </dt>
          <dd>
            <select
              name="date-year"
              id="date-year"
              value={selectedYear}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedYear(value === "reset" ? "" : value);
                if (value === "reset") {
                  setSelectedDay("");
                }
              }}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
              <option value="reset" className="reset-option">
                Reset Year
              </option>
            </select>
          </dd>
        </dl>
      </fieldset>
      <fieldset>
        <dl>
          <dt>
            <label htmlFor="description">Description</label>
          </dt>
          <dd>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </dd>
        </dl>
      </fieldset>

      <div className="modal-buttons">
        <button type="submit" onClick={handleSubmit} disabled={!title}>
          Save
        </button>
        <button
          type="button"
          disabled={!isEditTodo}
          onClick={() =>
            onCompleted({ id: editTodo.id, completed: true }, onToggleModal)
          }
        >
          Mark As Complete
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
