import { TodoState } from "./entity/Todo";
import getTodos from "./getTodos";
const { view } = await import("./view");

const state: TodoState = {
  todos: getTodos(),
  currentFilter: "모두",
};

const main = document.querySelector(".todoapp") as HTMLElement;

window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  console.log(newMain);
  main.replaceWith(newMain);
  console.log(view);
});
