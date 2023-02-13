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
  return createActiveObject(raw, readonlyHandlers);
}
export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowReadonlyHanlders);
}
function createActiveObject(raw: any, basehandlers) {
  return new Proxy(raw, basehandlers);
}
export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}
