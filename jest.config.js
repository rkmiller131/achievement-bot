const config = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 90
    }
  }
};

module.exports = config;