#!/usr/bin/env node
// src/data/articles/*.ts を直接読み、market: 'domestic' が付いていない記事（＝海外FX記事）の
// slug 一覧を src/data/overseas-slugs.json に書き出す。
//
// next.config.ts の domestic ビルド用リダイレクト（/articles/<overseas slug> → 海外FXサイト）と、
// market-isolation.test.ts の整合性検証の両方でこの JSON を使う。
//
// 実行: node scripts/gen-overseas-slugs.mjs

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const articlesDir = path.join(__dirname, '..', 'src', 'data', 'articles')
const outPath = path.join(__dirname, '..', 'src', 'data', 'overseas-slugs.json')

const files = readdirSync(articlesDir).filter((f) => f.endsWith('.ts'))
const overseasSlugs = []

for (const file of files) {
  const content = readFileSync(path.join(articlesDir, file), 'utf8')
  const isDomestic = /market:\s*'domestic'/.test(content)
  if (isDomestic) continue

  const slugMatch = content.match(/slug:\s*'([^']+)'/)
  if (!slugMatch) {
    throw new Error(`slug が見つかりません: ${file}`)
  }
  overseasSlugs.push(slugMatch[1])
}

overseasSlugs.sort()
writeFileSync(outPath, JSON.stringify(overseasSlugs, null, 2) + '\n')
console.log(`${overseasSlugs.length}件の海外FX記事slugを ${path.relative(process.cwd(), outPath)} に書き出しました。`)
