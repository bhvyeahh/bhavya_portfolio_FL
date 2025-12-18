/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For the code I provided
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',   // For the error you are seeing
      },
    ],
  },
};

export default nextConfig;