import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const plugins = [
  babel({
    babelHelpers: "bundled",
  }),
  terser(),
  commonjs({
    include: /node_modules/,
  }),
  nodeResolve({ preferBuiltins: true, browser: true }),
];

export default defineConfig({
  input: "./src/index.js",
  output: [
    {
      file: "./lib/index.cjs.js",
      format: "cjs",
    },
    {
      file: "./lib/index.esm.js",
      format: "es",
    },
  ],
  plugins,
});
