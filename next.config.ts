import type { NextConfig } from "next";

const CANONICAL_HOST = "unit-fx.jp";

const nextConfig: NextConfig = {
  async redirects() {
    // DNS が unit-fx.jp に向くまでは無効にしておく（Vercel の環境変数 ENABLE_DOMAIN_REDIRECT=true で有効化）。
    if (process.env.ENABLE_DOMAIN_REDIRECT !== "true") {
      return [];
    }
    // 旧URL(vercel.app)と www は独自ドメインへ恒久リダイレクトし、評価を1つに集約する。
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "unit-fx.vercel.app" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
