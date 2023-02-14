import { hasChanged, isObject } from "../shared";
import { trackEffects, triggerEffects, isTracking } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  public dep;
  private _rawValue: any;
  public __v_isRef = true;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    //value => reactive
    //1、看看value是不是对象
    //
    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    //一定先去修改了value的值

    //newValue -> this._value
    //hasChanged
    //对比的时候 object
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue;

      // this._value = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}
function convert(value) {
  return isObject(value) ? reactive(value) : value;
}
function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}
export function ref(value) {
  return new RefImpl(value);
}
export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  //看看是不是ref-->ref.value
  return isRef(ref) ? ref.value : ref;
}
