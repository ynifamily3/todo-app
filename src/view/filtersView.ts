import { TodoState, TodoView } from "../entity/Todo";
import { cloneComponent } from "../util/cloneComponent";

// target을 복제하여 state 주입한 DOM을 반환합니다.
const filtersView: TodoView = (
  targetElement: HTMLElement,
  { currentFilter }: TodoState
): HTMLElement => {
  const newCounter = cloneComponent(targetElement);
  Array.from(newCounter.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });
  return newCounter;
};

export { filtersView };
