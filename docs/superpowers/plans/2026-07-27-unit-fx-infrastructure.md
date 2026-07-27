# UNIT-FX 基盤構築 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** UNIT-FX（海外FXアフィリエイトサイト）の技術基盤を構築する。Next.jsアプリの雛形、業者/記事データモデル、法令順守コンポーネント（リスク注記・比較表・FAQ構造化データ）、アフィリエイトリンク管理、そして実際に動く記事ページ1本（比較ハブ記事）までを、テスト付きで作り切る。

**Architecture:** Next.js (App Router) + TypeScript + Tailwind CSS の静的コンテンツサイト。DB/認証/決済は不要。記事・業者データはTypeScriptのデータファイル（`src/data/`配下）として管理し、コンポーネント（`src/components/fx/`配下）で描画する。アフィリエイトリンクは`src/lib/affiliates.ts`に一元化し、ASP審査前は業者公式サイトへの通常リンクにフォールバックする。

**Tech Stack:** Next.js (App Router, TypeScript, Tailwind CSS) / Vitest + @testing-library/react（テスト）

## Global Constraints

- Next.js (App Router) + TypeScript + Tailwind CSS。DB・認証・決済機能は本プランでは追加しない。
- 全ての`Broker`レコードは`minAgeYears >= 18`でなければならない（`validateBroker`で強制）。18歳未満の読者をターゲットにしたコンテンツ・データは一切作らない。
- 業者への全ての外部リンクには`rel="nofollow sponsored"`を付与する。
- 全ての記事ページは`RiskDisclaimer`コンポーネントを必ず表示する。
- 比較表（`ComparisonTable`）には「開設可能年齢」列を必ず含める。
- FAQセクション（`FaqSection`）は`FAQPage`のJSON-LD構造化データを埋め込む。
- 記事タイトルに数字+「選/社/本」が含まれる場合、`brokerSlugs.length`と数字が一致しなければならない（`validateArticleTitleCount`で強制）。golf/gearサイトで実際にタイトルと商品数の不一致が起きた反省を踏まえた必須ルール。
- テスト: Vitest + @testing-library/react + jsdom。

## スコープについて

このプランは「サイト基盤 + 比較ハブ記事1本」までを対象とする。設計spec（`docs/superpowers/specs/2026-07-27-kaigai-fx-affiliate-site-design.md`）に記載の残り33本の記事（業者レビュー12本・口座開設ガイド12本・悩み解決型4本・詐欺不安に関するFAQ記事1本・MT4/MT5使い方記事1本・その他3本）は、この基盤が完成しビルド確認が取れた後、別プランとして追加する。

---

### Task 1: Next.jsスキャフォールド + テスト基盤

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`（`create-next-app`が生成する一式）
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/lib/__tests__/sanity.test.ts`
- Modify: `package.json`（`test`スクリプト追加）

**Interfaces:**
- Consumes: なし（このプロジェクトの最初のタスク）
- Produces: `npm run dev` / `npm run build` / `npm test` が動くNext.jsプロジェクト一式。以降の全タスクがこの上に乗る。

- [ ] **Step 1: 隣接フォルダにNext.jsをスキャフォールドする**

このディレクトリ（`unit-fx`）には既に`.git`と`docs/`があるため、`create-next-app`を直接このフォルダに実行すると「ディレクトリに競合するファイルがある」と拒否される。一時フォルダに生成してから中身だけ移す。

```bash
cd "/c/Users/narur/Desktop/海外FXサイト"
npx create-next-app@latest unit-fx-scaffold --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

Expected: `unit-fx-scaffold/` フォルダが作成され、`package.json`, `src/app/page.tsx` 等が生成される。（`--yes`を無視して追加のプロンプトが出た場合は、全てデフォルトのまま Enter で進める）

- [ ] **Step 2: `.git`を除いて中身を`unit-fx`へ移す**

```bash
rm -rf unit-fx-scaffold/.git
cp -r unit-fx-scaffold/. unit-fx/
rm -rf unit-fx-scaffold
cd unit-fx
git status
```

Expected: `git status`で`package.json`, `src/`, `next.config.ts`等が未追跡ファイルとして表示される。既存の`docs/`と`.git`はそのまま残っている。

- [ ] **Step 3: Vitestとテスト関連パッケージをインストール**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 4: Vitest設定ファイルを作成**

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

`vitest.setup.ts`:
```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: `package.json`に`test`スクリプトを追加**

