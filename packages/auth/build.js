// const { build } = require("esbuild");
// const { readFile } = require("fs/promises");

import { build } from "esbuild";
import { readFile } from "fs/promises";
import glob from "glob"
const main = async () => {
  const { dependencies } = JSON.parse(
    await readFile(new URL("./package.json", import.meta.url))
  );

  const entryFile = "src/index.ts";
  // const entryFile = glob.sync("src/**/*.ts");

  const shared = {
    bundle: true,
    // bundle: false,
    external: Object.keys(dependencies),
    entryPoints: [entryFile],
    logLevel: "info",
    minify: true,
    sourcemap: false,
  };

  build({
    ...shared,
    format: "cjs",
    // outExtension: {".js": ".cjs"},
    outfile: "./dist/index.cjs",
    // outdir: "./dist/cjs",
    target: ["es2020"],
    platform: "node"
  });

  build({
    ...shared,
    format: "esm",
    // outExtension: {".js": ".mjs"},
    outfile: "./dist/index.js",
    // outdir: "./dist/esm",
    target: ["es2020"],
    platform: "node"
  });
};

main()