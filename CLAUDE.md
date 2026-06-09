# CLAUDE.md — Kacper Złotorowicz · Strona osobista

Strona-wizytówka konsultanta automatyzacji procesów biznesowych.
Cel: pozyskiwanie klientów MŚP przez formularz kontaktowy.
Język: polski.

**STATUS: LIVE w produkcji.**
- 🌐 Domena: **https://zlotorowicz.com** (Active, SSL; `www` też)
- 🔗 Repo: **https://github.com/zloty05/zlotorowicz-strona** (publiczne, branch `master`)
- ☁️ Cloudflare Pages projekt: **`zlotorowicz`** (połączony z GitHub — auto-deploy)
- ✉️ Formularz → Resend → maile dochodzą na `kacper.zlotorowicz@outlook.com` ✅

---

## ⚠️ Niuanse środowiska — przeczytaj zanim cokolwiek uruchomisz

1. **npm/build/dev wymagają systemowych certyfikatów.** Sieć blokuje rejestr npm
   błędem `UNABLE_TO_VERIFY_LEAF_SIGNATURE`. Każde polecenie npm/npx/vite/wrangler
   poprzedzaj `NODE_OPTIONS="--use-system-ca"` (Bash) lub
   `$env:NODE_OPTIONS="--use-system-ca"` (PowerShell).

2. **Ten katalog ma WŁASNE, niezależne repo git** (`origin` = `zlotorowicz-strona`
   na GitHub). Katalog domowy `C:/Users/zloty` nie jest już repozytorium git.
   Commituj normalnie z tego katalogu — `git add` / `git commit` / `git push` są OK.

3. **Sekrety nie trafiają do repo.** `.dev.vars` i `.env*` są w `.gitignore`.
   Klucz Resend trzymany lokalnie w `.dev.vars`, na produkcji jako zmienna
   środowiskowa w panelu Cloudflare Pages. `.dev.vars.example` ma tylko placeholder.

4. **Norton (false positive).** Bywa, że Norton (IDP.Helu.PSE*) blokuje `node.exe`/
   `wrangler`/`powershell` przy operacjach sieciowych. To fałszywy alarm narzędzi dev.
   Jeśli CLI nagle pada — to może być Norton; alternatywą jest deploy przez GitHub
   (auto-build), który nie wymaga lokalnego CLI.

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
    sections/      Hero, Services, Process, CaseStudies, About, Contact
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
Hero → Services → Process → CaseStudies → About → Contact.
Każda sekcja ma `id` zgodne z menu: `uslugi`, `realizacje`, `o-mnie`, `kontakt`
(+ `proces`). Hero = góra strony.

---

## Formularz kontaktowy → Resend

- Front: `Contact.jsx` (React Hook Form) → `fetch('/api/contact', POST json)`.
- Funkcja: `functions/api/contact.js` — waliduje po stronie serwera, escapuje HTML,
  woła `https://api.resend.com/emails`.
  - `FROM = 'Kacper Złotorowicz <kacper@zlotorowicz.com>'` — MUSI być na zweryfikowanej
    domenie zlotorowicz.com (inaczej Resend odrzuci).
  - `TO = 'kacper.zlotorowicz@outlook.com'` — skrzynka, którą realnie odbiera Kacper
    (domena zlotorowicz.com nie ma własnej poczty). `reply_to` = e-mail z formularza.
- Sekret `RESEND_API_KEY`: lokalnie w `.dev.vars`, na produkcji w Cloudflare Pages
  (Settings → Environment variables).
- **Status: działa.** Domena zlotorowicz.com jest zweryfikowana w Resend, test
  zwrócił `{"ok":true}`, maile dochodzą. Odpowiedź funkcji: `200 {ok:true}` /
  `400` (walidacja) / `502` (błąd Resend).

---

## Deploy — automatyczny przez GitHub ✅

Projekt Cloudflare Pages `zlotorowicz` jest **połączony z repo GitHub**. Deploy to
po prostu **push na branch `master`**:

```bash
git add -A
git commit -m "..."
git push origin master       # ← Cloudflare sam: clone → npm run build → publish (z Functions)
```

Build w chmurze CF: command `npm run build`, output `dist`, framework Vite.
Cloudflare wykrywa `functions/` i deployuje Functions automatycznie.
Zmienna `RESEND_API_KEY` jest ustawiona w panelu (Settings → Environment variables).

**Ważne (czego NIE robić):** nie wgrywać ZIP-em przez „Upload assets" — direct-upload
NIE deployuje Pages Functions (formularz by nie działał) i tworzy projekt, którego
nie da się połączyć z Git. Zostajemy przy auto-deployu z GitHub.

Deploy ręczny z CLI (awaryjnie, gdy GitHub niedostępny):
`NODE_OPTIONS="--use-system-ca" npx wrangler pages deploy dist --project-name=zlotorowicz`

### Historia konfiguracji (dlaczego tak)
Domena zlotorowicz.com była początkowo błędnie podpięta do projektu z ZIP-a (HTTP 522).
Naprawione przez: usunięcie projektu direct-upload → utworzenie projektu połączonego z
Git → podpięcie domeny przez panel (Custom domains → Set up → Activate; panel sam
tworzy rekordy DNS, czego API z tokenem OAuth wranglera NIE robi — brak `dns_records:edit`).

---

## Dane projektów — src/data/projects.js

3 realizacje (slug): `translatescorm` (flagship, SaaS), `ksiega-kancelaryjna` (AI),
`etykiety-dymo` (Automatyzacja biurowa). Strona /portfolio filtruje po `category`.
Karty renderuje współdzielony `ui/ProjectCard.jsx`.

---

## Placeholdery do uzupełnienia (zostały)

- [ ] Zdjęcie w sekcji „O mnie" (teraz placeholder z ikoną User w `About.jsx`)
- [ ] Strona/sekcja „Polityka prywatności" — link w stopce prowadzi do `#`.
      Warto dodać ze względu na RODO (formularz zbiera dane osobowe).

## Gotowe (nie placeholdery)

- ✅ Odbiorca formularza: `kacper.zlotorowicz@outlook.com`; `from:` `kacper@zlotorowicz.com`
- ✅ LinkedIn: https://www.linkedin.com/in/kacper-z%C5%82otorowicz-5a68b4159/
- ✅ Domena zlotorowicz.com live + zweryfikowana w Resend
- ✅ Backend formularza działa (maile dochodzą)

---

## Zasady kodowania

- Komponenty funkcyjne + hooks. Treść z `data/projects.js`, nie hardkodowana w komponentach.
- Mobile first (`sm:` → `md:` → `lg:`). Max width `max-w-5xl mx-auto px-6`.
- Semantic HTML, focus gold widoczny (a11y).
- Po każdej zmianie: `npm run build` + `npm run lint` (z `NODE_OPTIONS=--use-system-ca`).
