import { build } from "esbuild";
import { readFile } from "fs/promises";
// const { build } = require("esbuild");
// const { readFile } = require("fs/promises");

const main = async () => {
  const { dependencies } = JSON.parse(
    await readFile("./package.json")
  );

  const entryFile = "src/index.ts";
  const shared = {
    bundle: false,
    entryPoints: [entryFile],
    // external: Object.keys(dependencies),
    logLevel: "info",
    minify: true,
    sourcemap: false,
  };

  build({
    ...shared,
    format: "esm",
    outfile: "./dist/index.js",
    target: ["ES6"],
  });

  build({
    ...shared,
    format: "cjs",
    outfile: "./dist/index.cjs",
    target: ["ES6"],
  });
};
main();
