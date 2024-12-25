/** @type {import('prettier').Config} */
module.exports = {
  ...require("@repo/prettier-config"),
  plugins: [
    "prettier-plugin-packagejson",
    "@ianvs/prettier-plugin-sort-imports",
  ],
}
