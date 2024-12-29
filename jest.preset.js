const nxPreset = require('@nx/jest/preset').default;
const { compilerOptions } = require('./tsconfig.base.json');
const { pathsToModuleNameMapper } = require('ts-jest');
const { CODE_COVERAGE } = require('./rules');
module.exports = {
  ...nxPreset,
  verbose: true,
  coverageReporters: ['text', 'json-summary', 'html'],
  passWithNoTests: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '',
    useESM: true,
  }),
  coverageThreshold: {
    global: CODE_COVERAGE,
  },
};
