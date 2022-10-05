const withTM = require("next-transpile-modules")(["@twihika/ui"]);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
