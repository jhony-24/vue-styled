module.exports = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["\\\\node_modules\\\\"],
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
