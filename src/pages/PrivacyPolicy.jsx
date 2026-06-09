import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'

const EMAIL = 'kacper@zlotorowicz.com'
// Data ostatniej aktualizacji polityki (ręcznie aktualizuj przy zmianach treści).
const UPDATED = '9 czerwca 2026'

// Reużywalny nagłówek sekcji polityki — eyebrow + H2, spójny z resztą strony.
function PolicySection({ label, title, children }) {
  return (
    <section className="mt-12">
      <SectionLabel label={label} />
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">{children}</div>
    </section>
  )
}

function PrivacyPolicy() {
  // Wejście na podstronę zaczyna od góry (jak ProjectDetail.jsx / Portfolio.jsx).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-gold"
      >
        <ArrowLeft size={16} />
        Strona główna
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold text-ink sm:text-5xl">Polityka Prywatności</h1>
        <p className="mt-3 text-base text-ink-soft">
          Krótko i po ludzku: jakie dane zbieram przez formularz kontaktowy, po co i jakie masz
          prawa. Bez śledzenia, bez sprzedawania danych.
        </p>
        <p className="mt-2 text-sm text-ink-faint">Ostatnia aktualizacja: {UPDATED}</p>
      </header>

      <PolicySection label="Administrator" title="Kto przetwarza Twoje dane">
        <p>
          Administratorem Twoich danych jest <strong>Kacper Złotorowicz</strong>, prowadzący
          działalność w zakresie automatyzacji procesów biznesowych. W sprawach dotyczących danych
          osobowych skontaktujesz się ze mną pod adresem{' '}
          <a
            href={`mailto:${EMAIL}`}
            className="text-gold underline-offset-2 transition hover:text-gold-dark hover:underline"
          >
            {EMAIL}
          </a>
          .
        </p>
      </PolicySection>

      <PolicySection label="Zakres" title="Jakie dane zbieram">
        <p>Wyłącznie te, które sam podasz w formularzu kontaktowym:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>imię i nazwisko,</li>
          <li>adres e-mail,</li>
          <li>opcjonalnie: numer telefonu i nazwa firmy,</li>
          <li>treść wiadomości, którą do mnie wysyłasz.</li>
        </ul>
        <p>
          Nie zbieram żadnych danych „w tle" — strona nie używa narzędzi analitycznych ani pikseli
          śledzących (patrz sekcja „Pliki cookies").
        </p>
      </PolicySection>

      <PolicySection label="Cel" title="Po co i na jakiej podstawie">
        <p>
          Dane z formularza wykorzystuję wyłącznie po to, by odpowiedzieć na Twoje zapytanie i —
          jeśli zdecydujemy się na współpracę — podjąć kontakt oraz czynności przed zawarciem umowy.
        </p>
        <p>
          Podstawą prawną jest art. 6 ust. 1 lit. b RODO (działania na Twoje żądanie przed
          zawarciem umowy) oraz art. 6 ust. 1 lit. f RODO (mój prawnie uzasadniony interes, jakim
          jest prowadzenie korespondencji w odpowiedzi na zapytanie). Nie wykorzystuję Twoich danych
          do marketingu bez Twojej zgody.
        </p>
      </PolicySection>

      <PolicySection label="Odbiorcy" title="Komu przekazuję dane">
        <p>
          Samodzielnie nie udostępniam Twoich danych nikomu. Korzystam jednak z zaufanych dostawców
          technicznych, którzy przetwarzają dane wyłącznie w moim imieniu:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Resend</strong> — usługa dostarczania wiadomości e-mail, która przesyła do mnie
            treść formularza. Infrastruktura znajduje się w USA, a transfer odbywa się na podstawie
            standardowych klauzul umownych / Data Privacy Framework.
          </li>
          <li>
            <strong>Microsoft</strong> — dostawca skrzynki pocztowej (Outlook), na którą trafiają
            Twoje wiadomości.
          </li>
          <li>
            <strong>Cloudflare</strong> — dostawca hostingu, na którym działa ta strona.
          </li>
        </ul>
      </PolicySection>

      <PolicySection label="Czas" title="Jak długo przechowuję dane">
        <p>
          Twoją wiadomość i dane kontaktowe przechowuję przez czas niezbędny do obsługi zapytania i
          prowadzenia z Tobą korespondencji, a w razie nawiązania współpracy — przez okres jej
          trwania i rozliczeń. Gdy dane przestają być potrzebne, usuwam je. Możesz też w każdej
          chwili poprosić o ich usunięcie.
        </p>
      </PolicySection>

      <PolicySection label="Twoje prawa" title="Co możesz zrobić">
        <p>W odniesieniu do swoich danych masz prawo do:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>dostępu do danych i otrzymania ich kopii,</li>
          <li>sprostowania (poprawienia) danych,</li>
          <li>usunięcia danych,</li>
          <li>ograniczenia przetwarzania,</li>
          <li>wniesienia sprzeciwu wobec przetwarzania,</li>
          <li>przenoszenia danych.</li>
        </ul>
        <p>
          Aby skorzystać z któregokolwiek z tych praw, napisz na{' '}
          <a
            href={`mailto:${EMAIL}`}
            className="text-gold underline-offset-2 transition hover:text-gold-dark hover:underline"
          >
            {EMAIL}
          </a>
          . Masz również prawo wnieść skargę do organu nadzorczego — Prezesa Urzędu Ochrony Danych
          Osobowych (PUODO), jeśli uznasz, że przetwarzam Twoje dane niezgodnie z prawem.
        </p>
      </PolicySection>

      <PolicySection label="Cookies" title="Pliki cookies">
        <p>
          Strona używa wyłącznie technicznie niezbędnych plików cookies, które są konieczne do jej
          poprawnego działania. <strong>Nie stosuję</strong> narzędzi analitycznych, reklamowych ani
          śledzących — nie profiluję Cię i nie buduję na Twój temat żadnych statystyk. Czcionki są
          serwowane bezpośrednio z tej strony, więc Twoje dane nie są przy tym przekazywane do
          zewnętrznych dostawców.
        </p>
      </PolicySection>

      <PolicySection label="Dobrowolność" title="Czy musisz podawać dane">
        <p>
          Podanie danych jest w pełni dobrowolne, ale niezbędne, żebym mógł odpowiedzieć na Twoje
          zapytanie. Jeśli nie chcesz korzystać z formularza, możesz po prostu napisać do mnie
          bezpośrednio na{' '}
          <a
            href={`mailto:${EMAIL}`}
            className="text-gold underline-offset-2 transition hover:text-gold-dark hover:underline"
          >
            {EMAIL}
          </a>
          .
        </p>
      </PolicySection>
    </main>
  )
}

export default PrivacyPolicy
