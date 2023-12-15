/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVICE_ID: process.env.SERVICE_ID,
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    API_KEY: process.env.API_KEY,
    SERVER_API: process.env.SERVER_API,
  },
};

module.exports = nextConfig;
