import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'
import Badge from '../components/ui/Badge'
import { projects } from '../data/projects'

// Renderuje wartość wyniku: para before→after lub pojedyncza wartość.
// Logika spójna z ui/ProjectCard.jsx.
function ResultValue({ result }) {
  if (result.before !== undefined) {
    return (
      <span className="font-medium text-ink">
        <span className="text-ink-faint line-through">{result.before}</span>
        {' → '}
        <span className="text-gold-dark">{result.after}</span>
      </span>
    )
  }
  return <span className="font-semibold text-gold-dark">{result.value}</span>
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  // Wejście na podstronę zaczyna od góry (jak Portfolio.jsx).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Nieistniejący slug — komunikat zamiast pustej strony.
  if (!project) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-bold text-ink">Nie znaleziono projektu</h1>
        <p className="mt-4 text-base text-ink-soft">
          Ten projekt nie istnieje lub został przeniesiony.
        </p>
        <Link
          to="/portfolio"
          className="mt-8 inline-flex items-center gap-2 font-semibold text-gold transition hover:text-gold-dark"
        >
          <ArrowLeft size={18} />
          Wszystkie projekty
        </Link>
      </main>
    )
  }

  const { badge, title, tagline, overview, how, features, benefits, results, stack, liveUrl } =
    project

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      {/* Powrót */}
      <Link
        to="/portfolio"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-gold"
      >
        <ArrowLeft size={16} />
        Wszystkie projekty
      </Link>

      {/* Hero projektu */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <Badge variant="category" className="self-start">
          {badge}
        </Badge>
        <h1 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">{tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <Badge key={tech} variant="tag">
              {tech}
            </Badge>
          ))}
        </div>

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-gold transition hover:text-gold-dark"
          >
            Zobacz na żywo
            <ExternalLink size={16} />
          </a>
        )}
      </motion.header>

      {/* O projekcie */}
      <section className="mt-14">
        <SectionLabel label="O projekcie" />
        <p className="max-w-3xl text-base leading-relaxed text-ink-soft">{overview}</p>
      </section>

      {/* Jak to działa */}
      {how?.length > 0 && (
        <section className="mt-14">
          <SectionLabel label="Jak to działa" />
          <div className="mt-2 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {how.map((step, i) => (
              <div key={step} className="relative pl-2">
                <span className="block text-4xl font-bold leading-none text-gold/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-base text-ink-soft">{step}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Kluczowe funkcje */}
      {features?.length > 0 && (
        <section className="mt-14">
          <SectionLabel label="Kluczowe funkcje" />
          <ul className="mt-2 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold-subtle text-gold-dark">
                  <Check size={16} strokeWidth={3} />
                </span>
                <span className="text-base text-ink-soft">{f}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Wyniki */}
      {results?.length > 0 && (
        <section className="mt-14">
          <SectionLabel label="Wyniki" />
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            {results.map((r) => (
              <div
                key={r.label}
                className="rounded-lg border border-surface-border border-t-2 border-t-gold bg-surface-card p-5"
              >
                <p className="text-sm text-ink-faint">{r.label}</p>
                <p className="mt-2 text-lg">
                  <ResultValue result={r} />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Korzyści */}
      {benefits?.length > 0 && (
        <section className="mt-14">
          <SectionLabel label="Korzyści" />
          <ul className="mt-2 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold-subtle text-gold-dark">
                  <Check size={16} strokeWidth={3} />
                </span>
                <span className="text-base text-ink-soft">{b}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16 rounded-lg border border-surface-border bg-surface-card p-8 md:p-10">
        <h2 className="text-2xl font-bold text-ink">Masz podobny proces?</h2>
        <p className="mt-3 max-w-2xl text-base text-ink-soft">
          Jeśli coś w Twojej firmie robi się ręcznie, a mogłoby działać samo — opowiedz mi o
          tym. Odezwę się w ciągu 24 godzin.
        </p>
        <Link
          to="/#kontakt"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3 font-semibold text-white transition hover:bg-gold-dark"
        >
          Porozmawiajmy
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  )
}

export default ProjectDetail
