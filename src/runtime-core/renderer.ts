import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  //patch
  //
  patch(vnode, container);
}
function patch(vnode, container) {
  //去处理组件
  //TODO 判断vnode是不是一个emelment
  // 是 element 那么就应该处理 element
  // processElement();
  //判断是不是 element 类型
  // processComponent(vnode, container);
  console.log("", vnode.type);
  if (typeof vnode.type === "string") {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
  //
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}
function mountComponent(initialvnode: any, container) {
  const instance = createComponentInstance(initialvnode);
  setupComponent(instance);
  setupRenderEffect(instance, initialvnode, container);
}
function setupRenderEffect(initialvnode: any, vnode, container) {
  const { proxy } = initialvnode;
  const subTree = initialvnode.render.call(proxy);

  //vnode
  //vnode -> element ->mountElement
  patch(subTree, container);

  //element -> mount
  vnode.el = subTree.el;
}
function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  // vnode -> element -> div
  const el = (vnode.el = document.createElement(vnode.type));
  const { children } = vnode;

  if (typeof children === "string") {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }

  const { props } = vnode;
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }

  container.append(el);
}
function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}
