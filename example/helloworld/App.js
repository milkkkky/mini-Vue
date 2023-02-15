export const App = {
  //.vue
  //template
  //render

  render() {
    return h("div", "hi," + this.msg);
  },
  setup() {
    //composition api
    return {
      msg: "mini-vue",
    };
  },
};