`package.json`の`scripts`に以下を追加する:
```json
"test": "vitest run"
```

- [ ] **Step 6: テスト基盤の動作確認用テストを書く**

`src/lib/__tests__/sanity.test.ts`:
```ts
import { describe, it, expect } from 'vitest'

describe('sanity', () => {
  it('runs a basic assertion', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 7: テストとビルドを実行して確認する**

```bash
npm test
npm run build
```

Expected: `npm test`が1件PASS、`npm run build`がエラーなく完了する。

- [ ] **Step 8: コミット**

```bash
git add -A
git commit -m "feat: Next.jsスキャフォールド + Vitestテスト基盤を追加"
```

---

### Task 2: 業者データモデル + シード業者(XM) + バリデーター

**Files:**
- Create: `src/data/brokers-types.ts`
- Create: `src/data/brokers/xm.ts`
- Create: `src/data/brokers-index.ts`
- Create: `src/lib/validators.ts`
- Test: `src/lib/__tests__/validators.test.ts`

**Interfaces:**
- Consumes: Task 1のNext.js/Vitest基盤
- Produces: `Broker`型（`src/data/brokers-types.ts`）、`brokers: Broker[]`と`getBrokerBySlug(slug: string): Broker | undefined`（`src/data/brokers-index.ts`）、`validateBroker(broker: Broker): string[]`（`src/lib/validators.ts`）

- [ ] **Step 1: 業者データの型を定義する**

`src/data/brokers-types.ts`:
```ts
export type Broker = {
  slug: string
  name: string
  officialUrl: string
  minAgeYears: number
  maxLeverage: string
  minDeposit: string
  bonusSummary: string
  japaneseSupport: boolean
  founded: number
  summary: string
}
```

- [ ] **Step 2: シード業者(XM)のデータを作成する**

`src/data/brokers/xm.ts`:
```ts
import type { Broker } from '../brokers-types'

export const xm: Broker = {
  slug: 'xm',
  name: 'XM(XM Trading)',
  officialUrl: 'https://www.xmtrading.com/',
  minAgeYears: 18,
  maxLeverage: '1000倍',
  minDeposit: '5米ドル相当',
  bonusSummary: '口座開設ボーナス・入金ボーナスあり（詳細は公式サイト参照）',
  japaneseSupport: true,
  founded: 2009,
  summary: 'XMは日本人トレーダーに最も知名度の高い海外FX業者の一つ。',
}
```

- [ ] **Step 3: 業者インデックスを作成する**

`src/data/brokers-index.ts`:
```ts
import { xm } from './brokers/xm'
import type { Broker } from './brokers-types'

export const brokers: Broker[] = [xm]

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find((b) => b.slug === slug)
}
```

- [ ] **Step 4: バリデーターの失敗するテストを書く**

`src/lib/__tests__/validators.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { validateBroker } from '../validators'
import { xm } from '@/data/brokers/xm'

describe('validateBroker', () => {
  it('returns no errors for a valid broker', () => {
    expect(validateBroker(xm)).toEqual([])
  })

  it('flags a broker with minAgeYears below 18', () => {
    const invalid = { ...xm, minAgeYears: 16 }
    expect(validateBroker(invalid)).toContain('minAgeYears must be 18 or above')
  })

  it('flags a broker with an invalid officialUrl', () => {
    const invalid = { ...xm, officialUrl: 'not-a-url' }
    expect(validateBroker(invalid)).toContain('officialUrl must be a valid URL')
  })
})
```

- [ ] **Step 5: テストを実行して失敗を確認する**

Run: `npm test -- validators`
Expected: FAIL（`validators.ts`が存在しない）

- [ ] **Step 6: バリデーターを実装する**

`src/lib/validators.ts`:
```ts
import type { Broker } from '@/data/brokers-types'

