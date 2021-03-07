import { TodoState } from "./entity/Todo";
const { getTodos } = await import("./getTodos");
const { todosView } = await import("./view/todosView");
const { counterView } = await import("./view/counterView");
const { filtersView } = await import("./view/filtersView");
const { add, renderRoot } = await import("./registry");

add("todos", todosView);
add("counter", counterView);
add("filters", filtersView);

/**
 * 속성 수가 다르다.
 * 하나 이상의 속성이 변경됐다.
 * 노드에는 자식이 없으며, textContent가 다르다.
 */
function isNodeChanged(node1: Element, node2: Element) {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  // 애트리뷰트가 둘 다 없다면..
  if (!n1Attributes && !n2Attributes) return false;
  // 하나만 있다면
  if (!n1Attributes && n2Attributes) return true;
  if (n1Attributes && !n2Attributes) return true;

  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }
  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);
    return attribute1 !== attribute2;
  });
  if (differentAttribute) {
    return true;
  }

  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }
  return false;
}

function applyDiff(parentNode: Node, realNode: Element, virtualNode: Element) {
  // 새 노드가 정의되지 않는 경우 실제 노드 삭제
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }
  // 실제 노드가 정의되지 않지만 가상 노드가 존재하는 경우 부모 노드에 추가
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }
  // 두 노드가 모두 정의된 경우 두 노드 간에 차이가 있는지 확인한다.
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.childNodes) as Element[];
  const virtualChildren = Array.from(virtualNode.childNodes) as Element[];

  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
}

const state: TodoState = {
  todos: getTodos(),
  currentFilter: "모두",
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector<HTMLElement>(".todoapp");
    if (main === null) {
      return;
    }
    const newMain = renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 5000);
render();
