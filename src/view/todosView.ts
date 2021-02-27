import { Todo, TodoState, TodoView } from "../entity/Todo";
import { cloneComponent } from "../util/cloneComponent";

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

const todosView: TodoView = (
  targetElement: HTMLElement,
  { todos }: TodoState
) => {
  const newTodoList = cloneComponent(targetElement);
  const todosElements = todos.map(getTodoElement).join("");
  newTodoList.innerHTML = todosElements;
  return newTodoList;
};

export { todosView };
