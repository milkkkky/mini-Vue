import { mutableHandlers, readonlyHandlers } from "./basehandlers";

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
function createActiveObject(raw: any, basehandlers) {
  return new Proxy(raw, basehandlers);
}
