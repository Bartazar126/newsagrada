import type { HomeCopy } from './types'

export const de: HomeCopy = {
  header: {
    nav: {
      tickets: 'Tickets',
      tours: 'Führungen',
      experience: 'Das Erlebnis',
      blog: 'Blog',
      faq: 'FAQ',
    },
    bookTicket: 'Ticket buchen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    homepageAria: 'SagradaTickets Startseite',
  },
  hero: {
    badge: 'Herz Barcelonas · Gaudís Vermächtnis · Ihr Erlebnis',
    title: 'Entdecken Sie die Sagrada Família ohne anzustehen',
    subtitle:
      'Buchen Sie Eintrittskarten und Führungen zu Gaudís beeindruckendem Meisterwerk. Sofortige Bestätigung, mobile Tickets und garantierter Zeitslot — in wenigen Klicks.',
    ctaStart: 'Buchung starten',
    ctaTickets: 'Ticketarten ansehen',
    highlights: ['Bevorzugter Zugang', 'Sofortige Bestätigung', 'Kostenlose Stornierung'],
    imageAlt:
      'Die Türme der Basilika Sagrada Família bei Sonnenuntergang in Barcelona',
  },
  trust: {
    items: [
      { title: 'Bevorzugter Zugang', desc: 'Eintritt zu Ihrem gebuchten Slot' },
      { title: 'Mobiles Ticket', desc: 'Kein Ausdruck nötig' },
      { title: 'Kostenlose Stornierung', desc: 'Bis 24 Stunden vorher' },
      { title: 'Kundenservice', desc: 'Jeden Tag der Woche' },
    ],
  },
  tickets: {
    sectionLabel: 'Ticketarten',
    title: 'Wählen Sie das passende Erlebnis',
    subtitle:
      'Jedes Ticket beinhaltet Eintritt ohne Anstehen und sofortige mobile Bestätigung. Keine versteckten Gebühren.',
    perPerson: '/ Person',
    bookFrom: 'Buchen ab {price} €',
    tiers: {
      basic: {
        name: 'Basiseintritt',
        tagline: 'Eintritt ohne Anstehen',
        duration: 'Ca. 1–1,5 Stunden',
        features: [
          'Schnelleinlass (ohne Anstehen)',
          'Selbstgeführter Besuch der Basilika',
          'Kostenlose Audioguide-App in 16 Sprachen',
          'Mobiles Ticket — kein Ausdruck erforderlich',
        ],
      },
      towers: {
        name: 'Eintritt + Türme',
        tagline: 'Die beliebteste Wahl',
        duration: 'Ca. 2 Stunden',
        badge: 'Am beliebtesten',
        features: [
          'Alles aus dem Basiseintritt',
          'Aufstieg zum Leidens- oder Geburtsturm',
          'Atemberaubendes Panorama über Barcelona',
          'Flexible Zeitslot-Auswahl',
          'Kostenlose Stornierung bis 24 Stunden vorher',
        ],
      },
      guided: {
        name: 'Geführte Tour',
        tagline: 'Mit erfahrenem Reiseführer',
        duration: 'Ca. 1,5 Stunden',
        badge: 'Premium',
        features: [
          'Alles aus dem Basiseintritt',
          'Live-Guide auf Englisch oder Spanisch',
          'Gaudís Geheimnisse und die Geschichte der Basilika',
          'Kleine Gruppe (max. 20 Personen)',
          'Fragen und Antworten während der gesamten Tour',
        ],
      },
    },
  },
  experience: {
    label: 'Das Erlebnis',
    title: 'Gaudís unvollendetes Meisterwerk, das den Atem raubt',
    body:
      'Die Sagrada Família ist nicht nur eine Kirche — sie ist eine lebendige Symphonie aus Stein und Licht. Zwischen baumartigen Säulen zu gehen fühlt sich an wie in einem Wald, in dem Buntglasfenster die Wände in Regenbogenfarben tauchen. Seit über 140 Jahren im Bau, bleibt sie eines der atemberaubendsten architektonischen Wunder der Welt.',
    imageAlts: [
      'Die baumartigen Säulen und Buntglasfenster im Inneren der Sagrada Família',
      'Farbiges Licht, das durch die Buntglasfenster strömt',
    ],
    stats: [
      { value: '1882', label: 'Baubeginn' },
      { value: '172 m', label: 'Geplante Höhe des höchsten Turms' },
      { value: '18', label: 'Türme in der fertigen Basilika' },
      { value: '4,5 M+', label: 'Besucher pro Jahr' },
    ],
  },
  tours: {
    sectionLabel: 'Geführte Touren',
    title: 'Besuche, die zu Erlebnissen werden',
    subtitle:
      'Mit lokalen Expertenführern in kleinen Gruppen. Wir erzählen die Geschichte von Gaudís Genie, damit Sie das Wunder nicht nur sehen — sondern verstehen.',
    fromPrice: 'ab {price} €',
    chooseTime: 'Zeitslot wählen',
    tours: {
      'skip-guided': {
        name: 'Sagrada Família Premium-Tour',
        description:
          'Entdecken Sie Gaudís unvollendetes Meisterwerk mit einem leidenschaftlichen lokalen Guide, der jedes Detail der Basilika zum Leben erweckt.',
        duration: '1,5 Stunden',
        groupSize: 'Max. 20 Personen',
      },
      'towers-tour': {
        name: 'Türme & Panorama-Tour',
        description:
          'Besteigen Sie die atemberaubenden Türme und bewundern Sie Barcelona aus der Vogelperspektive, während Sie die Symbolik der Türme kennenlernen.',
        duration: '2 Stunden',
        groupSize: 'Max. 15 Personen',
      },
      'gaudi-full': {
        name: 'Gaudí Barcelona Ganztages-Tour',
        description:
          'Sagrada Família, Park Güell und Casa Batlló an einem Tag — eine komplette Tour des katalanischen Modernismus in einem exklusiven Erlebnis.',
        duration: '6 Stunden',
        groupSize: 'Max. 12 Personen',
      },
    },
  },
  booking: {
    sectionLabel: 'Buchung',
    title: 'Buchen Sie Ihr Ticket in wenigen einfachen Schritten',
    subtitle:
      'Wählen Sie Ticketart, Datum und Gruppengröße — wir berechnen den Preis in Echtzeit. Sofortige Bestätigung, sichere Buchung.',
    monthNames: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    weekdayNames: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    steps: {
      ticket: 'Wählen Sie Ihre Ticketart',
      dateTime: 'Datum und Uhrzeit wählen',
      guests: 'Wie viele Besucher?',
      details: 'Geben Sie Ihre Daten ein',
    },
    perPerson: '/ Person',
    availableTimeSlots: 'Verfügbare Zeitslots',
    selectDateFirst: 'Wählen Sie zuerst ein Datum',
    selectDateOnCalendar: 'Wählen Sie ein Datum im Kalender',
    guestTypes: {
      adult: { label: 'Erwachsener', hint: 'Ab 13 Jahren' },
      child: { label: 'Kind', hint: '3–12 Jahre · {price} €' },
    },
    fields: {
      fullName: 'Vollständiger Name',
      email: 'E-Mail-Adresse',
      confirmEmail: 'E-Mail-Adresse bestätigen',
      phone: 'Telefonnummer',
    },
    placeholders: {
      fullName: 'Anna Müller',
      email: 'anna@beispiel.de',
      phone: '+49 170 123 4567',
    },
    summary: {
      title: 'Buchungsübersicht',
      ticketType: 'Ticketart',
      date: 'Datum',
      time: 'Uhrzeit',
      guests: 'Besucher',
      amountPaid: 'Bezahlter Betrag',
      adultLine: 'Erwachsener × {count}',
      childLine: 'Kind × {count}',
      bookingFee: 'Buchungsgebühr',
      totalDue: 'Gesamtbetrag',
      selectGuests: 'Anzahl der Besucher wählen',
      emptyValue: '—',
    },
    confirm: 'Buchung bestätigen',
    continue: 'Weiter',
    cancellationNote: 'Kostenlose Stornierung bis 24 Stunden vor Ihrem Besuch',
    decreaseAria: '{label} verringern',
    increaseAria: '{label} erhöhen',
    errors: {
      emailMismatch: 'Die E-Mail-Adressen stimmen nicht überein.',
    },
    confirmed: {
      title: 'Buchung bestätigt!',
      body:
        'Vielen Dank, {firstName}! Ihr mobiles Ticket wurde an {email} gesendet. Wir sehen uns am {date} um {time}.',
      newBooking: 'Neue Buchung',
    },
    calendar: {
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
    },
  },
  blog: {
    magazine: 'Magazin',
    title: 'Tipps, Geschichten & Reiseführer',
    subtitle: 'Nützliche Einblicke und Inspiration für den perfekten Barcelona-Besuch.',
    allArticles: 'Alle Artikel',
    readMore: 'Weiterlesen',
  },
  faq: {
    label: 'FAQ',
    title: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Muss ich wirklich nicht anstehen?',
        a: 'Genau! Jedes Ticket beinhaltet schnellen Eintritt ohne Anstehen. Zeigen Sie einfach Ihr mobiles Ticket am Eingang zu Ihrer gebuchten Zeit.',
      },
      {
        q: 'Wann erhalte ich mein Ticket?',
        a: 'Sofort nach der Zahlung. Wir senden das mobile Ticket per E-Mail, und Sie können jederzeit darauf zugreifen. Kein Ausdruck erforderlich.',
      },
      {
        q: 'Kann ich meine Buchung stornieren oder ändern?',
        a: 'Ja. Sie können die meisten Ticketarten bis 24 Stunden vor Ihrem Besuch kostenlos stornieren oder umbuchen. Die genauen Bedingungen finden Sie in Ihrer Bestätigungs-E-Mail.',
      },
      {
        q: 'Gibt es Ermäßigungen für Kinder?',
        a: 'Wir bieten ermäßigte Tickets für Kinder von 3 bis 12 Jahren an, und Kinder unter 3 Jahren haben freien Eintritt. Der Kinderpreis erscheint automatisch bei der Buchung.',
      },
      {
        q: 'In welchen Sprachen sind Führungen verfügbar?',
        a: 'Unsere Führungen sind auf Englisch, Spanisch und Französisch verfügbar. Sie können Ihre bevorzugte Sprache bei der Buchung auswählen.',
      },
      {
        q: 'Kann man die Türme besteigen?',
        a: 'Ja, mit dem Ticket „Eintritt + Türme" oder der Turm-Tour können Sie mit dem Aufzug zum Leidens- oder Geburtsturm fahren — mit einem unvergleichlichen Panorama über Barcelona.',
      },
    ],
  },
  footer: {
    tagline:
      'Buchen Sie Tickets und Führungen für die Sagrada Família in Minuten. Sicherer Checkout, mobile Tickets und Kundenservice jeden Tag der Woche.',
    columns: {
      tickets: 'Tickets',
      tours: 'Führungen',
      information: 'Informationen',
    },
    ticketLinks: {
      basic: 'Basiseintritt',
      towers: 'Eintritt + Türme',
      guided: 'Geführte Tour',
    },
    tourLinks: {
      premiumTour: 'Premium-Tour',
      towersPanorama: 'Türme & Panorama',
      gaudiFullDay: 'Gaudí Ganztages-Tour',
      groupBooking: 'Gruppenbuchung',
    },
    infoLinks: {
      faq: 'FAQ',
      cancellationPolicy: 'Stornierungsbedingungen',
      privacyPolicy: 'Datenschutzerklärung',
      termsOfService: 'Nutzungsbedingungen',
      contact: 'Kontakt',
    },
    importantNotice: 'Wichtiger Hinweis',
    disclaimer:
      'SagradaTickets.com ist Eigentum von und wird betrieben durch VALOR TOUR LLC, eine Limited Liability Company in Delaware mit EIN 30-1486586, die unter der Marke Valor Tours operiert. Wir sind nicht die offizielle Ticketstelle der Sagrada Familia, der Sagrada-Verwaltung oder einer Attraktionsbehörde. Wir sind ein unabhängiger Reisedienst und Ticket-Wiederverkäufer/Vermittler, spezialisiert auf Tickets, Erlebnisse und Touren. Preise können über dem Nennwert liegen und beinhalten Service, Buchungsverwaltung und Kundenservice.',
    rights: '© {year} SagradaTickets. Alle Rechte vorbehalten.',
    privacy: 'Datenschutzerklärung',
    terms: 'Nutzungsbedingungen',
    cookies: 'Cookies',
  },
}
