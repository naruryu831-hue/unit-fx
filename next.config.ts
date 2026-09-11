import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

const CANONICAL_HOST = "unit-fx.jp";
const OVERSEAS_SITE_URL = "https://kaigai-fx-lab.vercel.app";
const SITE_MARKET = process.env.NEXT_PUBLIC_SITE_MARKET === "overseas" ? "overseas" : "domestic";

function loadOverseasSlugs(): string[] {
  const filePath = path.join(process.cwd(), "src", "data", "overseas-slugs.json");
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  async redirects() {
    const redirects: NonNullable<Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>> = [];

    // domestic ビルドでは、海外FXの一覧ページと記事は海外FX専門サイトへ恒久リダイレクトする。
    // 国内FX広告主の「海外FXの掲載・訴求があるサイト禁止」条件のため、domestic ビルドの出力に
    // 海外FXの内容を一切含めない。
    if (SITE_MARKET === "domestic") {
      redirects.push({
        source: "/kaigai",
        destination: `${OVERSEAS_SITE_URL}/kaigai`,
        permanent: true,
      });
      for (const slug of loadOverseasSlugs()) {
        redirects.push({
          source: `/articles/${slug}`,
          destination: `${OVERSEAS_SITE_URL}/articles/${slug}`,
          permanent: true,
        });
      }
    }

    // DNS が unit-fx.jp に向くまでは無効にしておく（Vercel の環境変数 ENABLE_DOMAIN_REDIRECT=true で有効化）。
    // 旧URL(vercel.app)と www は独自ドメインへ恒久リダイレクトし、評価を1つに集約する。domestic 限定。
    if (SITE_MARKET === "domestic" && process.env.ENABLE_DOMAIN_REDIRECT === "true") {
      redirects.push(
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
        }
      );
    }

    return redirects;
  },
};

export default nextConfig;
