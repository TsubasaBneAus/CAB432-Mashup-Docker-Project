/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ];
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 500,
      ignored: ["node_modules"],
    };
    return config;
  },
};

module.exports = nextConfig;
