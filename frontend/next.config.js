/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
  
  // Comment out codes below in the production environment
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 800,
  //     aggregateTimeout: 500,
  //     ignored: ["node_modules"],
  //   };
  //   return config;
  // },
};

module.exports = nextConfig;
