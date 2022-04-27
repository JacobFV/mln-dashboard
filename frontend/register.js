/**
 * Used for mocha testing
 * Copied from tutorial https://medium.com/swlh/how-to-setting-up-unit-tests-with-typescript-871c0f4f1609
 */

/**
 * Overrides the tsconfig used for the app.
 * In the test environment we need some tweaks.
 */
const tsNode = require("ts-node");
const tsConfigPaths = require("tsconfig-paths");
const mainTSConfig = require("./tsconfig.json");
const testTSConfig = require("./test/tsconfig.json");

tsConfigPaths.register({
  baseUrl: "./test",
  paths: {
    ...mainTSConfig.compilerOptions.paths,
    ...testTSConfig.compilerOptions.paths,
  },
});

tsNode.register({
  files: true,
  transpileOnly: true,
  project: "./test/tsconfig.json",
});
