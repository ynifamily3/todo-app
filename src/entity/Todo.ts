export interface Todo {
  text: string;
  completed: boolean;
}

export interface TodoState {
  currentFilter: "모두" | "할 일" | "한 일";
  todos: Todo[];
}

export type TodoView = (
  targetElement: HTMLElement,
  { todos }: TodoState
) => HTMLElement;
