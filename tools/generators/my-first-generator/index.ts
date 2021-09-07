import { formatFiles, names, logger, Tree } from '@nrwl/devkit';

interface MyFirstGeneratorSchema {
  name: string;
}

export default async function (tree: Tree, schema: MyFirstGeneratorSchema) {
  logger.info(`Hello, ${names(schema.name).className}!`);
  // await formatFiles(tree);
}
