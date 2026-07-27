export type BodyBlock =
  | { type: 'heading'; level: 2 | 3; id: string; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

export type Heading = { id: string; level: 2 | 3; text: string }

const HEADING_PREFIX = '■'
const UL_PREFIX = '・'
// Matches "3. " or "3-1. " (etc.) at the start of a heading's text, right
// after the "■ " marker has been stripped off.
const HEADING_NUMBER_RE = /^(\d+)(-\d+)?\.\s?/
// Matches "1. ", "2. " ... at the start of an ordinary (non-heading) line.
const OL_ITEM_RE = /^\d+\.\s?(.*)$/

function isHeadingLine(line: string): boolean {
  return line.startsWith(HEADING_PREFIX)
}

function isUlLine(line: string): boolean {
  return line.startsWith(UL_PREFIX)
}

function isOlLine(line: string): boolean {
  return OL_ITEM_RE.test(line)
}

function headingLevel(text: string): 2 | 3 {
  const match = text.match(HEADING_NUMBER_RE)
  if (match && match[2]) return 3
  return 2
}

export function parseBody(body: string): BodyBlock[] {
  const lines = body.split('\n')
  const blocks: BodyBlock[] = []
  let headingCount = 0

  let paragraphBuffer: string[] = []
  let ulBuffer: string[] = []
  let olBuffer: string[] = []

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraphBuffer.join('\n').trim() })
      paragraphBuffer = []
    }
  }

  function flushUl() {
    if (ulBuffer.length > 0) {
      blocks.push({ type: 'ul', items: ulBuffer })
      ulBuffer = []
    }
  }

  function flushOl() {
    if (olBuffer.length > 0) {
      blocks.push({ type: 'ol', items: olBuffer })
      olBuffer = []
    }
  }

  function flushAll() {
    flushParagraph()
    flushUl()
    flushOl()
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line === '') {
      flushAll()
      continue
    }

    if (isHeadingLine(line)) {
      flushAll()
      headingCount += 1
      const text = line.slice(HEADING_PREFIX.length).trim()
      blocks.push({
        type: 'heading',
        level: headingLevel(text),
        id: `heading-${headingCount}`,
        text,
      })
      continue
    }

    if (isUlLine(line)) {
      flushParagraph()
      flushOl()
      ulBuffer.push(line.slice(UL_PREFIX.length).trim())
      continue
    }

    if (isOlLine(line)) {
      flushParagraph()
      flushUl()
      const match = line.match(OL_ITEM_RE)
      olBuffer.push(match ? match[1].trim() : line)
      continue
    }

    // Plain paragraph text: a new paragraph starts once we've moved on from
    // a list block, otherwise consecutive non-blank lines are joined.
    flushUl()
    flushOl()
    paragraphBuffer.push(line)
  }

  flushAll()

  return blocks
}

export function extractHeadings(body: string): Heading[] {
  return parseBody(body)
    .filter((block): block is Extract<BodyBlock, { type: 'heading' }> => block.type === 'heading')
    .map(({ id, level, text }) => ({ id, level, text }))
}
