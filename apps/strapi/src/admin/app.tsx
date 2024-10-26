import { cs } from "./cs"

export default {
  config: {
    locales: ["en", "fa"],
    translations: {
      cs,
    },
  },
  bootstrap(app) {
    console.log(app)
  },
}
