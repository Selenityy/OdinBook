// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['localhost'],
//   },
// };

// module.exports = nextConfig;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
