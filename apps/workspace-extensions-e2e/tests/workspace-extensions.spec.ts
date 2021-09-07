import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('workspace-extensions e2e', () => {
  it('should create workspace-extensions', async () => {
    const plugin = uniq('workspace-extensions');
    ensureNxProject(
      '@nxextensibility/workspace-extensions',
      'dist/libs/workspace-extensions'
    );
    await runNxCommandAsync(
      `generate @nxextensibility/workspace-extensions:workspace-extensions ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('workspace-extensions');
      ensureNxProject(
        '@nxextensibility/workspace-extensions',
        'dist/libs/workspace-extensions'
      );
      await runNxCommandAsync(
        `generate @nxextensibility/workspace-extensions:workspace-extensions ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('workspace-extensions');
      ensureNxProject(
        '@nxextensibility/workspace-extensions',
        'dist/libs/workspace-extensions'
      );
      await runNxCommandAsync(
        `generate @nxextensibility/workspace-extensions:workspace-extensions ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
