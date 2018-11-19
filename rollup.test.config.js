import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "./tests.js",
  output: [
    {
      name: "test",
      format: "iife",
      sourcemap: "inline"
    }
  ],
  plugins: [resolve(), commonjs()]
};
