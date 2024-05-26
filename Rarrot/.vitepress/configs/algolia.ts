import type { DefaultTheme } from "vitepress";

export const algolia: DefaultTheme.Config["search"] = {
  provider: "algolia",
  options: {
    appId: "A5NVAQQUEO",
    apiKey: "fa9cdd39aee827af75ca9ead469cec1b",
    indexName: "rorrot",
  },
};
