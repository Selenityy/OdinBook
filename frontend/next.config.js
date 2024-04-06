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
      { protocol: "http", hostname: "localhost" },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/Selenityy/OdinBook/tree/main/backend/**",
      },
    ],
  },
};

module.exports = nextConfig;
