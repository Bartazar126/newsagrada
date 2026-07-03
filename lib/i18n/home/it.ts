import type { HomeCopy } from './types'

export const it: HomeCopy = {
  header: {
    nav: {
      tickets: 'Biglietti',
      tours: 'Tour guidate',
      experience: 'L\'esperienza',
      blog: 'Blog',
      faq: 'FAQ',
    },
    bookTicket: 'Prenota un biglietto',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
    homepageAria: 'Homepage SagradaTickets',
  },
  hero: {
    badge: 'Cuore di Barcellona · L\'eredità di Gaudí · La tua esperienza',
    title: 'Scopri la Sagrada Família senza fare la fila',
    subtitle:
      'Prenota biglietti d\'ingresso e tour guidati al capolavoro di Gaudí. Conferma istantanea, biglietti mobili e fascia oraria garantita — in pochi clic.',
    ctaStart: 'Inizia la prenotazione',
    ctaTickets: 'Vedi tipi di biglietto',
    highlights: ['Accesso prioritario', 'Conferma istantanea', 'Cancellazione gratuita'],
    imageAlt:
      'Le torri della basilica della Sagrada Família al tramonto a Barcellona',
  },
  trust: {
    items: [
      { title: 'Accesso prioritario', desc: 'Ingresso alla tua fascia oraria' },
      { title: 'Biglietto mobile', desc: 'Nessuna stampa necessaria' },
      { title: 'Cancellazione gratuita', desc: 'Fino a 24 ore prima' },
      { title: 'Assistenza clienti', desc: 'Ogni giorno della settimana' },
    ],
  },
  tickets: {
    sectionLabel: 'Tipi di biglietto',
    title: 'Scegli l\'esperienza più adatta a te',
    subtitle:
      'Ogni biglietto include ingresso salta-fila e conferma mobile istantanea. Nessun costo nascosto.',
    perPerson: '/ persona',
    bookFrom: 'Prenota da {price} €',
    tiers: {
      basic: {
        name: 'Ingresso base',
        tagline: 'Ingresso salta-fila',
        duration: 'Circa 1–1,5 ore',
        features: [
          'Ingresso rapido (salta-fila)',
          'Visita autoguidata della basilica',
          'App audioguida gratuita in 16 lingue',
          'Biglietto mobile — nessuna stampa richiesta',
        ],
      },
      towers: {
        name: 'Ingresso + Torri',
        tagline: 'La scelta più popolare',
        duration: 'Circa 2 ore',
        badge: 'Più popolare',
        features: [
          'Tutto ciò che è incluso nell\'Ingresso base',
          'Salita alla torre della Passione o della Natività',
          'Panorama mozzafiato su Barcellona',
          'Selezione flessibile della fascia oraria',
          'Cancellazione gratuita fino a 24 ore prima',
        ],
      },
      guided: {
        name: 'Esperienza guidata',
        tagline: 'Con guida esperta',
        duration: 'Circa 1,5 ore',
        badge: 'Premium',
        features: [
          'Tutto ciò che è incluso nell\'Ingresso base',
          'Guida dal vivo in inglese o spagnolo',
          'I segreti di Gaudí e la storia della basilica',
          'Gruppo ristretto (max. 20 persone)',
          'Domande e risposte durante tutto il tour',
        ],
      },
    },
  },
  experience: {
    label: 'L\'esperienza',
    title: 'Il capolavoro incompiuto di Gaudí che toglie il fiato',
    body:
      'La Sagrada Família non è solo una chiesa — è una sinfonia vivente di pietra e luce. Camminare tra colonne simili ad alberi è come trovarsi in una foresta dove le vetrate colorate dipingono le pareti con i colori dell\'arcobaleno. In costruzione da oltre 140 anni, resta una delle meraviglie architettoniche più straordinarie al mondo.',
    imageAlts: [
      'Le colonne simili ad alberi e le vetrate colorate all\'interno della Sagrada Família',
      'Luce colorata che filtra attraverso le vetrate',
    ],
    stats: [
      { value: '1882', label: 'Inizio della costruzione' },
      { value: '172 m', label: 'Altezza prevista della torre più alta' },
      { value: '18', label: 'Torri nella basilica completata' },
      { value: '4,5 M+', label: 'Visitatori annuali' },
    ],
  },
  tours: {
    sectionLabel: 'Tour guidate',
    title: 'Visite trasformate in esperienze',
    subtitle:
      'Con guide locali esperte in piccoli gruppi. Raccontiamo la storia del genio di Gaudí così non vedrai solo la meraviglia — la capirai.',
    fromPrice: 'da {price} €',
    chooseTime: 'Scegli una fascia oraria',
    tours: {
      'skip-guided': {
        name: 'Tour premium Sagrada Família',
        description:
          'Scopri il capolavoro incompiuto di Gaudí con una guida locale appassionata che dà vita a ogni dettaglio della basilica.',
        duration: '1,5 ore',
        groupSize: 'Max. 20 persone',
      },
      'towers-tour': {
        name: 'Tour Torri & Panorama',
        description:
          'Sali sulle torri mozzafiato e ammira Barcellona dall\'alto scoprendo il simbolismo delle guglie.',
        duration: '2 ore',
        groupSize: 'Max. 15 persone',
      },
      'gaudi-full': {
        name: 'Gaudí Barcellona giornata intera',
        description:
          'Sagrada Família, Park Güell e Casa Batlló in un solo giorno — un tour completo del modernismo catalano in un\'esperienza esclusiva.',
        duration: '6 ore',
        groupSize: 'Max. 12 persone',
      },
    },
  },
  booking: {
    sectionLabel: 'Prenotazione',
    title: 'Prenota il tuo biglietto in pochi semplici passi',
    subtitle:
      'Scegli il tipo di biglietto, la data e la dimensione del gruppo — calcoliamo il prezzo in tempo reale. Conferma istantanea, prenotazione sicura.',
    monthNames: [
      'Gennaio',
      'Febbraio',
      'Marzo',
      'Aprile',
      'Maggio',
      'Giugno',
      'Luglio',
      'Agosto',
      'Settembre',
      'Ottobre',
      'Novembre',
      'Dicembre',
    ],
    weekdayNames: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    steps: {
      ticket: 'Scegli il tipo di biglietto',
      dateTime: 'Scegli data e ora',
      guests: 'Quanti visitatori?',
      details: 'Inserisci i tuoi dati',
    },
    perPerson: '/ persona',
    availableTimeSlots: 'Fasce orarie disponibili',
    selectDateFirst: 'Seleziona prima una data',
    selectDateOnCalendar: 'Seleziona una data nel calendario',
    guestTypes: {
      adult: { label: 'Adulto', hint: 'Da 13 anni in su' },
      child: { label: 'Bambino', hint: '3–12 anni · {price} €' },
    },
    fields: {
      fullName: 'Nome completo',
      email: 'Indirizzo email',
      confirmEmail: 'Conferma indirizzo email',
      phone: 'Numero di telefono',
    },
    placeholders: {
      fullName: 'Giulia Rossi',
      email: 'giulia@esempio.it',
      phone: '+39 333 123 4567',
    },
    summary: {
      title: 'Riepilogo prenotazione',
      ticketType: 'Tipo di biglietto',
      date: 'Data',
      time: 'Ora',
      guests: 'Visitatori',
      amountPaid: 'Importo pagato',
      adultLine: 'Adulto × {count}',
      childLine: 'Bambino × {count}',
      bookingFee: 'Commissione di prenotazione',
      totalDue: 'Totale dovuto',
      selectGuests: 'Seleziona il numero di visitatori',
      emptyValue: '—',
    },
    confirm: 'Conferma prenotazione',
    continue: 'Continua',
    cancellationNote: 'Cancellazione gratuita fino a 24 ore prima della visita',
    decreaseAria: 'Diminuisci {label}',
    increaseAria: 'Aumenta {label}',
    errors: {
      emailMismatch: 'Gli indirizzi email non corrispondono.',
    },
    confirmed: {
      title: 'Prenotazione confermata!',
      body:
        'Grazie, {firstName}! Il tuo biglietto mobile è stato inviato a {email}. Ci vediamo il {date} alle {time}.',
      newBooking: 'Nuova prenotazione',
    },
    calendar: {
      previousMonth: 'Mese precedente',
      nextMonth: 'Mese successivo',
    },
  },
  blog: {
    magazine: 'Magazine',
    title: 'Consigli, storie e guide di viaggio',
    subtitle: 'Informazioni utili e ispirazione per la visita perfetta a Barcellona.',
    allArticles: 'Tutti gli articoli',
    readMore: 'Leggi di più',
  },
  faq: {
    label: 'FAQ',
    title: 'Domande frequenti',
    faqs: [
      {
        q: 'Devo davvero non fare la fila?',
        a: 'Esatto! Ogni biglietto include ingresso rapido salta-fila. Mostra semplicemente il tuo biglietto mobile all\'ingresso all\'orario prenotato.',
      },
      {
        q: 'Quando riceverò il mio biglietto?',
        a: 'Subito dopo il pagamento. Inviamo il biglietto mobile via email e puoi accedervi in qualsiasi momento. Nessuna stampa richiesta.',
      },
      {
        q: 'Posso cancellare o modificare la mia prenotazione?',
        a: 'Sì. Puoi cancellare o riprogrammare la maggior parte dei tipi di biglietto gratuitamente fino a 24 ore prima della visita. I termini esatti sono inclusi nell\'email di conferma.',
      },
      {
        q: 'C\'è uno sconto per i bambini?',
        a: 'Offriamo biglietti scontati per bambini dai 3 ai 12 anni, e i bambini sotto i 3 anni entrano gratis. Il prezzo bambino appare automaticamente durante la prenotazione.',
      },
      {
        q: 'In quali lingue sono disponibili i tour guidati?',
        a: 'I nostri tour guidati sono disponibili in inglese, spagnolo e francese. Puoi selezionare la lingua preferita durante la prenotazione.',
      },
      {
        q: 'Si possono salire le torri?',
        a: 'Sì, con il biglietto "Ingresso + Torri" o il tour delle torri puoi salire in ascensore alla torre della Passione o della Natività, con un panorama incomparabile su Barcellona.',
      },
    ],
  },
  footer: {
    tagline:
      'Prenota biglietti e tour guidati per la Sagrada Família in pochi minuti. Checkout sicuro, biglietti mobili e assistenza clienti ogni giorno della settimana.',
    columns: {
      tickets: 'Biglietti',
      tours: 'Tour guidate',
      information: 'Informazioni',
    },
    ticketLinks: {
      basic: 'Ingresso base',
      towers: 'Ingresso + Torri',
      guided: 'Esperienza guidata',
    },
    tourLinks: {
      premiumTour: 'Tour premium',
      towersPanorama: 'Torri & Panorama',
      gaudiFullDay: 'Gaudí giornata intera',
      groupBooking: 'Prenotazione di gruppo',
    },
    infoLinks: {
      faq: 'FAQ',
      cancellationPolicy: 'Politica di cancellazione',
      privacyPolicy: 'Informativa sulla privacy',
      termsOfService: 'Termini di servizio',
      contact: 'Contatti',
    },
    importantNotice: 'Avviso importante',
    disclaimer:
      'SagradaTickets.com è di proprietà e gestito da VALOR TOUR LLC, una società a responsabilità limitata del Delaware con EIN 30-1486586, che opera con il marchio Valor Tours. Non siamo la biglietteria ufficiale della Sagrada Familia, l\'amministrazione della Sagrada o alcuna autorità dell\'attrazione. Siamo un servizio di viaggio indipendente e rivenditore/intermediario di biglietti specializzato in biglietti, esperienze e tour. I prezzi possono essere superiori al valore nominale e includono servizio, gestione delle prenotazioni e assistenza clienti.',
    rights: '© {year} SagradaTickets. Tutti i diritti riservati.',
    privacy: 'Informativa sulla privacy',
    terms: 'Termini di servizio',
    cookies: 'Cookie',
  },
}
