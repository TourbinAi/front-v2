import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4)$/i,
      type: "asset/resource",
    });
    return config;
  },
  transpilePackages: ["lucide-react"],
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "0eee-103-75-197-29.ngrok-free.app",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.huffingtonpost.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.cntraveler.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "get.pxhere.com",
        port: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
