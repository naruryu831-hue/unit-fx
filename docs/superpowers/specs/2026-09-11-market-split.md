# 国内FX / 海外FX サイト分離 仕様（2026-09-11）

## 背景
国内FX広告主（DMM FX・FXTF 等）の提携条件は「掲載サイト内に海外FXの掲載・訴求があるサイト」を禁止している。
unit-fx.jp は国内FX 79本＋海外FX 68本を同居させているため、国内FX案件（1件 1〜3万円）が成果否認・提携解除になる。
→ **1つのリポジトリから、環境変数で「国内FX専門サイト」と「海外FX専門サイト」の2つをビルドする。**

## 決定事項
- 環境変数 `NEXT_PUBLIC_SITE_MARKET` = `domestic`（既定） | `overseas`。
  - 未設定は必ず `domestic`（本番 unit-fx.jp が誤って海外FXを出さないため）。
- サイト定義（`src/lib/site-config.ts`）
  | | domestic | overseas |
  |---|---|---|
  | SITE_MARKET | 'domestic' | 'overseas' |
  | SITE_NAME | UNIT-FX | 海外FX比較ラボ |
  | SITE_URL 既定 | https://unit-fx.jp | https://kaigai-fx-lab.vercel.app |
  | SITE_DESCRIPTION | 国内FX11社を…（海外FXに触れない） | 海外FX7社を…（国内FXに触れない） |
  | ロゴ文字 | U / UNIT-FX | K / 海外FX比較ラボ |
  | GA4 | G-SLRLGGPQRW（NEXT_PUBLIC_GA_ID で上書き可） | NEXT_PUBLIC_GA_ID が設定されている時だけ出力（未設定なら GA タグを出さない） |
  - `OVERSEAS_SITE_URL = 'https://kaigai-fx-lab.vercel.app'` を定数として持つ（リダイレクト先に使う）。
- データ層
  - `src/data/articles-index.ts`: `allArticles`（全件）と `articles`（SITE_MARKET でフィルタ済み）を export。`market` 未指定は overseas 扱い（既存仕様どおり）。
  - `src/data/brokers-index.ts`: `allBrokers` と `brokers`（フィルタ済み）。`getBrokerBySlug` は **フィルタ済み** `brokers` を引く（別市場の業者を参照したらビルド時に throw させて漏れを検出する）。`domesticBrokers` / `overseasBrokers` は allBrokers から算出（既存 import を壊さない）。
  - `src/lib/get-article.ts` はフィルタ済み `articles` を使う（変更不要なら触らない）。
- 記事本文の相互参照を断つ（**データ修正**）
  - domestic 記事（`market: 'domestic'`）の本文・FAQ・summaryPoints・relatedSlugs から、海外FX記事（overseas slug）への `[text](/articles/<slug>)` リンクを除去して素のテキストにする。relatedSlugs / brokerSlugs は同一市場内のみ。
  - domestic 記事から海外FX業者の固有名（XM, Exness, TitanFX, HFM, BigBoss, FXGT, AXIORY, Titan FX, HotForex）を消す。「海外FX業者はレバレッジが数百倍」のような一般的な対比説明は残してよいが、海外FXを勧める・誘導する文（例:「海外FXなら〜できます」「海外FXも検討」）は削除または国内FXの説明に書き換える。
  - overseas 記事から domestic 記事へのリンクも素のテキストにする（両方向でリンクしない。unit-fx.jp への絶対URLも張らない）。
  - 記事の意味が通るよう、削った箇所は前後を軽く整える。文字数の大幅減はしない。
