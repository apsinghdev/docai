/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  basePath: '',
  assetPrefix: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'pipedream.com',
        'https://pipedream.com',
        'pipedream-connect-demo.vercel.app',
        'https://pipedream-connect-demo.vercel.app'
      ]
    }
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/_vercel/:path*',
          destination: 'https://pipedream-connect-demo.vercel.app/_vercel/:path*',
          basePath: false
        }
      ]
    }
  },
}

export default nextConfig