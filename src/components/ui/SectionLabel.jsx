// Eyebrow label — złota kreska + uppercase tekst. Poprzedza każdy nagłówek H2.
function SectionLabel({ label }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="inline-block h-px w-5 bg-gold" />
      <span className="text-xs font-medium uppercase tracking-widest text-gold">
        {label}
      </span>
    </div>
  )
}

export default SectionLabel
