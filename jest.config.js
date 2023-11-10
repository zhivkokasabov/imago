module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ["node_modules"]
};
