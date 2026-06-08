import { motion } from 'framer-motion'

// Wrapper sekcji z animacją wejścia przy scroll (wg CLAUDE.md).
// Ujednolica id, max-width i padding pionowy dla wszystkich sekcji strony.
function Section({ id, className = '', children, ...props }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mx-auto max-w-5xl px-6 py-12 md:py-16 ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export default Section
