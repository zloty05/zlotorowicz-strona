import { ClipboardList, Printer, FolderTree, Banknote, Clock, HelpCircle } from 'lucide-react'
import Section from '../ui/Section'
import SectionLabel from '../ui/SectionLabel'

const pains = [
  { Icon: ClipboardList, text: 'Twój zespół co tydzień ręcznie przepisuje te same dane między systemami' },
  { Icon: Printer, text: 'Drukowanie etykiety, raport, mail — każde wymaga 10 kliknięć' },
  { Icon: FolderTree, text: 'Pliki lądują nie tam gdzie trzeba, bo nikt nie ma czasu pilnować struktury' },
  { Icon: Banknote, text: 'Tłumaczenia, transkrypcje — płacisz ludzi za rzeczy które może robić AI' },
  { Icon: Clock, text: 'Proste zadania „zajmują chwilę" — ale tych chwil jest 50 dziennie' },
  { Icon: HelpCircle, text: 'Wiesz że dałoby się to zautomatyzować, ale nie wiesz od czego zacząć' },
]

function Problem() {
  return (
    <Section id="problem">
      <SectionLabel label="Dla kogo to jest" />
      <h2 className="text-3xl font-bold text-ink">Czy któreś z tych zdań brzmią znajomo?</h2>

      <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {pains.map(({ Icon, text }) => (
          <div key={text} className="flex items-start gap-4">
            <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-md bg-gold-subtle text-gold-dark">
              <Icon size={20} />
            </span>
            <p className="text-base text-ink-soft">{text}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-lg font-medium text-ink">
        Jeśli tak — trafiłeś dobrze. Dokładnie to rozwiązuję.
      </p>
    </Section>
  )
}

export default Problem
