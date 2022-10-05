const path = require("path");
const withTM = require("next-transpile-modules")([
  '@cloudscape-design/components',
  '@twihika/share',
  '@twihika/auth',
]);
module.exports = withTM({
  // ... rest of the configuration.
  reactStrictMode: true,
  output: "standalone",
  env: {
    DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
});
