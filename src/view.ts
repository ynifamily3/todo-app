import { Todo, TodoState } from "./entity/Todo";
const { todosView } = await import("./view/todosView");
const { counterView } = await import("./view/counterView");
const { filtersView } = await import("./view/filtersView");

// target을 복제하여 state 주입한 DOM을 반환합니다.
const view = (targetElement: HTMLElement, state: TodoState): HTMLElement => {
  const element = targetElement.cloneNode(true) as HTMLElement;

  const list = element.querySelector(".todo-list") as HTMLElement;
  const counter = element.querySelector(".todo-count") as HTMLElement;
  const filters = element.querySelector(".filters") as HTMLElement;

  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filtersView(filters, state));

  return element;
};

export { view };
