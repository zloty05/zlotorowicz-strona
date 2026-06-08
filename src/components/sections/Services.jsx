import { motion } from 'framer-motion'
import { Cpu, GitMerge, ScanText, LayoutDashboard } from 'lucide-react'
import Section from '../ui/Section'
import SectionLabel from '../ui/SectionLabel'
import Card from '../ui/Card'

const services = [
  {
    Icon: Cpu,
    title: 'Automatyzacja pracy biurowej',
    desc: 'Dokumenty, pliki, wydruki, formularze — jeśli robisz to ręcznie częściej niż raz w tygodniu, można to zautomatyzować. Szybko i tanio.',
  },
  {
    Icon: GitMerge,
    title: 'Integracje między systemami',
    desc: 'Dane z jednego systemu trafiają do drugiego automatycznie. Koniec z ręcznym przepisywaniem i kopiowaniem plików.',
  },
  {
    Icon: ScanText,
    title: 'AI do przetwarzania dokumentów',
    desc: 'Rozpoznawanie treści skanów, klasyfikacja pism, wyciąganie danych. AI robi analizę — człowiek tylko zatwierdza.',
  },
  {
    Icon: LayoutDashboard,
    title: 'Własne aplikacje i platformy',
    desc: 'Kiedy problem jest zbyt złożony na gotowe narzędzie — buduję dedykowaną aplikację. Od prostego panelu po pełną platformę SaaS.',
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function Services() {
  return (
    <Section id="uslugi">
      <SectionLabel label="Co robię" />
      <h2 className="text-3xl font-bold text-ink">Automatyzacje szyte pod Twój biznes</h2>
      <p className="mt-4 max-w-2xl text-base text-ink-soft">
        Nie sprzedaję gotowych szablonów. Każde rozwiązanie zaczynam od zrozumienia
        jak naprawdę wygląda Twój proces.
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-10 grid gap-6 sm:grid-cols-2"
      >
        {services.map(({ Icon, title, desc }) => (
          <motion.div key={title} variants={item}>
            <Card className="h-full">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-gold-subtle text-gold-dark">
                <Icon size={24} />
              </span>
              <h3 className="text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-base text-ink-soft">{desc}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

export default Services
