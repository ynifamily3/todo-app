import { Todo, TodoState } from "../entity/Todo";

// derived state를 계산합니다. (DOM으로 그려줄 것)
const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  return `${length} 개 남음`;
};

const counterView = (targetElement: HTMLElement, { todos }: TodoState) => {
  const newCounter = targetElement.cloneNode(true) as HTMLElement;
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};

export { counterView };
