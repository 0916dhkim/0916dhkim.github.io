const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withTM = require("next-transpile-modules")([
  "@0916dhkim/core",
  "@0916dhkim/prisma",
  "@0916dhkim/theme",
]);

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
module.exports = withTM(
  withVanillaExtract({
    reactStrictMode: true,
  })
);
