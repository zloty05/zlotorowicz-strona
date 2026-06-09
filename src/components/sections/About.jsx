import { useState } from 'react'
import { Check, User } from 'lucide-react'
import Section from '../ui/Section'
import SectionLabel from '../ui/SectionLabel'

// Zdjęcie Kacpra: wrzuć plik do public/ pod tą nazwą, a pojawi się automatycznie.
// Dopóki pliku nie ma, pokazujemy placeholder (fallback po błędzie ładowania).
const PHOTO_SRC = '/photo-kacper.jpg'

const points = [
  'Rozumiem procesy biznesowe, nie tylko kod',
  'Pracuję bezpośrednio z właścicielem lub osobą decyzyjną',
  'Proponuję tylko to co ma sens ekonomicznie',
  'Mierzę sukces oszczędnością czasu lub pieniędzy',
]

function About() {
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <Section id="o-mnie">
      <SectionLabel label="O mnie" />

      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        {/* Tekst */}
        <div>
          <h2 className="text-3xl font-bold text-ink">Kacper Złotorowicz</h2>
          <p className="mt-1 text-base text-gold">Automatyzacja Procesów Biznesowych</p>

          <div className="mt-6 space-y-4 text-base text-ink-soft">
            <p>
              Przez lata pracowałem z oprogramowaniem, automatyką przemysłową i ludźmi
              w środowiskach gdzie liczy się niezawodność i precyzja. Nauczyłem się jednej
              rzeczy: zanim zaproponuję rozwiązanie, muszę naprawdę zrozumieć problem.
            </p>
            <p>
              Dziś technologia pozwala automatyzować powtarzalne zadania w każdym biznesie —
              szybko i przy niewielkim koszcie. Możliwość oparcia rozwiązań o AI wynosi to
              na zupełnie inny poziom.
            </p>
            <p>
              Działam z firmami z różnych branż. Diagnozuję obszary do automatyzacji
              i proponuję rozwiązania skrojone dokładnie pod to czego potrzebuje konkretny biznes.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold-subtle text-gold-dark">
                  <Check size={16} strokeWidth={3} />
                </span>
                <span className="text-base text-ink-soft">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Zdjęcie (desktop) — realne jeśli plik istnieje, inaczej placeholder */}
        <div className="hidden md:block">
          {photoOk ? (
            <img
              src={PHOTO_SRC}
              alt="Kacper Złotorowicz"
              onError={() => setPhotoOk(false)}
              className="aspect-[3/4] w-full rounded-lg border border-surface-border object-cover"
            />
          ) : (
            <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-dashed border-surface-border bg-surface-hover text-ink-faint">
              <div className="text-center">
                <User size={48} className="mx-auto opacity-40" />
                <p className="mt-2 text-sm">Zdjęcie wkrótce</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

export default About
