import {
  formatFiles,
  generateFiles,
  names,
  logger,
  Tree,
  readProjectConfiguration,
  joinPathFragments,
  getProjects,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

interface MyFirstGeneratorSchema {
  name: string;
}

export default async function (tree: Tree, schema: MyFirstGeneratorSchema) {
  const libName = names(schema.name).fileName;

  await libraryGenerator(tree, {
    name: libName,
  });

  // read the rootPath of the library
  const libRootPath = readProjectConfiguration(tree, libName)?.root;

  generateFiles(tree, joinPathFragments(__dirname, './files'), libRootPath, {
    conferenceName: names(schema.name).className,
  });

  await formatFiles(tree);

  // getProjects(tree).forEach((projectConfig, name) => {
  //   logger.info(`Reading project configuration for ${name}`);
  // });
}
