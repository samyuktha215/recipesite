module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },

  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js',
    '@testing-library/jest-dom', // load matchers here
  ],
};