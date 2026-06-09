import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Bolt from '../ui/Bolt'

const links = [
  { label: 'Usługi', id: 'uslugi' },
  { label: 'Realizacje', id: 'realizacje' },
  { label: 'O mnie', id: 'o-mnie' },
  { label: 'Kontakt', id: 'kontakt' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Anchor-scroll działający też z podstron (/portfolio → /#id).
  // Na stronie głównej dodatkowo ustawiamy hash w URL (kopiowalna kotwica, np. /#o-mnie)
  // bez wyzwalania drugiego scrolla.
  const goTo = (id) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', `/#${id}`)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled
          ? 'border-b border-surface-border bg-surface-card/95 shadow-sm backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => location.pathname === '/' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-lg font-bold text-ink"
        >
          Kacper Złotorowicz
          <Bolt size={20} className="-mt-0.5" />
        </Link>

        {/* Menu desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="text-sm text-ink-soft transition hover:text-gold"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => goTo('kontakt')}
            className="rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-white transition hover:bg-gold-dark"
          >
            Porozmawiajmy
          </button>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setOpen(true)}
          className="text-ink md:hidden"
          aria-label="Otwórz menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Overlay mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-surface-card md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="flex items-center gap-1.5 text-lg font-bold text-ink">
                Kacper Złotorowicz
                <Bolt size={20} className="-mt-0.5" />
              </span>
              <button onClick={() => setOpen(false)} aria-label="Zamknij menu">
                <X size={24} className="text-ink" />
              </button>
            </div>
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="flex flex-col gap-2 px-6 pt-8"
            >
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => goTo(l.id)}
                  className="border-b border-surface-border py-4 text-left text-xl font-medium text-ink"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => goTo('kontakt')}
                className="mt-6 rounded-lg bg-gold px-7 py-3 text-center font-semibold text-white"
              >
                Porozmawiajmy
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
