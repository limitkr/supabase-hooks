import { defineConfig } from "tsup";

export default defineConfig({
  // entry: ["src/index.ts", "src/hooks/unstable/index.ts"],
  entry: {
    index: "src/index.ts",
    "unstable/index": "src/hooks/unstable/index.ts",
  },
  splitting: true,
  sourcemap: false,
  clean: true,
  bundle: false,
  treeshake: true,
  minify: true,
  dts: true,
  format: ["esm"],
  outDir: "dist",
  esbuildOptions(options, context) {
    options.outbase = "./";
  },
});

// src/index.ts src/hooks/unstable/index.ts --treeshake --minify --format esm,cjs --dts --external react
