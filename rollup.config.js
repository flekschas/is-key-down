import { terser } from "rollup-plugin-terser";
import buble from "rollup-plugin-buble";

const config = (file, format, plugins) => ({
  input: "index.js",
  output: {
    name: "isKeyDown",
    exports: "named",
    format,
    file
  },
  plugins
});

export default [
  config("dist/is-key-down.js", "umd", [buble()]),
  config("dist/is-key-down.min.js", "umd", [buble(), terser()])
];
