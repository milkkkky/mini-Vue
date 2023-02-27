import { h } from "../../lib/mini-vue.esm.js";
export const Foo = {
  setup(props) {
    console.log("prop", props);

    props.count++;
    console.log("prop", props);
  },
  render() {
    return h("div", {}, "foo:" + this.count);
  },
};
