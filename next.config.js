/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
const { parsed: localEnv } = require("dotenv").config();
module.exports = {
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  ...nextConfig,
  publicRuntimeConfig: {
    NOTION_KEY: process.env.NEXT_PUBLIC_NOTION_KEY,
    DATABASE_ID: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    ActiveUser: process.env.NEXT_PUBLIC_NOTION_AU,
  },
  env: {
    ...localEnv, // Will be available on both server and client
  },
  images: {
    domains: ["www.notion.so"],
  },
};
