import { Todo, TodoState, TodoView } from "../entity/Todo";
import { cloneComponent } from "../util/cloneComponent";

// derived state를 계산합니다. (DOM으로 그려줄 것)
const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  return `${length} 개 남음`;
};

// 타겟을 클론하고 상태를 주입하여 리턴한다.
const counterView: TodoView = (
  targetElement: HTMLElement,
  { todos }: TodoState
) => {
  const newCounter = cloneComponent(targetElement);
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};

export { counterView };
