import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),

        docs: resolve(
          __dirname,
          "docs/index.html"
        ),

        numericalComputations: resolve(
          __dirname,
          "docs/modules/numerical_comutations/index.html"
        ),

        linearAlgebra: resolve(
          __dirname,
          "docs/modules/numerical_comutations/linear_algreba/index.html"
        ),

        linalg: resolve(
          __dirname,
          "docs/modules/numerical_comutations/linear_algreba/linalg/index.html"
        ),

        solve: resolve(
          __dirname,
          "docs/modules/numerical_comutations/linear_algreba/linalg/methods_class/solve.html"
        ),
      },
    },
  },
});