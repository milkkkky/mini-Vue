import { isObject } from "../shared/index";
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHanlders,
} from "./basehandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}
export function reactive(raw) {
  return new Proxy(raw, mutableHandlers);
  // return new Proxy(raw, {
  //   get: createGetter(),
  //   set: createSetter(),
  // });
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers);
}
export function shallowReadonly(raw) {
  return createReactiveObject(raw, shallowReadonlyHanlders);
}
function createReactiveObject(target, basehandlers) {
  if (!isObject(target)) {
    console.warn(`target ${target} 必须是一个对象`);
    return target;
  }
  return new Proxy(target, basehandlers);
}
export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}
export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
