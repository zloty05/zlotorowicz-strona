import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import Button from '../ui/Button'
import AutomationChart from '../ui/AutomationChart'

function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="mx-auto max-w-5xl px-6 pb-14 pt-12 md:pb-20 md:pt-16">
      <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        {/* Lewa kolumna — treść */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel label="Business Process Automation" />

          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Powtarzalna praca
            <br />
            nie musi zajmować
            <br />
            Twojego <span className="text-gold">czasu.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-ink-soft sm:text-lg">
            Buduję systemy, które przejmują żmudne, powtarzalne zadania w Twojej
            firmie — szybko, tanio i z użyciem AI tam gdzie to naprawdę ma sens.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#kontakt" onClick={scrollTo('kontakt')}>
              Porozmawiajmy o Twoim procesie
            </Button>
            <Button variant="secondary" href="#realizacje" onClick={scrollTo('realizacje')}>
              Zobacz realizacje
            </Button>
          </div>
        </motion.div>

        {/* Prawa kolumna — wykres efektu automatyzacji */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <AutomationChart />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
