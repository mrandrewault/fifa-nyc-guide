/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export required for Capacitor iOS/Android packaging
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export
  },
  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;
