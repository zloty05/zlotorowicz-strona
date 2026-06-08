import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

// Wykres narracyjny do Hero: pokazuje trend, nie zmyślone liczby.
// Złota krzywa automatyzacji pnie się w górę; pod spodem maleją słupki
// czasu i kosztów. Czysty SVG + animacja Framer Motion, zero zależności.

const W = 360
const H = 200

// Krzywa rosnąca (automatyzacja) — punkty od lewego-dołu do prawego-góry.
const curve = 'M 8 168 C 90 160, 150 120, 210 80 S 320 28, 352 18'
// Obszar pod krzywą do wypełnienia gradientem.
const area = `${curve} L 352 188 L 8 188 Z`

function AutomationChart() {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 shadow-sm">
      <p className="mb-1 text-xs font-medium uppercase tracking-widest text-gold">
        Efekt automatyzacji
      </p>
      <p className="mb-4 text-sm text-ink-faint">
        Im więcej procesów działa samo, tym mniej czasu i pieniędzy znika na powtarzalną pracę.
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Wykres: wzrost automatyzacji obniża czas i koszty">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C4992A" stopOpacity="0.28" />
            <stop offset="1" stopColor="#C4992A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineStroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#A07A18" />
            <stop offset="1" stopColor="#D4AA3A" />
          </linearGradient>
        </defs>

        {/* Linie siatki poziome */}
        {[48, 98, 148].map((y) => (
          <line key={y} x1="8" y1={y} x2="352" y2={y} stroke="#E8E4DC" strokeWidth="1" />
        ))}

        {/* Wypełnienie pod krzywą */}
        <motion.path
          d={area}
          fill="url(#areaFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Krzywa automatyzacji */}
        <motion.path
          d={curve}
          fill="none"
          stroke="url(#lineStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />

        {/* Punkt na końcu krzywej */}
        <motion.circle
          cx="352"
          cy="18"
          r="5"
          fill="#C4992A"
          stroke="#fff"
          strokeWidth="2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1.1 }}
        />

        {/* Etykieta przy krzywej */}
        <text x="14" y="180" fontSize="11" fill="#999999">początek</text>
        <text x="296" y="180" fontSize="11" fill="#999999">po wdrożeniu</text>
      </svg>

      {/* Narracja pod wykresem — trend, nie konkretne (zmyślone) liczby */}
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-surface-border pt-4">
        <Metric icon={<TrendingUp size={16} />} dir="up" label="Automatyzacja" />
        <Metric icon={<TrendingDown size={16} />} dir="down" label="Czas pracy" />
        <Metric icon={<TrendingDown size={16} />} dir="down" label="Koszty" />
      </div>
    </div>
  )
}

function Metric({ icon, dir, label }) {
  const color = dir === 'up' ? 'text-gold-dark' : 'text-emerald-600'
  return (
    <div className="text-center">
      <span className={`inline-flex items-center gap-1 text-sm font-semibold ${color}`}>
        {icon}
        {dir === 'up' ? 'rośnie' : 'spada'}
      </span>
      <p className="mt-0.5 text-xs text-ink-faint">{label}</p>
    </div>
  )
}

export default AutomationChart
