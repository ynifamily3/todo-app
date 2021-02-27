import { TodoState } from "./entity/Todo";
const { getTodos } = await import("./getTodos");
const { todosView } = await import("./view/todosView");
const { counterView } = await import("./view/counterView");
const { filtersView } = await import("./view/filtersView");
const { add, renderRoot } = await import("./registry");

add("todos", todosView);
add("counter", counterView);
add("filters", filtersView);

const state: TodoState = {
  todos: getTodos(),
  currentFilter: "모두",
};

window.requestAnimationFrame(() => {
  const main = document.querySelector<HTMLElement>(".todoapp");
  if (main === null) {
    return;
  }
  const newMain = renderRoot(main, state);
  main.replaceWith(newMain);
});
