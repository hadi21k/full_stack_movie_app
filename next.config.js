/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "image.tmdb.org",
      },
    ],
  },
};

module.exports = nextConfig;
