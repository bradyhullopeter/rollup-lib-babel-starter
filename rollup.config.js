import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const name = "ExampleLibOne";
const input = "src/index.js";
const plugins = [
  postcss({
    extract: true,
    minimize: false,
    modules: false,
    use: ["sass"],
    sourceMap: true,
    plugins: [autoprefixer],
  }),
  resolve({ preferBuiltins: true, browser: true }),
  commonjs(),
  babel({
    babelHelpers: "runtime",
    // skipPreflightCheck: true,
    exclude: /node_modules/,
  }),
  terser(),
];

export default [
  {
    input,
    external: [],
    output: {
      name,
      file: pkg.browser,
      format: "umd",
    },
    plugins: [...plugins, filesize()],
  },
];
