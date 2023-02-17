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
  processComponent(vnode, container);

  //
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}
function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();

  //vnode
  //vnode -> element ->mountElement
  patch(subTree, container);
}
