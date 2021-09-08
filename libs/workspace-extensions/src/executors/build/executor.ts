import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { BuildExecutorSchema } from './schema';
import { readFileSync, writeFileSync } from 'fs';
import * as showdown from 'showdown';
import { ensureDirSync } from 'fs-extra';

export async function markdownToHtml(markdown) {
  const converter = new showdown.Converter();
  return converter.makeHtml(markdown);
}

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const projectRoot = context.workspace.projects[context.projectName].root;

  // read README from project root and convert to markdown with remark
  const readmeContent = readFileSync(
    joinPathFragments(projectRoot, 'README.md'),
    'utf8'
  );

  const readmeHtml = await markdownToHtml(readmeContent);

  const fileOutputDir = joinPathFragments(context.root, options.outputPath);
  ensureDirSync(fileOutputDir);
  writeFileSync(joinPathFragments(fileOutputDir, 'README.html'), readmeHtml, {
    encoding: 'utf8',
  });

  return {
    success: true,
  };
}
