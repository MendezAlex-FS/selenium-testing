require('dotenv').config();

module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    ...(process.env.RUN_GOOGLE_TESTS === 'true'
      ? []
      : ['selenium-google.test.js']),
  ],
};