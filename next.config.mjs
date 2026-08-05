/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow dev resources (CSS, JS, HMR) for LAN access & tunneling (ngrok, Cloudflare, localtunnel, etc.)
  allowedDevOrigins: [
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
    '0.0.0.0',
    '0.0.0.0:3000',
    '192.168.1.2',
    '192.168.1.2:3000',
    '192.168.1.129',
    '192.168.1.129:3000',
    '192.168.1.57',
    '192.168.1.57:3000',
    '*.ngrok-free.app',
    '*.ngrok.io',
    '*.loca.lt',
    '*.trycloudflare.com',
    '*.zrok.io',
    '*.tunnelto.dev',
  ],
  async headers() {
    return [
      {
        // Allow CORS for all static assets & CSS for tunneling & LAN access
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Authorization, Accept' },
        ],
      },
    ];
  },
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
