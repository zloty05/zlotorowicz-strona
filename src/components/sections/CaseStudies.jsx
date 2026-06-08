import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '../ui/Section'
import SectionLabel from '../ui/SectionLabel'
import ProjectCard from '../ui/ProjectCard'
import { projects } from '../../data/projects'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function CaseStudies() {
  const flagship = projects.find((p) => p.flagship)
  const rest = projects.filter((p) => !p.flagship)

  return (
    <Section id="realizacje">
      <SectionLabel label="Realizacje" />
      <h2 className="text-3xl font-bold text-ink">Problemy które już rozwiązałem</h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-10 grid gap-6 md:grid-cols-2"
      >
        {/* Flagship — pełna szerokość */}
        {flagship && (
          <motion.div variants={item} className="md:col-span-2">
            <ProjectCard project={flagship} flagship />
          </motion.div>
        )}
        {rest.map((p) => (
          <motion.div key={p.slug} variants={item}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 font-semibold text-gold transition hover:text-gold-dark"
        >
          Zobacz wszystkie projekty
          <ArrowRight size={18} />
        </Link>
      </div>
    </Section>
  )
}

export default CaseStudies
