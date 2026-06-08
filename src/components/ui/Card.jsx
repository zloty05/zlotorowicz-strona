// Bazowa karta — białe tło, złoty top-border, hover shadow.
// `as` pozwala wyrenderować np. <article> dla semantyki.
function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={`rounded-lg border border-surface-border border-t-2 border-t-gold bg-surface-card p-6 transition hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Card
