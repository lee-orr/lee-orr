import { defineConfig, passthroughImageService } from "astro/config";
import Compress from "astro-compress";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [Compress(), solidJs()],
  image: {
    service: passthroughImageService()
  },
  devToolbar: {
    enabled: false
  }
});