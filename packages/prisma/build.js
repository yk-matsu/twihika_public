const { build } = require("esbuild");
const { readFile, writeFile } = require("fs/promises");
const { getSchema, printSchema,createPrismaSchemaBuilder } = require("@mrleebo/prisma-ast");
const glob = require('glob')
const entryPoints = glob.sync('./src/**/*.ts')

// builder.generator('nexusPrisma', 'nexus-prisma')

// import { build } from "esbuild";
// import { readFile } from "fs/promises";
const main = async () => {
  const { dependencies } = JSON.parse(await readFile("./package.json"));

  const entryFile = "src/index.ts";

  const shared = {
    bundle: true,
    external: Object.keys(dependencies),
    entryPoints,
    logLevel: "info",
    minify: true,
    sourcemap: false,
  };

  build({
    ...shared,
    entryPoints: [entryFile],
    format: "cjs",
    outfile: "./dist/index.cjs",
    target: ["ES2022"],
    platform: "node",
  });

  // nextjsで読み込まれるようにbundleはしない
  build({
    ...shared,
    entryPoints: [entryFile],
    outfile: "./dist/index.js",
    format: "esm",
    target: ["ES2022"],
    platform: "node",
  });
};

main();
