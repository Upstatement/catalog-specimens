const resolve = require("@rollup/plugin-node-resolve");
const babel = require("rollup-plugin-babel");
import postcss from "rollup-plugin-postcss";

module.exports = {
  input: [
    "src/index.js",
    "src/code-docs/index.js",
    "src/code-tabbed/index.js",
    "src/color-block/index.js",
    "src/comment/index.js"
  ],
  output: {
    dir: "dist",
    format: "es"
  },
  preserveModules: true,
  plugins: [
    resolve(),
    babel({ exclude: "node_modules/**" }),
    postcss({ extract: true })
  ],
  external: [
    "catalog",
    "dayjs",
    "react",
    "react-docgen",
    "react-dom",
    "react-highlight.js",
    "react-html-parser",
    "showdown"
  ]
};