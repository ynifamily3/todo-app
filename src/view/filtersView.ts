import { TodoState } from "../entity/Todo";

// target을 복제하여 state 주입한 DOM을 반환합니다.
const filtersView = (
  targetElement: HTMLElement,
  { currentFilter }: TodoState
): HTMLElement => {
  const newCounter = targetElement.cloneNode(true) as HTMLElement;
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
