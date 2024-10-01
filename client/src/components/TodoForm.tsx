import React from "react";
import {
  monthToNumber,
  numberToMonth,
  MONTHS,
  removeLeadingZero,
  formatDay,
} from "../utils/utils";
import { NewTodo, Todo, UpdateTodo } from "../types/types";
import { Month } from "../utils/utils";

interface TodoFormProps {
  isEditTodo: boolean;
  editTodo: Todo | null;
  onCreateProduct: (todo: NewTodo, callback: () => void) => void;
  onUpdateProduct: (todo: UpdateTodo, callback: () => void) => void;
  onCompleted: (todo: UpdateTodo, callback: () => void) => void;
  onToggleModal: () => void;
}

interface FormState {
  title: string;
  description: string;
  day: string;
  month: Month | "";
  year: string;
}

const TodoForm = ({
  isEditTodo,
  editTodo,
  onCreateProduct,
  onUpdateProduct,
  onCompleted,
  onToggleModal,
}: TodoFormProps) => {
  const [formState, setFormState] = React.useState<FormState>({
    title: editTodo?.title ?? "",
    description: editTodo?.description ?? "",
    day: editTodo?.day ? removeLeadingZero(editTodo.day) : "",
    month: editTodo?.month ? numberToMonth(editTodo.month) : "",
    year: editTodo?.year ?? "",
  });
  const [daysInMonth, setDaysInMonth] = React.useState<number[]>([]);

  const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

  const isLeapYear = React.useCallback((year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }, []);

  const getDaysInMonth = React.useCallback(
    (month: string, year: number): number => {
      if (month === "February") {
        return isLeapYear(year) ? 29 : 28;
      }
      const daysIn30DayMonths = ["April", "June", "September", "November"];
      return daysIn30DayMonths.includes(month) ? 30 : 31;
    },
    [isLeapYear]
  );

  React.useEffect(() => {
    if (formState.month && formState.year) {
      const daysCount = getDaysInMonth(
        formState.month,
        parseInt(formState.year)
      );
      setDaysInMonth(Array.from({ length: daysCount }, (_, i) => i + 1));
    }
  }, [formState.month, formState.year, getDaysInMonth]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoData = {
      ...(isEditTodo && editTodo ? { id: editTodo.id } : {}),
      title: formState.title,
      description: formState.description,
      day: formatDay(formState.day),
      month: monthToNumber(formState.month),
      year: formState.year || "0000",
    };

    if (isEditTodo && editTodo) {
      onUpdateProduct(todoData as UpdateTodo, onToggleModal);
    } else {
      onCreateProduct(todoData as NewTodo, onToggleModal);
    }
  };
  console.log(formState.day);
  return (
    <form action="#" method="post" id="modal" onSubmit={handleSubmit}>
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
              value={formState.title}
              onChange={handleInputChange}
              placeholder="Item 1"
              required
            />
          </dd>
        </dl>
      </fieldset>

      <fieldset>
        <dl>
          <dt>
            <label htmlFor="day">Due Date</label>
          </dt>
          <dd>
            <select
              name="day"
              id="day"
              value={formState.day}
              onChange={handleInputChange}
              disabled={!formState.month || !formState.year}
            >
              <option value="" disabled>
                Day
              </option>
              {daysInMonth.map((day) => (
                <option key={day} value={day.toString()}>
                  {day}
                </option>
              ))}
            </select>
          </dd>
          <dt>
            <label htmlFor="month" className="visually-hidden">
              Month
            </label>
            <span className="select-separator">/</span>
          </dt>
          <dd>
            <select
              name="month"
              id="month"
              value={formState.month}
              onChange={(e) => {
                const value = e.target.value as Month | "reset";
                setFormState((prev) => ({
                  ...prev,
                  month: value === "reset" ? "" : value,
                  day: value === "reset" ? "" : prev.day,
                }));
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
            <label htmlFor="year" className="visually-hidden">
              Year
            </label>
            <span className="select-separator">/</span>
          </dt>
          <dd>
            <select
              name="year"
              id="year"
              value={formState.year}
              onChange={(e) => {
                const value = e.target.value;
                setFormState((prev) => ({
                  ...prev,
                  year: value === "reset" ? "" : value,
                  day: value === "reset" ? "" : prev.day,
                }));
              }}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
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
              value={formState.description}
              onChange={handleInputChange}
            ></textarea>
          </dd>
        </dl>
      </fieldset>

      <div className="modal-buttons">
        <button type="submit" disabled={!formState.title}>
          Save
        </button>
        <button
          type="button"
          disabled={!isEditTodo}
          onClick={() => {
            if (editTodo) {
              onCompleted(
                { id: editTodo.id, completed: !editTodo.completed },
                onToggleModal
              );
            }
          }}
        >
          Mark As Complete
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
