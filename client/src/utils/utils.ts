import {
  Todo,
  GroupKey,
  NavTodo,
  DueDate,
  NumberMonth,
  Year,
} from "../types/types";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type Month = (typeof MONTHS)[number];

const getDateValue = (todo: Todo): number => {
  if (!todo.month || !todo.year) return -Infinity;
  const year = todo.year ? parseInt(todo.year) : new Date().getFullYear();
  const month = todo.month ? parseInt(todo.month) : 1;
  const day = todo.day ? parseInt(todo.day) : 1;
  return year * 10000 + month * 100 + day;
};

const sortTodosByDueDate = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => {
    const dateA = getDateValue(a);
    const dateB = getDateValue(b);
    return dateA - dateB;
  });
};

export const formatDueDate = (todo: Todo): DueDate => {
  if (!todo.month || !todo.year) return "No Due Date";
  const month = todo.month.padStart(2, "0") as NumberMonth;
  const year = todo.year.slice(-2) as Year;
  return `${month}/${year}`;
};

export const groupAndCountTodosByDueDate = (todos: Todo[]): NavTodo[] => {
  const sortedTodos = sortTodosByDueDate(todos);
  const groupedTodos = sortedTodos.reduce<Record<string, NavTodo>>(
    (acc, todo) => {
      const dueDate: DueDate = formatDueDate(todo);
      if (!acc[dueDate]) {
        acc[dueDate] = { dueDate, count: 0 };
      }
      acc[dueDate].count++;
      return acc;
    },
    {}
  );
  return Object.values(groupedTodos);
};

export const formatHeader = (selectedGroup: GroupKey): string => {
  if (selectedGroup === "all-todos") {
    return "All Todos";
  }
  if (selectedGroup === "completed") {
    return "Completed";
  }
  return selectedGroup.split("|")[0];
};

const hasNoDueDate = (todo: Todo): boolean => !todo.month || !todo.year;

const convertDueDate = (dueDate: string): [string, string] => {
  const [month, shortYear] = dueDate.split("/");
  const formattedYear = `20${shortYear}`;
  return [month, formattedYear];
};

export const filterTodosByNavElement = (
  todos: Todo[],
  groupKey: GroupKey
): Todo[] => {
  if (groupKey === "all-todos") {
    return todos;
  }
  if (groupKey === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  const [dueDate, type] = groupKey.split("|");
  return todos.filter((todo) => {
    if (dueDate === "No Due Date" && type === "completed") {
      return hasNoDueDate(todo) && todo.completed;
    } else if (dueDate === "No Due Date") {
      return hasNoDueDate(todo);
    } else {
      const [month, year] = convertDueDate(dueDate);
      if (type === "completed") {
        return todo.month === month && todo.year === year && todo.completed;
      } else {
        return todo.month === month && todo.year === year;
      }
    }
  });
};

export const monthToNumber = (monthName: Month | ""): string => {
  if (monthName === "") {
    return "00";
  }
  const monthNumber = MONTHS.indexOf(monthName) + 1;
  return monthNumber.toString().padStart(2, "0");
};

export const numberToMonth = (monthNumber: string): Month | "" => {
  return MONTHS[parseInt(monthNumber) - 1] || "";
};

export const sortTodosByCompletion = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return 0; // Keep original order if completion status is the same
    }
    return a.completed ? 1 : -1; // Move completed todos to the end
  });
};

export const correctMonthandYear = (todo: Todo): Todo => {
  if (todo.month === "00") {
    todo.month = "";
  } else if (todo.year === "0000") {
    todo.year = "";
  }
  return todo;
};

export const correctMonthandYearTodos = (todos: Todo[]): Todo[] => {
  return todos.map(correctMonthandYear);
};
