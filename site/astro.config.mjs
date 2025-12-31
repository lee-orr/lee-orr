import { defineConfig, passthroughImageService } from "astro/config";
import Compress from "astro-compress";

import solidJs from "@astrojs/solid-js";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [Compress(), solidJs(), mdx()],
  image: {
    service: passthroughImageService()
  },
  devToolbar: {
    enabled: false
  }
});