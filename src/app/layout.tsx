import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site-config";
import { SiteHeader } from "@/components/fx/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "UNIT-FX | 国内FX・海外FX業者比較",
  description:
    "国内FX主要8社と海外FX7社を、取引単位・スプレッドの読み方・レバレッジ・税金など公式サイトで確認できる事実だけで比較。必要証拠金・税金の計算ツールも無料で使えます。",
  alternates: { canonical: "/" },
  openGraph: { siteName: "UNIT-FX", type: "website", locale: "ja_JP" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
