import { Todo, TodoState } from "../entity/Todo";

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

const todosView = (targetElement: HTMLElement, { todos }: TodoState) => {
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;
  const todosElements = todos.map(getTodoElement).join("");
  newTodoList.innerHTML = todosElements;
  return newTodoList;
};

export { todosView };
