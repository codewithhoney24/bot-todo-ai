/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  serverExternalPackages: ["pyodide"],
  images: {
    unoptimized: true
  },
  experimental: {
    webpackBuildWorker: false,
    turbopack: {
      root: process.env.NODE_ENV === 'production' ? undefined : './'
    }
  }
}

export default nextConfig