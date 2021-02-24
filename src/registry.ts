import { TodoState, TodoView } from "./entity/Todo";

const { todosView } = await import("./view/todosView");
const { counterView } = await import("./view/counterView");
const { filtersView } = await import("./view/filtersView");

const registry: Record<string, TodoView> = {
  todos: todosView,
  counter: counterView,
  filters: filtersView,
};

const renderWrapper = (component: TodoView): TodoView => {
  return (targetElement, state) => {
    const element = component(targetElement, state);
    const childComponents = element.querySelectorAll<HTMLElement>(
      "[data-component]"
    );
    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;
      if (name === undefined) return;
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
  const cloneComponent = (root: HTMLElement) => {
    return root.cloneNode(true) as HTMLElement;
  };
  return renderWrapper(cloneComponent)(root, state);
};

export { renderWrapper, add, renderRoot };
