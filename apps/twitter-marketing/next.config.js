const path = require('path');
const withTM = require('next-transpile-modules')([
  '@twihika/auth',
  '@twihika/share',
  '@twihika/ui',
  '@twihika/hasura',
]);
module.exports = withTM({
  // ... rest of the configuration.
  reactStrictMode: true,
  output: 'standalone',
  env: {
    TWI_HIKA_FIREBASE_CLIENT_JSON: process.env.TWI_HIKA_FIREBASE_CLIENT_JSON,
    HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT,
    DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    images: {allowFutureImage: true},
  },
  images: {domains: ['pbs.twimg.com', 'abs.twimg.com']},
});
