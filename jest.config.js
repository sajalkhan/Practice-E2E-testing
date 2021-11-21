module.exports = {
  preset: "jest-puppeteer",
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ["**/Test/**/*.[jt]s?(x)?", "**/?(*.)+(e2e).[jt]s?(x)?"],
  globals: { URL: "http://executeautomation.com/demosite" },
  testTimeout: 30000,
  verbose: true,
};
