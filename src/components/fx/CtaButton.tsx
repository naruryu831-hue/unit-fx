export function CtaButton({
  href,
  children,
  sponsored = true,
}: {
  href: string | null
  children: React.ReactNode
  sponsored?: boolean
}) {
  if (href === null) {
    return (
      <span className="inline-block cursor-not-allowed rounded-xl bg-slate-200 px-6 py-3 text-center font-bold text-slate-500 transition-colors duration-200">
        {children}
        <span className="ml-1">現在確認中（リンクなし）</span>
      </span>
    )
  }

  const rel = sponsored ? 'noopener noreferrer nofollow sponsored' : 'noopener noreferrer'

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      className="inline-block cursor-pointer rounded-xl bg-amber-500 px-6 py-3 text-center font-bold text-slate-900 transition-colors duration-200 hover:bg-amber-400"
    >
      {children}
    </a>
  )
}
