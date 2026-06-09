// Dane realizacji. Każdy projekt zasila zarówno kartę (ui/ProjectCard.jsx) jak i
// dedykowaną podstronę /portfolio/:slug (pages/ProjectDetail.jsx).
//
// Pola karty:    badge, title, problem, results, stack
// Pola podstrony: tagline, overview, how[], features[], benefits[], solution, liveUrl?
//
// Treść opisów pochodzi z realnej dokumentacji projektów (README/CLAUDE.md), nie jest
// zmyślona. `results` używa par before→after albo pojedynczej wartości.

export const projects = [
  {
    slug: 'translatescorm',
    title: 'TranslateScorm',
    category: 'SaaS',
    badge: 'Projekt własny · SaaS',
    tagline: 'Platforma tłumaczeń kursów e-learning z AI',
    flagship: true,
    liveUrl: 'https://translatescorm.com',
    problem:
      'Tłumaczenie jednego kursu e-learningowego na 8 języków kosztowało 1700 zł i tygodnie pracy z zewnętrznymi tłumaczami.',
    solution:
      'Platforma SaaS która automatycznie dzieli kurs na segmenty, tłumaczy z pomocą AI i słownika branżowego, i eksportuje gotowy plik SCORM. System obsługuje projekty z podziałem ról (admin / tłumacz). Obsługuje 20 języków.',
    overview:
      'TranslateScorm to wielotenantowa aplikacja SaaS do tłumaczenia materiałów e-learningowych. Obsługuje pliki XLIFF (Articulate Storyline), prezentacje PPTX i napisy (SRT/VTT). Tłumaczenia wykonuje model Claude bezpośrednio z przeglądarki, z wykorzystaniem pamięci tłumaczeń i słownika terminologii branżowej — dzięki temu te same terminy są spójne w całym kursie i kolejnych projektach.',
    how: [
      'Wgrywasz plik kursu (XLIFF / PPTX / napisy) — aplikacja dzieli go na segmenty do tłumaczenia.',
      'AI tłumaczy segment po segmencie, korzystając ze słownika terminologii i pamięci wcześniejszych tłumaczeń.',
      'Zespół tłumaczy może przejrzeć i poprawić wynik w panelu (role admin / tłumacz).',
      'Eksportujesz gotowy plik z powrotem w oryginalnym formacie — gotowy do wgrania do LMS.',
    ],
    features: [
      'Obsługa 20 języków',
      'Słownik terminologii i pamięć tłumaczeń (spójność między kursami)',
      'Praca zespołowa z podziałem ról',
      'Rozliczenie kredytowe (1 kredyt = 1000 znaków)',
      'Eksport do oryginalnego formatu (SCORM/PPTX/napisy)',
    ],
    benefits: [
      'Koszt tłumaczenia kursu spada kilkunastokrotnie',
      'Tygodnie pracy skracają się do godzin',
      'Spójna terminologia bez ręcznej korekty',
    ],
    results: [
      { label: 'Koszt tłumaczenia kursu na 8 języków', before: '1 700 zł', after: '100 zł' },
      { label: 'Oszczędność', value: '17×' },
      { label: 'Obsługiwane języki', value: '20' },
    ],
    stack: ['Claude AI', 'Supabase', 'Vanilla JS'],
  },
  {
    slug: 'meterbill',
    title: 'MeterBill — rozliczanie energii',
    category: 'SaaS',
    badge: 'Zarządcy budynków · SaaS',
    tagline: 'Automatyczne rozliczanie prądu między zarządcą a najemcami',
    flagship: false,
    problem:
      'Zarządca budynku ręcznie spisywał odczyty liczników, liczył rozliczenie w Excelu i wystawiał faktury — 8–12 godzin pracy miesięcznie na każdy budynek.',
    solution:
      'SaaS który zastępuje ręczne odczyty M-Bus, Excel i wystawianie faktur. Lokalny gateway czyta podliczniki i wysyła odczyty do chmury, a system sam dzieli koszty, generuje faktury PDF i wysyła je najemcom.',
    overview:
      'MeterBill rozwiązuje problem zarządcy, który płaci jeden zbiorczy rachunek do dystrybutora energii, a w budynku ma podliczniki M-Bus na każdy lokal. Zamiast jeździć po odczyty, liczyć podział opłat stałych w Excelu i ręcznie wystawiać faktury, zarządca dostaje gotowe rozliczenie miesięczne. System jest wielotenantowy — obsługuje wiele organizacji i budynków.',
    how: [
      'Lokalny gateway (sterownik WAGO lub konwerter IP) odczytuje podliczniki M-Bus i wysyła odczyty do chmury przez HTTPS.',
      'Backend dzieli zużycie i opłaty stałe (moc, abonament, sieć) między najemców według taryf.',
      'System generuje faktury PDF i wysyła je mailem do każdego najemcy.',
      'Zarządca śledzi płatności w panelu; najemca widzi swoje rozliczenie przez bezpieczny link.',
    ],
    features: [
      'Gateway niezależny od producenta liczników (WAGO / RPi / konwerter IP)',
      'Silnik taryfowy dzielący opłaty stałe i zmienne',
      'Automatyczne faktury PDF + wysyłka mailem',
      'Panel zarządcy i osobny portal najemcy',
      'Architektura wielotenantowa (wiele budynków i organizacji)',
    ],
    benefits: [
      'Z 8–12 godzin pracy miesięcznie zostaje kilka kliknięć',
      'Koniec z błędami ręcznego przepisywania i liczenia w Excelu',
      'Przejrzysty, audytowalny podział kosztów dla najemców',
    ],
    results: [
      { label: 'Czas rozliczenia budynku', before: '8–12 h/mc', after: 'kilka kliknięć' },
      { label: 'Koszt ręcznej obsługi (4 budynki)', before: '~640–960 zł/mc', after: 'zautomatyzowane' },
    ],
    stack: ['FastAPI', 'Supabase', 'React', 'WAGO / M-Bus', 'Docker'],
  },
  {
    slug: 'draft-generator',
    title: 'Generator kursów e-learning',
    category: 'AI',
    badge: 'Zespół szkoleniowy · AI',
    tagline: 'Z surowych materiałów do gotowego draftu kursu w Rise 360',
    flagship: false,
    problem:
      'Tworzenie kursu e-learningowego w Articulate Rise 360 było ręcznym, kosztownym procesem — od surowych prezentacji i nagrań do gotowej treści zajmowało zespołowi dni pracy.',
    solution:
      'Aplikacja webowa która przyjmuje surowe materiały (PPTX, napisy SRT/VTT) i z pomocą AI generuje gotową treść kursu w podziale na bloki Rise 360, wraz z materiałami produkcyjnymi: scenariuszami screencastów i instrukcjami warsztatowymi.',
    overview:
      'Narzędzie zbudowane dla małego zespołu szkoleniowego produkującego kursy na platformę Moodle (ok. 5000 użytkowników, 9 języków, 7 krajów). Punkt wejścia to surowe materiały, punkt wyjścia to gotowy do montażu draft kursu. AI prowadzi też wywiad merytoryczny, a zewnętrzni recenzenci mogą komentować draft bez logowania, przez link.',
    how: [
      'Wgrywasz surowe materiały: prezentacje PPTX i napisy z nagrań (SRT/VTT).',
      'AI przeprowadza wywiad merytoryczny, żeby uzupełnić kontekst kursu.',
      'System generuje treść w podziale na bloki Rise 360 + scenariusze i instrukcje.',
      'Recenzenci komentują draft przez publiczny link; po akceptacji trafia do produkcji.',
    ],
    features: [
      'Parsowanie PPTX i napisów (SRT/VTT)',
      'Wywiad merytoryczny prowadzony przez AI (czat streaming)',
      'Treść w strukturze bloków Rise 360',
      'Publiczny review draftu bez logowania (link z tokenem)',
      'Edycja inline i komentarze recenzentów',
    ],
    benefits: [
      'Produkcja kursu skraca się z dni do godzin',
      'Spójna struktura każdego kursu',
      'Recenzja merytoryczna bez zakładania kont',
    ],
    results: [
      { label: 'Od materiałów do draftu kursu', before: 'dni pracy', after: 'godziny' },
    ],
    stack: ['Next.js', 'Claude AI', 'TypeScript', 'SQLite'],
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
    overview:
      'Rozwiązanie dla kancelarii prawnej, w której obsługa korespondencji sądowej była w całości ręczna. Aplikacja analizuje skan pisma, wydobywa kluczowe dane i dopasowuje je do istniejącej sprawy, zostawiając radcy jedynie decyzję zatwierdzającą — bez przepisywania i ręcznego porządkowania plików.',
    how: [
      'Wgrywasz lub skanujesz pismo z sądu.',
      'AI rozpoznaje treść: sygnaturę sprawy, nazwę sądu i typ pisma.',
      'System dopasowuje pismo do właściwej sprawy i proponuje folder docelowy.',
      'Radca klika „Zatwierdź" — plik trafia na miejsce, dane są zapisane.',
    ],
    features: [
      'OCR i rozumienie treści pism (Document Intelligence)',
      'Automatyczne wykrywanie sygnatury, sądu i typu pisma',
      'Dopasowanie do istniejącej sprawy',
      'Zatwierdzenie jednym kliknięciem',
    ],
    benefits: [
      'Obsługa pisma skraca się do jednego kliknięcia',
      'Brak błędów ręcznego przepisywania sygnatur',
      'Porządek w plikach spraw bez ręcznej pracy',
    ],
    results: [
      { label: 'Czas obsługi pisma', before: 'kilka minut', after: '1 kliknięcie' },
    ],
    stack: ['AI OCR', 'Python', 'Document Intelligence'],
  },
  {
    slug: 'konfigurator-wago',
    title: 'Konfigurator zestawu promocyjnego',
    category: 'Automatyzacja biurowa',
    badge: 'Sprzedaż B2B · Lead generation',
    tagline: 'Interaktywny konfigurator oferty, który zbiera leady do CRM',
    flagship: false,
    problem:
      'Przygotowanie spersonalizowanej oferty promocyjnej dla klienta wymagało ręcznego składania zestawu i liczenia rabatów, a kontakt do zainteresowanego klienta często ginął.',
    solution:
      'Jednostronicowy konfigurator, który klient sam wypełnia — buduje zestaw w dwuetapowym koszyku z rabatami, widzi cenę na żywo, a na końcu jego dane trafiają prosto do formularza HubSpot jako lead.',
    overview:
      'Lekkie narzędzie sprzedażowe do osadzenia jako iframe na stronie lub wysłania klientowi jako link. Klient samodzielnie konfiguruje zestaw promocyjny modułów, system na bieżąco liczy cenę z rabatami (−50% / −25% w zależności od koszyka), a podsumowanie z danymi kontaktowymi przekazywane jest do HubSpot — handlowiec dostaje gotowy, skwalifikowany lead.',
    how: [
      'Klient otwiera konfigurator (link lub iframe na stronie).',
      'Składa zestaw w dwóch krokach — koszyk obowiązkowy i dodatkowy, z różnymi rabatami.',
      'Boczny panel pokazuje cenę i skład zestawu na żywo.',
      'Po wypełnieniu danych kontaktowych lead trafia automatycznie do HubSpot.',
    ],
    features: [
      'Dwuetapowy koszyk z automatycznymi rabatami',
      'Podsumowanie ceny na żywo (desktop i mobile)',
      'Integracja z HubSpot (lead prosto do CRM)',
      'Bez zależności i builda — jeden plik do osadzenia',
      'Responsywny, gotowy do iframe',
    ],
    benefits: [
      'Klient sam konfiguruje ofertę — zero pracy handlowca po stronie wyceny',
      'Każde zainteresowanie zamienia się w lead w CRM',
      'Spójne, bezbłędne liczenie rabatów',
    ],
    results: [
      { label: 'Wycena zestawu', before: 'ręcznie', after: 'samoobsługa klienta' },
      { label: 'Kontakt zainteresowanego', before: 'gubił się', after: 'lead w HubSpot' },
    ],
    stack: ['JavaScript', 'HubSpot', 'HTML/CSS'],
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
    overview:
      'Mała automatyzacja o dużym wpływie na codzienną pracę kancelarii. Zamiast przełączać się między Wordem a osobnym programem DYMO i ręcznie przepisywać adres, radca zaznacza go w dokumencie i drukuje etykietę jednym kliknięciem — bezpośrednio z poziomu edytora.',
    how: [
      'Radca zaznacza adres w dokumencie Word.',
      'Klika przycisk dodany do wstążki Worda.',
      'Add-in przekazuje adres do drukarki DYMO.',
      'Etykieta drukuje się — bez otwierania żadnego dodatkowego programu.',
    ],
    features: [
      'Przycisk wbudowany we wstążkę Microsoft Word',
      'Druk z zaznaczonego tekstu, bez przepisywania',
      'Bezpośrednia integracja z drukarką DYMO',
      'Zero przełączania między programami',
    ],
    benefits: [
      'Druk etykiety skraca się z minut do sekundy',
      'Brak błędów przepisywania adresu',
      'Praca bez wychodzenia z Worda',
    ],
    results: [
      { label: 'Czas drukowania etykiety', before: 'kilka minut', after: '1 sekunda' },
    ],
    stack: ['VBA', 'Word Add-in', 'DYMO SDK'],
  },
]

export const categories = ['Wszystkie', 'SaaS', 'AI', 'Automatyzacja biurowa']
