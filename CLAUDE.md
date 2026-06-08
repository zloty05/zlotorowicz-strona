# CLAUDE.md — Kacper Złotorowicz · Strona osobista

Strona-wizytówka konsultanta automatyzacji procesów biznesowych.
Cel: pozyskiwanie klientów MŚP przez formularz kontaktowy.
Język: polski. Domena docelowa: **zlotorowicz.com**.

---

## ⚠️ Niuanse środowiska — przeczytaj zanim cokolwiek uruchomisz

1. **npm/build/dev wymagają systemowych certyfikatów.** Sieć blokuje rejestr npm
   błędem `UNABLE_TO_VERIFY_LEAF_SIGNATURE`. Każde polecenie npm/npx/vite/wrangler
   poprzedzaj `NODE_OPTIONS="--use-system-ca"` (Bash) lub
   `$env:NODE_OPTIONS="--use-system-ca"` (PowerShell).

2. **To repo git ma root w katalogu domowym `C:/Users/zloty`**, a jego `origin` to
   `Konfigurator_promocyjny.git` — INNY projekt. Strona jest tylko podkatalogiem.
   ➜ **Nigdy `git add -A` / `git push` z myślą, że wypchnie to stronę** — wypchnęłoby
   pół katalogu domowego do cudzego repo. Deploy idzie przez Wrangler (patrz niżej),
   nie przez git push tego repo.

3. **Sekrety nie trafiają do repo.** `.dev.vars` i `.env*` są w `.gitignore`.
   Klucz Resend trzymany lokalnie w `.dev.vars`, na produkcji w panelu Cloudflare.

---

## Stack (realny, zainstalowany)

- **Vite 8** + **React 19**
- **Tailwind CSS 3**
- **React Router 7** (SPA, BrowserRouter)
- **Framer Motion 12** (animacje wejścia sekcji + wykres Hero)
- **React Hook Form 7** (formularz kontaktowy)
- **Lucide React** (ikony)
- **Google Fonts:** DM Sans (300–700)
- **Hosting:** Cloudflare Pages + Pages Functions
- **Mail:** Resend (przez funkcję serverless)

---

## Skrypty

```bash
NODE_OPTIONS="--use-system-ca" npm install      # instalacja
NODE_OPTIONS="--use-system-ca" npm run dev       # dev (Vite, ~5173) — UWAGA: /api/* NIE działa
NODE_OPTIONS="--use-system-ca" npm run build     # produkcja → dist/
NODE_OPTIONS="--use-system-ca" npm run lint      # eslint
NODE_OPTIONS="--use-system-ca" npm run preview   # podgląd builda (statyka, bez funkcji)

# Pełny stack lokalnie (statyka + funkcja /api/contact + Resend):
NODE_OPTIONS="--use-system-ca" npx wrangler pages dev dist --compatibility-date=2026-06-08
```

`npm run dev` serwuje tylko frontend — Cloudflare Functions (`/api/contact`) działają
wyłącznie pod `wrangler pages dev dist`.

---

## Design System

### Kolory (tailwind.config.js)

| Token | Hex |
|---|---|
| gold.DEFAULT / light / dark / subtle | #C4992A / #D4AA3A / #A07A18 / #F5EDD6 |
| ink.DEFAULT / soft / muted / faint | #111111 / #333333 / #666666 / #999999 |
| surface.DEFAULT / card / border / hover | #FAFAF8 / #FFFFFF / #E8E4DC / #F2EFE8 |

Marka: złota **błyskawica** (gold→granat) — `favicon.svg` + komponent `ui/Bolt.jsx` w Navbarze.

### Typografia
Font: **DM Sans** (cała strona). H1 `text-5xl font-bold`, H2 `text-3xl font-bold`,
H3 `text-xl font-semibold`, body `text-base text-ink-soft`,
eyebrow `text-xs tracking-widest uppercase text-gold`.

### Konwencje UI
- CTA / przyciski / inputy: `rounded-lg` (zaokrąglone narożniki).
- Karty: `bg-surface-card border border-surface-border rounded-lg border-t-2 border-t-gold`.
- Odstępy sekcji: `Section` ma `py-12 md:py-16`.
- Animacja sekcji: `initial {opacity:0,y:24} → whileInView {opacity:1,y:0}`, `once:true`.

