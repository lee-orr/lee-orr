import { defineConfig } from 'astro/config';
import Compress from "astro-compress";


// https://astro.build/config
export default defineConfig({
  integrations: [ Compress()]
});