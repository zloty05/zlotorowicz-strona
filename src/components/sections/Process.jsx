import Section from '../ui/Section'
import SectionLabel from '../ui/SectionLabel'

const steps = [
  {
    num: '01',
    title: 'Bezpłatna rozmowa',
    desc: 'Opowiedz mi o procesie który Cię boli. Bez zobowiązań, bez technicznego żargonu.',
  },
  {
    num: '02',
    title: 'Analiza i propozycja',
    desc: 'Przyglądam się jak wygląda praca, identyfikuję gdzie tracisz czas i proponuję rozwiązanie z wyceną.',
  },
  {
    num: '03',
    title: 'Budowa',
    desc: 'Projektuję i wdrażam automatyzację iteracyjnie — widzisz postęp na bieżąco.',
  },
  {
    num: '04',
    title: 'Wdrożenie i wsparcie',
    desc: 'Przekazuję gotowe rozwiązanie z dokumentacją. Jestem dostępny jeśli coś wymaga korekty.',
  },
]

function Process() {
  return (
    <Section id="proces">
      <SectionLabel label="Proces" />
      <h2 className="text-3xl font-bold text-ink">Od rozmowy do działającego rozwiązania</h2>

      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {steps.map((s) => (
          <div key={s.num} className="relative pl-2">
            <span className="block text-5xl font-bold leading-none text-gold/30">{s.num}</span>
            <h3 className="mt-3 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-base text-ink-soft">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Process
