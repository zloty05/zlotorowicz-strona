// Mały tag — kategoria karty lub element stacku technologicznego.
// Wariant `category` (złoty, wyróżniony) i `tag` (szary, neutralny).
const variants = {
  category:
    'bg-gold-subtle text-gold-dark border border-gold/20',
  tag: 'bg-surface-hover text-ink-faint border border-surface-border',
}

function Badge({ variant = 'tag', className = '', children }) {
  return (
    <span
      className={`inline-block rounded-sm px-2.5 py-1 text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
