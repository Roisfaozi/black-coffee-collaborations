<<<<<<< HEAD
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import { defineConfig } from 'vite';
=======
import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import { defineConfig } from "vite";
>>>>>>> upstream/main

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
<<<<<<< HEAD
    loader: 'jsx',
=======
    loader: "jsx",
>>>>>>> upstream/main
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
<<<<<<< HEAD
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: await fs.readFile(args.path, 'utf8'),
=======
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
>>>>>>> upstream/main
            }));
          },
        },
      ],
    },
  },
});
