#!/usr/bin/env node
// domestic ビルド（NEXT_PUBLIC_SITE_MARKET=domestic next build）の出力に、
// 海外FX業者・海外FX記事・海外FXアフィリエイトリンクが一切含まれていないことを確認する。
//
// 使い方:
//   NEXT_PUBLIC_SITE_MARKET=domestic npm run build
//   node scripts/check-market-isolation.mjs
//
// .next/server/app 配下の HTML/RSC 出力をすべて読み、禁止パターンにマッチする箇所があれば
// ファイル名・パターン・マッチ内容を一覧表示し、1件でもあれば exit code 1 で終了する。

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..')
const appOutDir = path.join(repoRoot, '.next', 'server', 'app')
const overseasSlugsPath = path.join(repoRoot, 'src', 'data', 'overseas-slugs.json')

function listFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const s = statSync(full)
    if (s.isDirectory()) {
      out.push(...listFiles(full))
    } else if (/\.(html|rsc)$/i.test(entry)) {
      // .next/server/app 配下の実際のページ出力（HTML/RSC）だけを対象にする。
      // opengraph-image の .body（PNG バイナリ）や .nft.json（ビルドのファイルトレース、
      // ページ出力ではない）はここでは対象外 — バイナリやビルドメタデータは
      // ユーザーに配信される内容ではないため、含めると誤検知になる。
      out.push(full)
    }
  }
  return out
}

function main() {
  if (!statSyncSafe(appOutDir)) {
    console.error(
      `[check-market-isolation] ${path.relative(repoRoot, appOutDir)} が見つかりません。先に NEXT_PUBLIC_SITE_MARKET=domestic npm run build を実行してください。`
    )
    process.exit(1)
  }

  const overseasSlugs = JSON.parse(readFileSync(overseasSlugsPath, 'utf8'))

  const patterns = [
    { name: 'affx.click (XM affiliate)', re: /affx\.click/i },
    { name: 'exnessonelink (Exness affiliate)', re: /exnessonelink/i },
    { name: 'hfm.com/sv (HFM affiliate)', re: /hfm\.com\/sv/i },
    { name: 'fxgt.link (FXGT affiliate)', re: /fxgt\.link/i },
    { name: 'XM broker name', re: /\bXM\b/ },
    { name: 'Exness broker name', re: /Exness/i },
    ...overseasSlugs.map((slug) => ({
      name: `overseas article link /articles/${slug}`,
      re: new RegExp(`/articles/${slug}(?![a-z0-9-])`, 'i'),
    })),
  ]

  const files = listFiles(appOutDir)
  const violations = []

  for (const file of files) {
    const content = readFileSync(file, 'utf8')
    for (const { name, re } of patterns) {
      const match = content.match(re)
      if (match) {
        violations.push({ file: path.relative(repoRoot, file), pattern: name, match: match[0] })
      }
    }
  }

  if (violations.length > 0) {
    console.error(`[check-market-isolation] ${violations.length}件の違反が見つかりました:\n`)
    for (const v of violations) {
      console.error(`  - ${v.file}: ${v.pattern} (matched "${v.match}")`)
    }
    process.exit(1)
  }

  console.log(
    `[check-market-isolation] OK: ${files.length}件のファイルを検査し、海外FXの内容は見つかりませんでした。`
  )
}

function statSyncSafe(p) {
  try {
    return statSync(p)
  } catch {
    return null
  }
}

main()
