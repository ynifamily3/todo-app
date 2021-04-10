# 할 일 관리
- 할 일을 관리하세요 !

## 구현 방법 설명 
자바스크립트로 `DOM`을 제어할 때 제일 편한 방법은 노드를 다 날리고 새로운 노드를 새로 주입하는 것이지만 `DOM` 조작은 비싸므로, 딱 필요한 `DOM`만 갱신하도록 해 보았습니다.

## 가정

기존에는 다음과 같이 전부 새로운 `DOM` 으로 교체하였습니다.

```tsx
const main = document.querySelector<HTMLElement>(".todoapp");

// newMain 가상 DOM 생성
// ... newMain = main.cloneNode(true);
main.replaceWith(newMain); // 새로운 
```

실제 변경이 가해진 DOM만 바꾸도록 `applyDiff` 함수를 정의하였다.

```tsx
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
	// 자식 노드들에 대해 비교하고 교체하는 과정을 재귀로 진행한다.
  const realChildren = Array.from(realNode.childNodes) as Element[];
  const virtualChildren = Array.from(virtualNode.childNodes) as Element[];

  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
}
```

`isNodeChanged()` 는 자식 노드가 없을 때, `두 노드의 속성(attribute) 수`, `속성 변경 여부`, `textContent` 를 비교한다. (자식 노드가 있을 경우 이 함수에서는 일단 `false` 를 리턴하고 호출자(`applyDiff`)에게 나머지 판단을 맡긴다.)

```tsx
function isNodeChanged(node1: Element, node2: Element) {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;

  // 애트리뷰트가 하나만 있다면
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
```

사용하는 쪽에서 다음과 같이 수정합니다.

```tsx
const main = document.querySelector<HTMLElement>(".todoapp");

// newMain 가상 DOM 생성
// ... newMain = main.cloneNode(true);
applyDiff(document.body, main, newMain);
```

---

## 결과

- before
- https://user-images.githubusercontent.com/13795765/114253272-86514b80-99e4-11eb-90b4-638d989ae965.mov

- after
- https://user-images.githubusercontent.com/13795765/114253283-95d09480-99e4-11eb-8a22-4b5fd2885b6f.mov

