export function CtaButton({
  href,
  children,
  sponsored = true,
  size = 'md',
}: {
  href: string | null
  children: React.ReactNode
  sponsored?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClass =
    size === 'lg'
      ? 'px-8 py-4 text-base'
      : size === 'sm'
        ? 'px-4 py-2 text-xs'
        : 'px-6 py-3 text-sm'

  if (href === null) {
    return (
      <span
        className={`inline-block cursor-not-allowed rounded-xl bg-slate-200 text-center font-bold text-slate-500 ${sizeClass}`}
      >
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
      className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-center font-black text-navy-950 shadow-[0_2px_0_#b8891f,0_6px_16px_-6px_rgba(217,166,58,0.7)] transition-all duration-150 hover:-translate-y-px hover:from-gold-400 hover:to-gold-400 active:translate-y-0 ${sizeClass}`}
    >
      {children}
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M11 3h6v6h-2V6.4l-7.3 7.3-1.4-1.4L13.6 5H11V3zM5 5h4v2H7v6h6v-2h2v4H5V5z" />
      </svg>
    </a>
  )
}
