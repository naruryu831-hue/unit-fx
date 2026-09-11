# UNIT-FX

国内FX・海外FX業者の比較・レビューアフィリエイトサイト。

同一リポジトリから、環境変数 `NEXT_PUBLIC_SITE_MARKET` で「国内FX専門サイト」（domestic・既定）と
「海外FX専門サイト」（overseas）の2つを別々にビルドできる。国内FX広告主は「掲載サイト内に海外FXの
掲載・訴求があるサイト」を提携条件で禁止しているため、domestic ビルドの出力に海外FX業者・海外FX記事・
海外FXアフィリエイトリンクを一切含めない。詳細仕様は
`docs/superpowers/specs/2026-09-11-market-split.md` を参照。

## 開発

```bash
npm install
npm run dev      # http://localhost:3000（既定 = domestic）
npm test         # Vitest
npx tsc --noEmit # 型チェック
npm run lint     # ESLint
```

市場を指定して開発サーバー・ビルドを動かす場合（Git Bash 構文）:

```bash
NEXT_PUBLIC_SITE_MARKET=domestic npm run dev
NEXT_PUBLIC_SITE_MARKET=overseas npm run dev
```

## ビルド（国内FX / 海外FX）

```bash
# 国内FXサイト（unit-fx.jp）。NEXT_PUBLIC_SITE_MARKET 未設定でも domestic になる。
NEXT_PUBLIC_SITE_MARKET=domestic npm run build

# 海外FXサイト（kaigai-fx-lab.vercel.app）
NEXT_PUBLIC_SITE_MARKET=overseas npm run build
```

### 市場分離の検証（domestic ビルド専用）

domestic ビルドの出力に海外FXの内容が紛れ込んでいないかを機械的に検査するスクリプトがある。

```bash
NEXT_PUBLIC_SITE_MARKET=domestic npm run build
node scripts/check-market-isolation.mjs
```

`.next/server/app` 配下の HTML/RSC 出力を対象に、海外FXアフィリエイトドメイン
（`affx.click` / `exnessonelink` / `hfm.com/sv` / `fxgt.link`）、海外FX業者名（XM・Exness 等）、
海外FX記事への `/articles/<slug>` リンクをすべて検出し、1件でもヒットすれば exit code 1 で失敗する。
0件であることを確認してからデプロイすること。

海外FX記事の slug 一覧（`src/data/overseas-slugs.json`）は `src/data/articles/*.ts` から機械的に
再生成できる（記事を追加・変更した後は再実行してコミットする）。

```bash
node scripts/gen-overseas-slugs.mjs
```

## 設計・記事バックログ

- 設計: `docs/superpowers/specs/2026-07-27-kaigai-fx-affiliate-site-design.md`
- 国内/海外サイト分離の設計: `docs/superpowers/specs/2026-09-11-market-split.md`

## デプロイ

GitHubリポジトリ → Vercel プロジェクト作成 → push で自動デプロイ。
国内FXサイト（`unit-fx.jp`、`NEXT_PUBLIC_SITE_MARKET` 未設定 = domestic）と、
海外FXサイト（`kaigai-fx-lab.vercel.app`、`NEXT_PUBLIC_SITE_MARKET=overseas`）を
別々の Vercel プロジェクトとしてデプロイする想定。
