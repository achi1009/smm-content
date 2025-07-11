import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // output:"export",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
   webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // suppress fs usage
    };
    return config;
  },
};

export default nextConfig;
