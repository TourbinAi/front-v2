import { defineConfig } from "cypress"

export default defineConfig({
  projectId: "qt4xp6",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "**/cypress/e2e/path-finder/*.{js,ts}",
  },
})