export function validateBroker(broker: Broker): string[] {
  const errors: string[] = []
  if (!broker.slug) errors.push('slug is required')
  if (!broker.name) errors.push('name is required')
  if (!broker.officialUrl.startsWith('http')) errors.push('officialUrl must be a valid URL')
  if (broker.minAgeYears < 18) errors.push('minAgeYears must be 18 or above')
  return errors
}
```

- [ ] **Step 7: テストを実行して成功を確認する**

Run: `npm test -- validators`
Expected: PASS（3件）

- [ ] **Step 8: コミット**

```bash
git add src/data/brokers-types.ts src/data/brokers/xm.ts src/data/brokers-index.ts src/lib/validators.ts src/lib/__tests__/validators.test.ts
git commit -m "feat: 業者データモデルとバリデーターを追加"
```

---

### Task 3: アフィリエイトリンク管理

**Files:**
- Create: `src/lib/affiliates.ts`
- Test: `src/lib/__tests__/affiliates.test.ts`

**Interfaces:**
- Consumes: `Broker`型・`getBrokerBySlug`（Task 2, `src/data/brokers-index.ts`）
- Produces: `getBrokerLink(slug: string): string`（`src/lib/affiliates.ts`）。以降、業者への全てのリンクはこの関数経由で生成する。

- [ ] **Step 1: 失敗するテストを書く**

`src/lib/__tests__/affiliates.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { getBrokerLink } from '../affiliates'

describe('getBrokerLink', () => {
  it('falls back to the official URL when no affiliate link is configured', () => {
    expect(getBrokerLink('xm')).toBe('https://www.xmtrading.com/')
  })

  it('throws for an unknown broker slug', () => {
    expect(() => getBrokerLink('does-not-exist')).toThrow('Unknown broker slug: does-not-exist')
  })
})
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- affiliates`
Expected: FAIL（`affiliates.ts`が存在しない）

- [ ] **Step 3: 実装する**

`src/lib/affiliates.ts`:
```ts
import { getBrokerBySlug } from '@/data/brokers-index'

// ASP/IB審査が通った業者から、ここにアフィリエイトリンクを追加していく。
// 未設定(null)の間は公式サイトへの通常リンクにフォールバックする。
const AFFILIATE_LINKS: Record<string, string | null> = {
  xm: null,
}

export function getBrokerLink(slug: string): string {
  const broker = getBrokerBySlug(slug)
  if (!broker) {
    throw new Error(`Unknown broker slug: ${slug}`)
  }
  return AFFILIATE_LINKS[slug] ?? broker.officialUrl
}
```

- [ ] **Step 4: テストを実行して成功を確認する**

Run: `npm test -- affiliates`
Expected: PASS（2件）

- [ ] **Step 5: コミット**

```bash
git add src/lib/affiliates.ts src/lib/__tests__/affiliates.test.ts
git commit -m "feat: アフィリエイトリンク管理を追加"
```

---

### Task 4: RiskDisclaimerコンポーネント

**Files:**
- Create: `src/components/fx/RiskDisclaimer.tsx`
- Test: `src/components/fx/__tests__/RiskDisclaimer.test.tsx`

**Interfaces:**
- Consumes: なし
- Produces: `RiskDisclaimer`コンポーネント（`src/components/fx/RiskDisclaimer.tsx`）。全ての記事ページで必ず使用する。

- [ ] **Step 1: 失敗するテストを書く**

`src/components/fx/__tests__/RiskDisclaimer.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RiskDisclaimer } from '../RiskDisclaimer'

describe('RiskDisclaimer', () => {
  it('renders the required legal notices', () => {
    render(<RiskDisclaimer />)
    const text = screen.getByRole('note', { name: 'リスク・注意事項' }).textContent ?? ''
    expect(text).toContain('元本')
    expect(text).toContain('を超える損失')
    expect(text).toContain('金融庁に登録されていない')
    expect(text).toContain('断定的な利益表現')
  })
})
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- RiskDisclaimer`
Expected: FAIL（`RiskDisclaimer.tsx`が存在しない）

- [ ] **Step 3: 実装する**

`src/components/fx/RiskDisclaimer.tsx`:
```tsx
export function RiskDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="リスク・注意事項"
      className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
    >
      <p className="font-bold">リスク・注意事項</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>FX取引はレバレッジにより、預けた資金(元本)を超える損失が生じる可能性があります。</li>
        <li>本サイトで紹介する海外FX業者の多くは、日本の金融庁に登録されていない海外業者です。</li>
        <li>
          本サイトは利益を保証するものではなく、断定的な利益表現は一切行っていません。投資判断はご自身の責任で行ってください。
        </li>
      </ul>
    </aside>
  )
}
```

- [ ] **Step 4: テストを実行して成功を確認する**

Run: `npm test -- RiskDisclaimer`
Expected: PASS

- [ ] **Step 5: コミット**

```bash
git add src/components/fx/RiskDisclaimer.tsx src/components/fx/__tests__/RiskDisclaimer.test.tsx
git commit -m "feat: RiskDisclaimerコンポーネントを追加"
```

---

### Task 5: ComparisonTableコンポーネント（開設可能年齢の列を含む）

**Files:**
- Create: `src/components/fx/ComparisonTable.tsx`
- Test: `src/components/fx/__tests__/ComparisonTable.test.tsx`

**Interfaces:**
- Consumes: `Broker`型（Task 2）、`getBrokerLink`（Task 3）
- Produces: `ComparisonTable({ brokers: Broker[] })`コンポーネント（`src/components/fx/ComparisonTable.tsx`）

- [ ] **Step 1: 失敗するテストを書く**

`src/components/fx/__tests__/ComparisonTable.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComparisonTable } from '../ComparisonTable'
import { xm } from '@/data/brokers/xm'

