/** @type {import('next').NextConfig} */
const withImages = require("next-images");
module.exports = withImages({
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
});
