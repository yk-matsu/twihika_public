const { readFile, writeFile } = require("fs/promises");
const {
  getSchema,
  printSchema,
  createPrismaSchemaBuilder,
} = require("@mrleebo/prisma-ast");

const main = async () => {
  const schema = getSchema(
    await (await readFile("./base.prisma")).toString()
  );
  for (let index = 0; index < schema.list.length; index++) {
    if (schema.list[index].type == "generator") {
      // schema.list[index].assignments.push({
      //   type: 'assignment',
      //   key: "output",
      //   value: '"./generated/prisma-client-js"'
      // })
    }
    if (schema.list[index].type == "model") {
      if (schema.list[index].name == "User") {
        for (let j = 0; j < schema.list[index].properties.length; j++) {
          if (schema.list[index].properties[j].name == "createdAt") {
            // schema.list[index].properties[j].comment = "/// hello";
          }
        }
      }
    }
  }
  const builder = createPrismaSchemaBuilder();
  await writeFile(
    "schema.prisma",
    printSchema(schema) +
      builder
        .generator("zod", "zod-prisma")
        .assignment("output", "./src/zod")
        .assignment("relationModel", "default")
        .print()
  );
};

main()