describe('ComparisonTable', () => {
  it('renders one row per broker including the age requirement column', () => {
    render(<ComparisonTable brokers={[xm]} />)
    expect(screen.getByText('XM(XM Trading)')).toBeInTheDocument()
    expect(screen.getByText('18歳以上')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: '公式サイト' })
    expect(link).toHaveAttribute('href', 'https://www.xmtrading.com/')
    expect(link.getAttribute('rel')).toContain('sponsored')
  })
})
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- ComparisonTable`
Expected: FAIL（`ComparisonTable.tsx`が存在しない）

- [ ] **Step 3: 実装する**

`src/components/fx/ComparisonTable.tsx`:
```tsx
import type { Broker } from '@/data/brokers-types'
import { getBrokerLink } from '@/lib/affiliates'

export function ComparisonTable({ brokers }: { brokers: Broker[] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b">
          <th className="p-2 text-left">業者名</th>
          <th className="p-2 text-left">最大レバレッジ</th>
          <th className="p-2 text-left">最低入金額</th>
          <th className="p-2 text-left">日本語サポート</th>
          <th className="p-2 text-left">開設可能年齢</th>
          <th className="p-2 text-left">公式サイト</th>
        </tr>
      </thead>
      <tbody>
        {brokers.map((broker) => (
          <tr key={broker.slug} className="border-b">
            <td className="p-2">{broker.name}</td>
            <td className="p-2">{broker.maxLeverage}</td>
            <td className="p-2">{broker.minDeposit}</td>
            <td className="p-2">{broker.japaneseSupport ? 'あり' : 'なし'}</td>
            <td className="p-2">{broker.minAgeYears}歳以上</td>
            <td className="p-2">
              <a
                href={getBrokerLink(broker.slug)}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
              >
                公式サイト
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

- [ ] **Step 4: テストを実行して成功を確認する**

Run: `npm test -- ComparisonTable`
Expected: PASS

- [ ] **Step 5: コミット**

```bash
git add src/components/fx/ComparisonTable.tsx src/components/fx/__tests__/ComparisonTable.test.tsx
git commit -m "feat: ComparisonTableコンポーネントを追加"
```

---

### Task 6: FaqSectionコンポーネント（FAQPage構造化データ付き）

**Files:**
- Create: `src/components/fx/FaqSection.tsx`
- Test: `src/components/fx/__tests__/FaqSection.test.tsx`

**Interfaces:**
- Consumes: なし
- Produces: `FaqItem`型、`FaqSection({ items: FaqItem[] })`コンポーネント（`src/components/fx/FaqSection.tsx`）

- [ ] **Step 1: 失敗するテストを書く**

`src/components/fx/__tests__/FaqSection.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FaqSection } from '../FaqSection'

const items = [
  {
    question: '海外FXは違法ですか？',
    answer: '海外FX業者を利用すること自体は違法ではありませんが、無登録業者への勧誘には規制があります。',
  },
]

describe('FaqSection', () => {
  it('renders each question and answer', () => {
    render(<FaqSection items={items} />)
    expect(screen.getByText('海外FXは違法ですか？')).toBeInTheDocument()
  })

  it('embeds valid FAQPage JSON-LD structured data', () => {
    const { container } = render(<FaqSection items={items} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    const data = JSON.parse(script!.textContent ?? '{}')
    expect(data['@type']).toBe('FAQPage')
    expect(data.mainEntity).toHaveLength(1)
    expect(data.mainEntity[0].name).toBe('海外FXは違法ですか？')
  })
})
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- FaqSection`
Expected: FAIL（`FaqSection.tsx`が存在しない）

- [ ] **Step 3: 実装する**

`src/components/fx/FaqSection.tsx`:
```tsx
export type FaqItem = {
  question: string
  answer: string
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section aria-label="よくある質問">
      <h2 className="text-xl font-bold">よくある質問</h2>
      <dl className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-semibold">{item.question}</dt>
            <dd className="mt-1">{item.answer}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
```

- [ ] **Step 4: テストを実行して成功を確認する**

Run: `npm test -- FaqSection`
Expected: PASS（2件）

- [ ] **Step 5: コミット**

```bash
git add src/components/fx/FaqSection.tsx src/components/fx/__tests__/FaqSection.test.tsx
git commit -m "feat: FaqSectionコンポーネント(FAQPage構造化データ付き)を追加"
```

---

### Task 7: 記事データモデル + タイトル/件数整合性バリデーター

**Files:**
- Create: `src/data/articles-types.ts`
- Create: `src/lib/article-validators.ts`
- Test: `src/lib/__tests__/article-validators.test.ts`

**Interfaces:**
- Consumes: `FaqItem`型（Task 6, `src/components/fx/FaqSection.tsx`）
- Produces: `Article`型・`ArticleCategory`型（`src/data/articles-types.ts`）、`validateArticleTitleCount(article: Article): string[]`（`src/lib/article-validators.ts`）

- [ ] **Step 1: 記事データの型を定義する**

`src/data/articles-types.ts`:
```ts
import type { FaqItem } from '@/components/fx/FaqSection'

export type ArticleCategory =
  | 'hub'
  | 'broker-review'
  | 'account-opening'
  | 'problem-solving'
  | 'bonus-roundup'
  | 'comparison'
  | 'tax'

export type Article = {
  slug: string
  title: string
  category: ArticleCategory
  brokerSlugs: string[]
  body: string
  faq: FaqItem[]
  relatedSlugs?: string[]
}
```

`relatedSlugs`は、口座開設ガイド記事からMT4/MT5使い方記事への「次に読むおすすめ」導線のために用意する（実際のレンダリングコンポーネントは、当該記事群を追加する次の記事バッチプランで実装する）。

- [ ] **Step 2: 失敗するテストを書く**

`src/lib/__tests__/article-validators.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { validateArticleTitleCount } from '../article-validators'
import type { Article } from '@/data/articles-types'

const baseArticle: Article = {
  slug: 'test-article',
  title: 'テスト業者3選',
  category: 'broker-review',
  brokerSlugs: ['xm', 'exness', 'titanfx'],
  body: '本文',
  faq: [{ question: 'Q', answer: 'A' }],
}

describe('validateArticleTitleCount', () => {
  it('passes when the title count matches brokerSlugs length', () => {
    expect(validateArticleTitleCount(baseArticle)).toEqual([])
  })

  it('flags a mismatch between title count and brokerSlugs length', () => {
    const mismatched = { ...baseArticle, brokerSlugs: ['xm'] }
    expect(validateArticleTitleCount(mismatched)).toContain(
      'title claims 3 items but brokerSlugs has 1'
    )
  })

  it('flags an article with no FAQ items', () => {
    const noFaq = { ...baseArticle, faq: [] }
    expect(validateArticleTitleCount(noFaq)).toContain(
      'article must include at least one FAQ item'
    )
  })
})
```

- [ ] **Step 3: テストを実行して失敗を確認する**

Run: `npm test -- article-validators`
Expected: FAIL（`article-validators.ts`が存在しない）

- [ ] **Step 4: 実装する**

`src/lib/article-validators.ts`:
```ts
import type { Article } from '@/data/articles-types'

const COUNT_TITLE_PATTERN = /(\d+)\s*(選|社|本)/

export function validateArticleTitleCount(article: Article): string[] {
  const errors: string[] = []
  const match = article.title.match(COUNT_TITLE_PATTERN)
  if (match) {
    const claimedCount = Number(match[1])
    if (claimedCount !== article.brokerSlugs.length) {
      errors.push(
        `title claims ${claimedCount} items but brokerSlugs has ${article.brokerSlugs.length}`
      )
    }
  }
  if (article.faq.length < 1) {
    errors.push('article must include at least one FAQ item')
  }
  return errors
}
```

- [ ] **Step 5: テストを実行して成功を確認する**

Run: `npm test -- article-validators`
Expected: PASS（3件）

- [ ] **Step 6: コミット**

```bash
git add src/data/articles-types.ts src/lib/article-validators.ts src/lib/__tests__/article-validators.test.ts
git commit -m "feat: 記事データモデルとタイトル/件数整合性バリデーターを追加"
```

---

### Task 8: 比較ハブ記事のシード + 記事ページルート

**Files:**
- Create: `src/data/articles/kaigai-fx-hikaku-hub.ts`
- Create: `src/data/articles-index.ts`
- Create: `src/lib/get-article.ts`
- Create: `src/components/fx/ArticleView.tsx`
- Create: `src/app/articles/[slug]/page.tsx`
- Test: `src/lib/__tests__/get-article.test.ts`
- Test: `src/components/fx/__tests__/ArticleView.test.tsx`

**Interfaces:**
- Consumes: `Article`型（Task 7）、`Broker`型・`getBrokerBySlug`（Task 2）、`RiskDisclaimer`（Task 4）、`ComparisonTable`（Task 5）、`FaqSection`（Task 6）
- Produces: `getArticleBySlug(slug: string): Article | undefined`、`getBrokersForArticle(article: Article): Broker[]`（`src/lib/get-article.ts`）、`ArticleView({ article, brokers })`コンポーネント（`src/components/fx/ArticleView.tsx`）、`articles: Article[]`（`src/data/articles-index.ts`）、ルート`/articles/[slug]`

- [ ] **Step 1: 比較ハブ記事のデータを作成する**

`src/data/articles/kaigai-fx-hikaku-hub.ts`:
```ts
import type { Article } from '../articles-types'

export const kaigaiFxHikakuHub: Article = {
  slug: 'kaigai-fx-hikaku-hub',
  title: '海外FX 全業者比較・おすすめランキング',
  category: 'hub',
  brokerSlugs: ['xm'],
  body: `海外FXは、日本国内のFX業者に比べて高いレバレッジを利用できる点が特徴です。一方で、紹介する業者の多くは日本の金融庁に登録されていない海外業者である点に注意が必要です。

本記事では、各業者のレバレッジ・最低入金額・日本語サポートの有無・口座開設可能年齢などを比較表にまとめています。`,
  faq: [
    {
      question: '海外FXの口座は何歳から開設できますか？',
      answer:
        '多くの海外FX業者は18歳以上を条件としています。正確な年齢条件は各業者の公式サイトでご確認ください。',
    },
  ],
}
```

- [ ] **Step 2: 記事インデックスを作成する**

`src/data/articles-index.ts`:
```ts
import { kaigaiFxHikakuHub } from './articles/kaigai-fx-hikaku-hub'
import type { Article } from './articles-types'

export const articles: Article[] = [kaigaiFxHikakuHub]
```

- [ ] **Step 3: `get-article`の失敗するテストを書く**

`src/lib/__tests__/get-article.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { getArticleBySlug, getBrokersForArticle } from '../get-article'

describe('getArticleBySlug', () => {
  it('finds the seeded hub article by slug', () => {
    const article = getArticleBySlug('kaigai-fx-hikaku-hub')
    expect(article).toBeDefined()
    expect(article?.category).toBe('hub')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getArticleBySlug('does-not-exist')).toBeUndefined()
  })
})

describe('getBrokersForArticle', () => {
  it('resolves broker slugs to broker records', () => {
    const article = getArticleBySlug('kaigai-fx-hikaku-hub')!
    const brokers = getBrokersForArticle(article)
    expect(brokers.map((b) => b.slug)).toEqual(article.brokerSlugs)
  })
})
```

- [ ] **Step 4: テストを実行して失敗を確認する**

Run: `npm test -- get-article`
Expected: FAIL（`get-article.ts`が存在しない）

- [ ] **Step 5: `get-article.ts`を実装する**

`src/lib/get-article.ts`:
```ts
import { articles } from '@/data/articles-index'
import { getBrokerBySlug } from '@/data/brokers-index'
import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getBrokersForArticle(article: Article): Broker[] {
  return article.brokerSlugs
    .map((slug) => getBrokerBySlug(slug))
    .filter((broker): broker is Broker => broker !== undefined)
}
```

- [ ] **Step 6: テストを実行して成功を確認する**

Run: `npm test -- get-article`
Expected: PASS（3件）

- [ ] **Step 7: `ArticleView`の失敗するテストを書く**

`src/components/fx/__tests__/ArticleView.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleView } from '../ArticleView'
import { getArticleBySlug, getBrokersForArticle } from '@/lib/get-article'

describe('ArticleView', () => {
  it('renders the title, risk disclaimer, comparison table, and FAQ together', () => {
    const article = getArticleBySlug('kaigai-fx-hikaku-hub')!
    const brokers = getBrokersForArticle(article)
    render(<ArticleView article={article} brokers={brokers} />)

    expect(screen.getByRole('heading', { name: article.title })).toBeInTheDocument()
    expect(screen.getByRole('note', { name: 'リスク・注意事項' })).toBeInTheDocument()
    expect(screen.getByText('XM(XM Trading)')).toBeInTheDocument()
    expect(screen.getByText('よくある質問')).toBeInTheDocument()
  })
})
```

- [ ] **Step 8: テストを実行して失敗を確認する**

Run: `npm test -- ArticleView`
Expected: FAIL（`ArticleView.tsx`が存在しない）

- [ ] **Step 9: `ArticleView`を実装する**

`src/components/fx/ArticleView.tsx`:
```tsx
import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'
import { RiskDisclaimer } from './RiskDisclaimer'
import { ComparisonTable } from './ComparisonTable'
import { FaqSection } from './FaqSection'

export function ArticleView({ article, brokers }: { article: Article; brokers: Broker[] }) {
  return (
    <article className="mx-auto max-w-3xl space-y-8 p-6">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <RiskDisclaimer />
      <div className="whitespace-pre-line leading-relaxed">{article.body}</div>
      <ComparisonTable brokers={brokers} />
      <FaqSection items={article.faq} />
    </article>
  )
}
```

- [ ] **Step 10: テストを実行して成功を確認する**

Run: `npm test -- ArticleView`
Expected: PASS

- [ ] **Step 11: 記事ページルートを作成する**

`src/app/articles/[slug]/page.tsx`:
```tsx
import { notFound } from 'next/navigation'
import { getArticleBySlug, getBrokersForArticle } from '@/lib/get-article'
import { ArticleView } from '@/components/fx/ArticleView'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    notFound()
  }
  const brokers = getBrokersForArticle(article)
  return <ArticleView article={article} brokers={brokers} />
}
```

このページファイル自体は薄いグルーコードなので自動テストは書かない。Step 12でdevサーバーを使って手動確認する。

- [ ] **Step 12: devサーバーで実際にページを確認する**

```bash
npm run dev
```

ブラウザで `http://localhost:3000/articles/kaigai-fx-hikaku-hub` を開き、タイトル・リスク注記・比較表・FAQが表示されることを目視確認する。確認後 `Ctrl+C` でサーバーを止める。

- [ ] **Step 13: コミット**

```bash
git add src/data/articles/kaigai-fx-hikaku-hub.ts src/data/articles-index.ts src/lib/get-article.ts src/lib/__tests__/get-article.test.ts src/components/fx/ArticleView.tsx src/components/fx/__tests__/ArticleView.test.tsx src/app/articles/
git commit -m "feat: 比較ハブ記事と記事ページルートを追加"
```

---

### Task 9: トップページ（記事一覧）

**Files:**
- Create: `src/components/fx/ArticleList.tsx`
- Test: `src/components/fx/__tests__/ArticleList.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Article`型（Task 7）、`articles`配列（Task 8, `src/data/articles-index.ts`）
- Produces: `ArticleList({ articles: Article[] })`コンポーネント（`src/components/fx/ArticleList.tsx`）、トップページ（`/`）

- [ ] **Step 1: 失敗するテストを書く**

`src/components/fx/__tests__/ArticleList.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleList } from '../ArticleList'
import type { Article } from '@/data/articles-types'

const sample: Article[] = [
  { slug: 'a', title: '記事A', category: 'hub', brokerSlugs: [], body: '', faq: [] },
]

describe('ArticleList', () => {
  it('renders a link to each article', () => {
    render(<ArticleList articles={sample} />)
    const link = screen.getByRole('link', { name: '記事A' })
    expect(link).toHaveAttribute('href', '/articles/a')
  })
})
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- ArticleList`
Expected: FAIL（`ArticleList.tsx`が存在しない）

- [ ] **Step 3: 実装する**

`src/components/fx/ArticleList.tsx`:
```tsx
import Link from 'next/link'
import type { Article } from '@/data/articles-types'

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="space-y-2">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/articles/${article.slug}`} className="text-blue-600 underline">
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
```

- [ ] **Step 4: テストを実行して成功を確認する**

Run: `npm test -- ArticleList`
Expected: PASS

- [ ] **Step 5: トップページに組み込む**

`src/app/page.tsx`（`create-next-app`が生成した内容を置き換える）:
```tsx
import { articles } from '@/data/articles-index'
import { ArticleList } from '@/components/fx/ArticleList'

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">UNIT-FX</h1>
      <p>海外FX業者の比較・レビュー情報をお届けします。</p>
      <ArticleList articles={articles} />
    </main>
  )
}
```

- [ ] **Step 6: コミット**

```bash
git add src/components/fx/ArticleList.tsx src/components/fx/__tests__/ArticleList.test.tsx src/app/page.tsx
git commit -m "feat: トップページに記事一覧を追加"
```

---

### Task 10: ビルド確認 + README + 最終コミット

**Files:**
- Create: `README.md`
- Modify: なし（確認のみ）

**Interfaces:**
- Consumes: Task 1〜9の全成果物
- Produces: 全テスト・ビルドが通ることの確認、READMEドキュメント

- [ ] **Step 1: 全テストを実行する**

```bash
npm test
```

Expected: 全テストがPASS（sanity, validators, affiliates, RiskDisclaimer, ComparisonTable, FaqSection, article-validators, get-article, ArticleView, ArticleList）

- [ ] **Step 2: 本番ビルドを実行する**

```bash
npm run build
```

Expected: エラーなくビルドが完了する。

- [ ] **Step 3: READMEを作成する**

`README.md`:
```markdown
# UNIT-FX

海外FX業者の比較・レビューアフィリエイトサイト。

## 開発

\`\`\`bash
npm install
npm run dev      # http://localhost:3000
npm test         # Vitest
npm run build    # 本番ビルド確認
\`\`\`

## 設計・記事バックログ

- 設計: `docs/superpowers/specs/2026-07-27-kaigai-fx-affiliate-site-design.md`
- 本プランは基盤+比較ハブ記事1本まで。残り33記事は別プランで追加する。

## デプロイ

未実施。GitHubリポジトリ作成 → Vercel新規プロジェクト作成 → push で自動デプロイ、の想定（golf-friendと同じ流れ）。
```

- [ ] **Step 4: コミット**

```bash
git add README.md
git commit -m "docs: READMEを追加"
git log --oneline
```

Expected: Task 1〜10までの全コミットが履歴に並んでいる。

---

## 完了後の次のステップ（このプランの対象外）

- GitHubリポジトリ作成 + Vercel新規プロジェクト作成（ユーザーの明示許可が必要）
- 残り33記事（業者レビュー12本・口座開設ガイド12本・悩み解決型4本・詐欺不安に関するFAQ記事1本・MT4/MT5使い方記事1本・その他3本）の追加 → 別プランとして作成する
- ASP/IB（アフィリエイトプログラム）へのユーザー本人による登録

## 最終レビューで挙がり、次の記事バッチプランに繰り越す項目

以下は基盤プランの最終whole-branchレビューで指摘されたが、33記事バッチの規模で初めて効いてくる／33記事バッチのタスクとして明示すべき項目のため、次のプランで正式にタスク化する。

- `/articles/[slug]`に`generateMetadata`（記事ごとのtitle/description）と`generateStaticParams`（ビルド時の静的プリレンダリング）を追加する。34記事になった時点でSEO・ビルド方式の両面で重要になる。
- `sitemap.ts` / `robots.ts`の追加。
- `layout.tsx`にサイト全体を覆う簡易リスク注記（フッター等）を追加し、`RiskDisclaimer`が個別記事コンポーネントの慣習だけに依存しない構造にする。
- `FaqSection`のJSON-LD出力で`<`をエスケープする（FAQ本文に`</script>`相当の文字列が入った場合の破損防止）。
- `validateArticleTitleCount`のタイトル数字マッチが全角数字（１２選 等）に対応していない点の改善。
- `AFFILIATE_LINKS`の型を`Record<string, string | null>`からbroker slugのユニオン型ベースに変更し、キーの打ち間違いをコンパイル時に検出できるようにする。ASP審査通過後、実リンクを設定する際に実施するのが自然。
