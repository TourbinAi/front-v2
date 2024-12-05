module.exports = [
  {
    extends: "next/core-web-vitals",
    plugins: [
      // ...
      "react-hooks",
    ],
    rules: {
      // ...
      "react-hooks/rules-of-hooks": "warn", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    },
  },
];
