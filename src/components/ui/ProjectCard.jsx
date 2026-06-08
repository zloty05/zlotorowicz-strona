import Card from './Card'
import Badge from './Badge'

// Karta pojedynczego projektu — używana w sekcji Realizacje i na stronie /portfolio.
// `flagship` powiększa kartę i wyróżnia złotym obramowaniem.
function ProjectCard({ project, flagship = false }) {
  const { badge, title, problem, results, stack } = project

  return (
    <Card
      as="article"
      className={`flex h-full flex-col ${
        flagship ? 'border-gold border-t-2 ring-1 ring-gold/30' : ''
      }`}
    >
      <Badge variant="category" className="self-start">
        {badge}
      </Badge>

      <h3 className={`mt-4 font-semibold text-ink ${flagship ? 'text-2xl' : 'text-xl'}`}>
        {title}
      </h3>

      <p className="mt-3 text-base text-ink-soft">{problem}</p>

      {/* Rezultaty: before → after lub pojedyncza wartość */}
      <div className="mt-5 space-y-2">
        {results.map((r) => (
          <div key={r.label} className="text-sm">
            <span className="text-ink-faint">{r.label}: </span>
            {r.before !== undefined ? (
              <span className="font-medium text-ink">
                <span className="text-ink-faint line-through">{r.before}</span>
                {' → '}
                <span className="text-gold-dark">{r.after}</span>
              </span>
            ) : (
              <span className="font-semibold text-gold-dark">{r.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {stack.map((tech) => (
          <Badge key={tech} variant="tag">
            {tech}
          </Badge>
        ))}
      </div>
    </Card>
  )
}

export default ProjectCard
