// Logo marki — błyskawica ze złotym gradientem.
// Spójna z favicon.svg. Używana w Navbarze (i opcjonalnie gdzie indziej).
function Bolt({ size = 22, className = '' }) {
  // Unikalne id gradientu na wypadek wielu instancji na stronie.
  const id = 'bolt-grad'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="22" y1="8" x2="42" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E9C45A" />
          <stop offset="0.5" stopColor="#C4992A" />
          <stop offset="1" stopColor="#A07A18" />
        </linearGradient>
      </defs>
      <path
        d="M36.5 8 L20 35 H29.5 L27 56 L45 26 H34.5 L40.5 8 Z"
        fill={`url(#${id})`}
        stroke="#F1DA94"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Bolt
