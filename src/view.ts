import { Todo, TodoState } from "./entity/Todo";

// todo state로부터 DOM을 그려서 반환합니다.
const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;
  return `
  <li ${completed ? 'class="completed"' : ""}>
    <div class="view">
      <input
        ${completed ? "checked" : ""}
        class="toggle"
        type="checkbox">
        <label>${text}</label>
        <button class="destroy">X</button>
    </div>
    <input class="edit" value="${text}" />
  </li>
  `;
};

// derived state를 계산합니다. (DOM으로 그려줄 것)
const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  return `${length} 개 남음`;
};

// target을 복제하여 state 주입한 DOM을 반환합니다.
const view = (targetElement: HTMLElement, state: TodoState): HTMLElement => {
  const { currentFilter, todos } = state;

  const element = targetElement.cloneNode(true) as HTMLElement;
  const list = element.querySelector(".todo-list") as HTMLElement;
  const counter = element.querySelector(".todo-count") as HTMLElement;
  const filters = element.querySelector(".filters") as HTMLElement;

  list.innerHTML = todos.map(getTodoElement).join("");
  counter.textContent = getTodoCount(todos);
  Array.from(filters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });
  return element;
};

export { view };
