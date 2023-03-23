import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "unstable/index": "src/hooks/unstable/index.ts",
  },
  splitting: true,
  sourcemap: false,
  skipNodeModulesBundle: true,
  clean: true,
  treeshake: true,
  minify: true,
  dts: true,
  format: ["esm"],
  outDir: "dist",
  esbuildOptions(options, context) {
    options.outbase = "./";
  },
});
