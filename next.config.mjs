import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aa44-195-248-240-38.ngrok-free.app",
        port: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
