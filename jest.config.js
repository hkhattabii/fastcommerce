const JsConfigPathsMapper = require('jsconfig-paths-jest-mapper');

module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: new JsConfigPathsMapper({
    configFileName: 'jsconfig.json',
  }),
};
