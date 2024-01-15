/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "f8-mindmap.sanphamkythuat.online",
      },
    ],
  },
  env: {
    SERVICE_ID: process.env.SERVICE_ID,
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    API_KEY: process.env.API_KEY,
    SERVER_API_LOGIN_REGISTER: process.env.SERVER_API_LOGIN_REGISTER,
  },
};

module.exports = nextConfig;
