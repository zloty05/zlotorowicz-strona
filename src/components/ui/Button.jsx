// Przycisk CTA — warianty primary (gold filled) i secondary (gold outline).
// Renderuje <a> jeśli podano `href`, w przeciwnym razie <button>.
const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3 font-semibold transition'

const variants = {
  primary: 'bg-gold text-white hover:bg-gold-dark',
  secondary: 'border border-gold text-gold hover:bg-gold-subtle',
}

function Button({ variant = 'primary', href, className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
