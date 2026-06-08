import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'
import ProjectCard from '../components/ui/ProjectCard'
import Card from '../components/ui/Card'
import { projects, categories } from '../data/projects'

function Portfolio() {
  const [filter, setFilter] = useState('Wszystkie')

  // Wejście na stronę zaczyna od góry.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const visible =
    filter === 'Wszystkie' ? projects : projects.filter((p) => p.category === filter)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <SectionLabel label="Portfolio" />
      <h1 className="text-4xl font-bold text-ink sm:text-5xl">Wszystkie projekty</h1>

      {/* Filtry */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === cat
                ? 'bg-gold text-white'
                : 'border border-surface-border bg-surface-card text-ink-soft hover:border-gold hover:text-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Siatka */}
      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((p) => (
          <motion.div
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}

        {/* Karta CTA „Twój projekt?" */}
        <motion.div layout>
          <Card className="flex h-full flex-col items-start justify-center">
            <h3 className="text-xl font-semibold text-ink">Twój projekt?</h3>
            <p className="mt-3 text-base text-ink-soft">
              Masz proces, który pochłania czas Twojego zespołu? Opowiedz mi o nim —
              znajdziemy sposób, żeby działał sam.
            </p>
            <Link
              to="/#kontakt"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-gold transition hover:text-gold-dark"
            >
              Porozmawiajmy
              <ArrowRight size={18} />
            </Link>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  )
}

export default Portfolio
