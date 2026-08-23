import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

const siteHostname = "fraserh.dev";

function externalLinksInNewTabs() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === "element" && node.tagName === "a") {
        const href = node.properties?.href;

        if (typeof href === "string" && /^https?:\/\//.test(href)) {
          const hostname = new URL(href).hostname.replace(/^www\./, "");

          if (hostname !== siteHostname) {
            node.properties.target = "_blank";
            node.properties.rel = ["noopener", "noreferrer"];
          }
        }
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}

export default defineConfig({
  site: "https://fraserh.dev",
  output: "static",
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: "github-light" },
    rehypePlugins: [externalLinksInNewTabs],
  },
});
