import withLlamaIndex from "llamaindex/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@acme/ui"],
  },
};

export default withLlamaIndex(nextConfig);
