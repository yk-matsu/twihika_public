const path = require("path");
const withTM = require("next-transpile-modules")([
  "@twihika/share",
]);
module.exports = withTM({
  // ... rest of the configuration.
  reactStrictMode: true,
  output: "standalone",
  env: {
    TWI_HIKA_FIREBASE_CLIENT_JSON: process.env.TWI_HIKA_FIREBASE_CLIENT_JSON,
    DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE,
    EVENTBUS_HOST: process.env.EVENTBUS_HOST
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
});
