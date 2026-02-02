/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  serverExternalPackages: ["pyodide"],
  images: {
    unoptimized: true
  },
  experimental: {
    webpackBuildWorker: false
  }
}

export default nextConfig