- ルーティング / UI（`SITE_MARKET` で分岐）
  - `/`（トップ）: 現在の MarketBlock 構成のうち **自市場のブロックだけ** を表示。POPULAR_SLUGS も自市場の記事だけ。
  - `/kokunai`: domestic のときは現状どおり。overseas のときは `notFound()`。
  - `/kaigai`: overseas のときは現状どおり。domestic のときは `notFound()`（next.config のリダイレクトが先に効く）。
  - `/articles/[slug]`: `generateStaticParams` はフィルタ済み `articles`。別市場 slug は `notFound()`。
  - SiteHeader NAV / SiteFooter リンク列・説明文 / not-found のリンク / InlineText のラベル / ArticleMeta / about ページ / tools ページの説明: 自市場の内容だけにする。domestic で「海外FX」という語を UI 固定文言に残さない（RiskDisclaimer の既存 market 分岐は維持）。
  - `FxCalculators`: domestic では「海外 1000倍」プリセットを出さない・税金シミュレーターは申告分離課税（国内）だけを表示し「国内 vs 海外」比較行を出さない。overseas では現状どおり。ToolsPromo の文言も同様。
  - OG 画像（`opengraph-image.tsx` 各種）と `layout.tsx` の metadata / JSON-LD は SITE_NAME / SITE_DESCRIPTION を使う（ハードコードの "UNIT-FX" と「国内FX・海外FX業者比較」を置き換える）。
  - `sitemap.ts`: 自市場の記事＋自市場の一覧ページ（/kokunai か /kaigai の片方）だけ。
- リダイレクト（`next.config.ts`）
  - `scripts/gen-overseas-slugs.mjs` で `src/data/overseas-slugs.json`（overseas 記事 slug の配列）を生成してコミット。data-integrity テストで JSON と allArticles の一致を検証する。
  - domestic ビルドでは `/kaigai` → `${OVERSEAS_SITE_URL}/kaigai`、`/articles/<overseas slug>` → `${OVERSEAS_SITE_URL}/articles/<slug>` を permanent(308) リダイレクト。
  - 既存の ENABLE_DOMAIN_REDIRECT（vercel.app/www → unit-fx.jp）は domestic のときだけ従来どおり。overseas では出さない。
- アフィリエイト（`src/lib/affiliates.ts`）
  - `dmm-fx` をアクセストレードのリンクに差し替える（¥30,000、A8 の ¥20,000 より高い）。A8 のリンクはコメントで残す。
    - homepage: `https://h.accesstrade.net/sp/cc?rk=0100kz3n00oyuv`（素材「DMM FX公式サイトへ」）
    - signup: `https://h.accesstrade.net/sp/cc?rk=0100kz3o00oyuv`（素材「DMM FX無料口座お申込みへ」）
- テスト（vitest）
  - 新規 `src/data/__tests__/market-isolation.test.ts`:
    1. domestic 記事の title/body/faq/summaryPoints に海外業者名（上記リスト、大文字小文字無視）が含まれない。
    2. domestic 記事の本文・FAQ 内の `/articles/<slug>` リンク先がすべて domestic 記事。overseas 記事のリンク先がすべて overseas 記事。
    3. relatedSlugs / brokerSlugs が同一市場内。
    4. `overseas-slugs.json` が allArticles の overseas slug 集合と一致。
  - 既存テストは `allArticles` / `allBrokers` を使うべきものはそちらに切り替えて全件検証を維持する。
  - `scripts/check-market-isolation.mjs`: `NEXT_PUBLIC_SITE_MARKET=domestic next build` 後に `.next/server/app` 配下の HTML/RSC を grep し、`affx.click|exnessonelink|hfm.com/sv|fxgt.link|/articles/<overseas slug>|XM|Exness` が 0 件であることを確認して exit code を返す。README に手順を書く。

## 完了条件
- `npm test` 全件パス、`npx tsc --noEmit` エラーなし、`npm run lint` エラーなし。
- `NEXT_PUBLIC_SITE_MARKET=domestic npm run build` と `NEXT_PUBLIC_SITE_MARKET=overseas npm run build` が両方成功。
- domestic ビルドで `node scripts/check-market-isolation.mjs` が 0 件。
- 触らない範囲: 記事の追加・削除はしない（分離のための本文修正のみ）。デザイン変更はしない。`.vercel/`・`.env.local` は触らない。
