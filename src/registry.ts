import { TodoView } from "./entity/Todo";
import { cloneComponent } from "./util/cloneComponent";

const registry: Record<string, TodoView> = {}; // {todos: ƒ, counter: ƒ, filters: ƒ}

const renderWrapper: (component: TodoView) => TodoView = (component) => {
  return (targetElement, state) => {
    const element = component(targetElement, state);
    // 실제 dom 찾기
    const childComponents = element.querySelectorAll<HTMLElement>(
      "[data-component]"
    );
    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;
      if (name === undefined) {
        return;
      }
      if (!(name in registry)) return;
      const child = registry[name];
      target.replaceWith(child(target, state));
    });
    return element;
  };
};

const add = (name: string, component: TodoView) => {
  registry[name] = renderWrapper(component);
};

const renderRoot: TodoView = (root, state) => {
  return renderWrapper(cloneComponent)(root, state);
};

export { renderWrapper, add, renderRoot };
