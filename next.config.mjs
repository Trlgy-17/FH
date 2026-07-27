/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow dev resources (CSS, JS, HMR) for LAN access from mobile & other devices
  allowedDevOrigins: [
    '192.168.1.57',
    '192.168.1.57:3000',
    '192.168.1.2',
    '192.168.1.2:3000',
    '169.254.71.42',
    '169.254.71.42:3000',
    '169.254.168.254',
    '169.254.168.254:3000',
    'localhost:3000',
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
