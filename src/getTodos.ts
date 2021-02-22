import { Todo } from "./entity/Todo";

const data: Todo[] = [
  { completed: true, text: "일어나기" },
  { completed: false, text: "씻기" },
  { completed: true, text: "밥먹기" },
  { completed: false, text: "출근하기" },
];

const getTodos = (): Todo[] => {
  return [...data];
};

export default getTodos;
