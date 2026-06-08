export const projects = [
  {
    slug: 'translatescorm',
    title: 'TranslateScorm',
    category: 'SaaS',
    badge: 'Projekt własny · SaaS',
    tagline: 'Platforma tłumaczeń kursów e-learning z AI',
    flagship: true,
    problem:
      'Tłumaczenie jednego kursu e-learningowego na 8 języków kosztowało 1700 zł i tygodnie pracy z zewnętrznymi tłumaczami.',
    solution:
      'Platforma SaaS która automatycznie dzieli kurs na segmenty, tłumaczy z pomocą AI i słownika branżowego, i eksportuje gotowy plik SCORM. System obsługuje projekty z podziałem ról (admin / tłumacz). Obsługuje 20 języków.',
    results: [
      { label: 'Koszt tłumaczenia kursu na 8 języków', before: '1 700 zł', after: '100 zł' },
      { label: 'Oszczędność', value: '17×' },
      { label: 'Obsługiwane języki', value: '20' },
    ],
    stack: ['Claude AI', 'Supabase', 'Vanilla JS'],
  },
  {
    slug: 'ksiega-kancelaryjna',
    title: 'Inteligentna księga kancelaryjna',
    category: 'AI',
    badge: 'Kancelaria prawna · AI',
    tagline: 'AI czyta pisma sądowe i sam proponuje gdzie zapisać plik',
    flagship: false,
    problem:
      'Każde pismo z sądu wymagało ręcznego przepisania danych (sygnatura, sąd, typ pisma) i ręcznego przeniesienia pliku do folderu sprawy.',
    solution:
      'Aplikacja która czyta skan pisma, automatycznie rozpoznaje sygnaturę sprawy, nazwę sądu i typ pisma, i proponuje radcy właściwy folder. Radca klika "Zatwierdź".',
    results: [
      { label: 'Czas obsługi pisma', before: 'kilka minut', after: '1 kliknięcie' },
    ],
    stack: ['AI OCR', 'Python', 'Document Intelligence'],
  },
  {
    slug: 'etykiety-dymo',
    title: 'Drukowanie etykiet jednym kliknięciem',
    category: 'Automatyzacja biurowa',
    badge: 'Kancelaria prawna · Word Add-in',
    tagline: 'Zaznacz adres w Wordzie, kliknij raz — etykieta gotowa',
    flagship: false,
    problem:
      'Wydrukowanie etykiety wysyłkowej wymagało otwarcia osobnego programu DYMO, ręcznego wpisania adresu z pisma i wybrania drukarki.',
    solution:
      'Przycisk bezpośrednio w Microsoft Word. Radca zaznacza adres w dokumencie i klika raz — etykieta DYMO drukuje się automatycznie bez otwierania czegokolwiek.',
    results: [
      { label: 'Czas drukowania etykiety', before: 'kilka minut', after: '1 sekunda' },
    ],
    stack: ['VBA', 'Word Add-in', 'DYMO SDK'],
  },
]

export const categories = ['Wszystkie', 'SaaS', 'AI', 'Automatyzacja biurowa']
