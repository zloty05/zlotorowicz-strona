import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'

// LinkedIn nie jest już dostępny w lucide-react (usunięto ikony marek) — inline SVG.
const LinkedinIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)
import Section from '../ui/Section'
import SectionLabel from '../ui/SectionLabel'

const EMAIL = 'kacper@zlotorowicz.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/kacper-z%C5%82otorowicz-5a68b4159/'

const inputBase =
  'w-full rounded-lg border border-surface-border bg-surface-card px-4 py-3 text-base text-ink placeholder:text-ink-faint focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Nie udało się wysłać wiadomości.')
      }
      setSent(true)
      reset()
    } catch (err) {
      setError(err.message || 'Coś poszło nie tak. Spróbuj ponownie lub napisz na e-mail.')
    }
  }

  return (
    <Section id="kontakt">
      <SectionLabel label="Kontakt" />
      <h2 className="text-3xl font-bold text-ink">Porozmawiajmy o Twoim procesie</h2>
      <p className="mt-4 max-w-2xl text-base text-ink-soft">
        Opisz mi w kilku zdaniach co robisz ręcznie a wolałbyś żeby działo się samo.
        Odezwę się w ciągu 24 godzin.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        {/* Formularz / success state */}
        <div>
          {sent ? (
            <div className="flex flex-col items-start gap-4 rounded-lg border border-surface-border bg-surface-card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-subtle text-gold-dark">
                <CheckCircle2 size={28} />
              </span>
              <h3 className="text-xl font-semibold text-ink">Dziękuję za wiadomość!</h3>
              <p className="text-base text-ink-soft">
                Odezwę się do Ciebie w ciągu 24 godzin. Do usłyszenia!
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm font-medium text-gold transition hover:text-gold-dark"
              >
                Wyślij kolejną wiadomość
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-soft">
                  Imię i nazwisko <span className="text-gold">*</span>
                </label>
                <input
                  className={inputBase}
                  placeholder="Jan Kowalski"
                  {...register('name', { required: 'Podaj imię i nazwisko' })}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-soft">
                  Firma <span className="text-ink-faint">(opcjonalne)</span>
                </label>
                <input className={inputBase} placeholder="Nazwa firmy" {...register('company')} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-soft">
                    E-mail <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    className={inputBase}
                    placeholder="jan@firma.pl"
                    {...register('email', {
                      required: 'Podaj adres e-mail',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Niepoprawny adres e-mail',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-soft">
                    Telefon <span className="text-ink-faint">(opcjonalne)</span>
                  </label>
                  <input className={inputBase} placeholder="+48 600 000 000" {...register('phone')} />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-soft">
                  Opisz proces lub problem <span className="text-gold">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`${inputBase} resize-y`}
                  placeholder="Co robisz ręcznie, a wolałbyś żeby działo się samo?"
                  {...register('message', { required: 'Opisz proces lub problem' })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              {error && (
                <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3 font-semibold text-white transition hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                {isSubmitting ? 'Wysyłam…' : 'Wyślij wiadomość'}
              </button>
            </form>
          )}
        </div>

        {/* Dane kontaktowe */}
        <div className="space-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-3 text-base text-ink-soft transition hover:text-gold"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-gold-subtle text-gold-dark">
              <Mail size={20} />
            </span>
            {EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-base text-ink-soft transition hover:text-gold"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-gold-subtle text-gold-dark">
              <LinkedinIcon size={20} />
            </span>
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  )
}

export default Contact
