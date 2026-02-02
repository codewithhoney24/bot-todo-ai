/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  serverExternalPackages: ["pyodide"],
  images: {
    unoptimized: true
  },
  experimental: {
    webpackBuildWorker: false,
  },
  // Specify the root directory to resolve the multiple lockfiles warning
  turbopack: {
    root: "./"
  }
}

export default nextConfig