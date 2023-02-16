import typescript from "@rollup/plugin-typescript";
export default {
  input: "./src/index.ts",
  output: [
    //1.cjs -> commonjs
    //2.esm
    {
      formmat: "cjs",
      file: "lib/mini-vue.cjs.js",
    },
    {
      formmat: "es",
      file: "lib/mini-vue.esm.js",
    },
  ],
  plugins: [typescript()],
};
