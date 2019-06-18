module.exports = {
  displayName: "integration tests",
  preset: "jest-puppeteer",
  testRegex: "integration/specs/.*\\.spec\\.js$",
  transformIgnorePatterns: ["./src"],
  reporters: [
    "default",
    [
      "jest-html-reporter", {
        "pageTitle": "Integration Tests Report",
        "outputPath": "./integration/output/report.html"
      }
    ]
  ]
};