import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const isProduction = () => process.env.NODE_ENV === "production";

const scss = [
  postcss({
    extract: true,
    minimize: isProduction() ? true : false,
    modules: false,
    use: ["sass"],
    sourceMap: true,
    plugins: [autoprefixer],
  }),
];

const plugins = [
  ...scss,
  resolve({ preferBuiltins: true, browser: true }),
  commonjs(),
  babel({
    babelHelpers: "runtime",
    exclude: /node_modules/,
  }),
  isProduction() ? terser() : "",
];

export default [
  {
    input: pkg.source,
    external: [],
    output: {
      name: pkg.globalName,
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
    },
    plugins: [...plugins, filesize()],
  },
  {
    input: pkg.source,
    external: ["nanohtml", "nanocomponent"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [...scss],
  },
];
