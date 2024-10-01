export interface Todo {
  id: number;
  title: string;
  description?: string;
  day?: string;
  month?: string;
  year?: string;
  completed?: boolean;
}

export type NewTodo = Omit<Todo, "id" | "completed">;

export type UpdateTodo = Pick<Todo, "id"> & Partial<Omit<Todo, "id">>;

export interface NavTodo {
  dueDate: DueDate;
  count: number;
}

export type NumberMonth =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";
export type Year = `${number}${number}`;
type Type = "all" | "completed";

export type DueDate = `${NumberMonth}/${Year}` | "No Due Date";
export type DueDateTypeString = `${DueDate}|${Type}`;

export type GroupKey = "all-todos" | "completed" | DueDateTypeString;

export interface SelectedNavElement {
  groupKey: GroupKey;
  count: number;
}
