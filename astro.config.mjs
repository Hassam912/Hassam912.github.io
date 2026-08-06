// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Update to https://hassamasghar.com once the domain's DNS points here.
  site: 'https://hassam912.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
