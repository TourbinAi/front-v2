module.exports = {
  ...require("@repo/prettier-config"),
  plugins: [], // Override plugins to remove tailwindcss plugin during type generation
};
