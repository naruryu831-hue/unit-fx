import fs from 'node:fs'
import path from 'node:path'

const LOGO_DIR = path.join(process.cwd(), 'public', 'logos')
const EXTENSIONS = ['.svg', '.png', '.webp', '.jpg', '.jpeg']

/**
 * public/logos/<slug>.<ext> を置くと、その業者のロゴ画像が自動的に使われる。
 * ファイルが無い業者は、呼び出し側でブランドカラーのワードマーク表示にフォールバックする。
 */
function readLogoFiles(): Map<string, string> {
  const found = new Map<string, string>()

  let entries: string[]
  try {
    entries = fs.readdirSync(LOGO_DIR)
  } catch {
    return found
  }

  for (const entry of entries) {
    const ext = path.extname(entry).toLowerCase()
    if (!EXTENSIONS.includes(ext)) continue

    const slug = path.basename(entry, path.extname(entry))
    // 同じ slug で複数の拡張子がある場合は EXTENSIONS の並び順で先に来るものを優先する。
    const existing = found.get(slug)
    if (existing && EXTENSIONS.indexOf(path.extname(existing).toLowerCase()) <= EXTENSIONS.indexOf(ext)) {
      continue
    }
    found.set(slug, `/logos/${entry}`)
  }

  return found
}

const logoFiles = readLogoFiles()

export function getBrokerLogoPath(slug: string): string | null {
  return logoFiles.get(slug) ?? null
}
