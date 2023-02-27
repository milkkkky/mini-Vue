import { h } from "../../lib/mini-vue.esm.js";
window.self = null;
export const App = {
  //.vue
  //template
  //render

  render() {
    window.self = this;
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
        onClick() {
          console.log("click");
        },
        onMousedown() {
          console.log("onMousedown");
        },
      },
      //setupState
      //this.$el -> get root element
      "hi," + this.msg
      // "hi"
      //Array
      // [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")]
    );
  },
  setup() {
    //composition api
    return {
      msg: "mini-vue,123",
    };
  },
};
