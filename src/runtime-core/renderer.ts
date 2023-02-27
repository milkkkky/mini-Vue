import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";
import { ShapeFlags } from "../shared/ShapeFlags";
export function render(vnode, container) {
  //patch
  //
  patch(vnode, container);
}
function patch(vnode, container) {
  //ShapeFlags
  //vnode -> flag

  //去处理组件
  //TODO 判断vnode是不是一个emelment
  // 是 element 那么就应该处理 element
  // processElement();
  //判断是不是 element 类型
  // processComponent(vnode, container);
  const { shapeFlag } = vnode;
  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container);
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
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
  const { children, shapeFlag } = vnode;

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el);
  }

  const { props } = vnode;
  for (const key in props) {
    console.log("key", key);

    const isOn = (key: string) => /^on[A-Z]/.test(key);
    const val = props[key];
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, val);
    } else {
    }
    el.setAttribute(key, val);
  }

  container.append(el);
}
function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}
