import { defineConfig } from "cypress"
import { cloudPlugin } from "cypress-cloud/plugin"

export default defineConfig({
  projectId: "mcysrp",
  video: true,

  e2e: {
    async setupNodeEvents(on, config) {
      const result = await cloudPlugin(on, config)
      return result
    },
    specPattern: "**/cypress/e2e/path-finder/*.{js,ts}",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