---

## Struktura

```
src/
  components/
    layout/        Navbar.jsx, Footer.jsx
    sections/      Hero, Problem, Services, Process, CaseStudies, About, Contact
    ui/            SectionLabel, Button, Card, Badge, Section (wrapper z animacją),
                   ProjectCard (współdzielony), Bolt (logo), AutomationChart (wykres Hero)
  pages/           Home.jsx, Portfolio.jsx
  data/            projects.js   (3 projekty + lista kategorii)
  styles/          index.css     (Tailwind + focus gold + smooth scroll)
  App.jsx          routing: / → Home, /portfolio → Portfolio
  main.jsx         BrowserRouter
functions/
  api/contact.js   Cloudflare Pages Function (onRequestPost) → Resend
public/
  favicon.svg      błyskawica (marka)
  _routes.json     {"include":["/api/*"]} — tylko API uruchamia Functions; reszta = SPA
index.html         lang=pl, DM Sans, meta/OG
.dev.vars(.example) RESEND_API_KEY (lokalnie; .dev.vars w .gitignore)
```

Sekcje strony głównej (kolejność w `Home.jsx`):
Hero → Problem → Services → Process → CaseStudies → About → Contact.
Każda sekcja ma `id` zgodne z menu: `uslugi`, `realizacje`, `o-mnie`, `kontakt`
(+ `problem`, `proces`). Hero = góra strony.

---

## Formularz kontaktowy → Resend

- Front: `Contact.jsx` (React Hook Form) → `fetch('/api/contact', POST json)`.
- Funkcja: `functions/api/contact.js` — waliduje po stronie serwera, escapuje HTML,
  woła `https://api.resend.com/emails`.
  - `from: 'Kacper Złotorowicz <kacper@zlotorowicz.com>'`
  - `to: 'kacper@zlotorowicz.com'`, `reply_to` = e-mail z formularza
- Wymaga sekretu `RESEND_API_KEY` (Resend → API keys).
- **Realna wysyłka działa dopiero po weryfikacji domeny zlotorowicz.com w Resend**
  (rekordy DKIM/SPF/DMARC w DNS). Bez tego funkcja zwraca 502 — to spodziewane.

---

## Deploy (Cloudflare Pages, przez Wrangler)

```bash
NODE_OPTIONS="--use-system-ca" npx wrangler login          # jednorazowo, OAuth w przeglądarce
NODE_OPTIONS="--use-system-ca" npm run build                # świeży dist/
NODE_OPTIONS="--use-system-ca" npx wrangler pages deploy dist --project-name=zlotorowicz
```

Po pierwszym deployu w panelu Cloudflare Pages:
- **Settings → Environment variables:** dodać `RESEND_API_KEY` (Production + Preview).
- **Custom domains:** podpiąć `zlotorowicz.com` (Cloudflare poprowadzi przez DNS).
- W Resend: zweryfikować domenę `zlotorowicz.com`, żeby wysyłka maili ruszyła.

---

## Dane projektów — src/data/projects.js

3 realizacje (slug): `translatescorm` (flagship, SaaS), `ksiega-kancelaryjna` (AI),
`etykiety-dymo` (Automatyzacja biurowa). Strona /portfolio filtruje po `category`.
Karty renderuje współdzielony `ui/ProjectCard.jsx`.

---

## Placeholdery do uzupełnienia

- [ ] Zdjęcie w sekcji „O mnie" (teraz placeholder z ikoną User)
- [ ] Link „Polityka prywatności" w stopce (teraz `#`)
- [ ] Weryfikacja domeny zlotorowicz.com w Resend (warunek działania maili)

## Dane już wstawione (nie placeholdery)

- E-mail / odbiorca formularza: **kacper@zlotorowicz.com**
- LinkedIn: https://www.linkedin.com/in/kacper-z%C5%82otorowicz-5a68b4159/

---

## Zasady kodowania

- Komponenty funkcyjne + hooks. Treść z `data/projects.js`, nie hardkodowana w komponentach.
- Mobile first (`sm:` → `md:` → `lg:`). Max width `max-w-5xl mx-auto px-6`.
- Semantic HTML, focus gold widoczny (a11y).
- Po każdej zmianie: `npm run build` + `npm run lint` (z `NODE_OPTIONS=--use-system-ca`).
