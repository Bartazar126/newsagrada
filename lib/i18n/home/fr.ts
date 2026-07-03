import type { HomeCopy } from './types'

export const fr: HomeCopy = {
  header: {
    nav: {
      tickets: 'Billets',
      tours: 'Visites guidées',
      experience: 'L\'expérience',
      blog: 'Blog',
      faq: 'FAQ',
    },
    bookTicket: 'Réserver un billet',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    homepageAria: 'Page d\'accueil SagradaTickets',
  },
  hero: {
    badge: 'Cœur de Barcelone · L\'héritage de Gaudí · Votre expérience',
    title: 'Découvrez la Sagrada Família sans faire la queue',
    subtitle:
      'Réservez des billets d\'entrée et des visites guidées du chef-d\'œuvre de Gaudí. Confirmation instantanée, billets mobiles et créneau horaire garanti — en quelques clics.',
    ctaStart: 'Commencer la réservation',
    ctaTickets: 'Voir les types de billets',
    highlights: ['Accès prioritaire', 'Confirmation instantanée', 'Annulation gratuite'],
    imageAlt:
      'Les tours de la basilique de la Sagrada Família au coucher du soleil à Barcelone',
  },
  trust: {
    items: [
      { title: 'Accès prioritaire', desc: 'Entrée à votre créneau horaire' },
      { title: 'Billet mobile', desc: 'Aucune impression nécessaire' },
      { title: 'Annulation gratuite', desc: 'Jusqu\'à 24 heures avant' },
      { title: 'Service client', desc: 'Tous les jours de la semaine' },
    ],
  },
  tickets: {
    sectionLabel: 'Types de billets',
    title: 'Choisissez l\'expérience qui vous convient',
    subtitle:
      'Chaque billet inclut l\'entrée coupe-file et une confirmation mobile instantanée. Aucun frais caché.',
    perPerson: '/ personne',
    bookFrom: 'Réserver à partir de {price} €',
    tiers: {
      basic: {
        name: 'Entrée de base',
        tagline: 'Admission coupe-file',
        duration: 'Environ 1 à 1,5 heure',
        features: [
          'Entrée rapide (coupe-file)',
          'Visite autonome de la basilique',
          'Application audioguide gratuite en 16 langues',
          'Billet mobile — aucune impression requise',
        ],
      },
      towers: {
        name: 'Entrée + Tours',
        tagline: 'Le choix le plus populaire',
        duration: 'Environ 2 heures',
        badge: 'Le plus populaire',
        features: [
          'Tout ce qui est inclus dans l\'Entrée de base',
          'Montée à la tour de la Passion ou de la Nativité',
          'Panorama époustouflant sur Barcelone',
          'Sélection flexible du créneau horaire',
          'Annulation gratuite jusqu\'à 24 heures avant',
        ],
      },
      guided: {
        name: 'Expérience guidée',
        tagline: 'Avec un guide expert',
        duration: 'Environ 1,5 heure',
        badge: 'Premium',
        features: [
          'Tout ce qui est inclus dans l\'Entrée de base',
          'Guide en direct en anglais ou espagnol',
          'Les secrets de Gaudí et l\'histoire de la basilique',
          'Petit groupe (max. 20 personnes)',
          'Questions-réponses tout au long de la visite',
        ],
      },
    },
  },
  experience: {
    label: 'L\'expérience',
    title: 'Le chef-d\'œuvre inachevé de Gaudí qui vous coupe le souffle',
    body:
      'La Sagrada Família n\'est pas qu\'une église — c\'est une symphonie vivante de pierre et de lumière. Marcher parmi les colonnes en forme d\'arbres, c\'est comme se trouver dans une forêt où les vitraux peignent les murs de couleurs arc-en-ciel. En construction depuis plus de 140 ans, elle reste l\'une des merveilles architecturales les plus saisissantes au monde.',
    imageAlts: [
      'Les colonnes en forme d\'arbres et les vitraux à l\'intérieur de la Sagrada Família',
      'Lumière colorée traversant les vitraux',
    ],
    stats: [
      { value: '1882', label: 'Début de la construction' },
      { value: '172 m', label: 'Hauteur prévue de la tour la plus haute' },
      { value: '18', label: 'Tours dans la basilique achevée' },
      { value: '4,5 M+', label: 'Visiteurs par an' },
    ],
  },
  tours: {
    sectionLabel: 'Visites guidées',
    title: 'Des visites transformées en expériences',
    subtitle:
      'Avec des guides locaux experts en petits groupes. Nous racontons l\'histoire du génie de Gaudí pour que vous ne fassiez pas que voir la merveille — vous la compreniez.',
    fromPrice: 'à partir de {price} €',
    chooseTime: 'Choisir un créneau horaire',
    tours: {
      'skip-guided': {
        name: 'Visite premium Sagrada Família',
        description:
          'Découvrez le chef-d\'œuvre inachevé de Gaudí avec un guide local passionné qui donne vie à chaque détail de la basilique.',
        duration: '1,5 heure',
        groupSize: 'Max. 20 personnes',
      },
      'towers-tour': {
        name: 'Visite Tours & Panorama',
        description:
          'Montez dans les tours vertigineuses et admirez Barcelone vue du ciel tout en découvrant le symbolisme des flèches.',
        duration: '2 heures',
        groupSize: 'Max. 15 personnes',
      },
      'gaudi-full': {
        name: 'Gaudí Barcelone journée complète',
        description:
          'Sagrada Família, Park Güell et Casa Batlló en une seule journée — un parcours complet du modernisme catalan en une expérience exclusive.',
        duration: '6 heures',
        groupSize: 'Max. 12 personnes',
      },
    },
  },
  booking: {
    sectionLabel: 'Réservation',
    title: 'Réservez votre billet en quelques étapes simples',
    subtitle:
      'Choisissez votre type de billet, la date et la taille du groupe — nous calculons le prix en temps réel. Confirmation instantanée, réservation sécurisée.',
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    weekdayNames: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    steps: {
      ticket: 'Choisissez votre type de billet',
      dateTime: 'Choisissez une date et une heure',
      guests: 'Combien de visiteurs ?',
      details: 'Saisissez vos coordonnées',
    },
    perPerson: '/ personne',
    availableTimeSlots: 'Créneaux horaires disponibles',
    selectDateFirst: 'Sélectionnez d\'abord une date',
    selectDateOnCalendar: 'Sélectionnez une date dans le calendrier',
    guestTypes: {
      adult: { label: 'Adulte', hint: '13 ans et plus' },
      child: { label: 'Enfant', hint: '3 à 12 ans · {price} €' },
    },
    fields: {
      fullName: 'Nom complet',
      email: 'Adresse e-mail',
      confirmEmail: 'Confirmer l\'adresse e-mail',
      phone: 'Numéro de téléphone',
    },
    placeholders: {
      fullName: 'Marie Dupont',
      email: 'marie@exemple.com',
      phone: '+33 6 12 34 56 78',
    },
    summary: {
      title: 'Récapitulatif de la réservation',
      ticketType: 'Type de billet',
      date: 'Date',
      time: 'Heure',
      guests: 'Visiteurs',
      amountPaid: 'Montant payé',
      adultLine: 'Adulte × {count}',
      childLine: 'Enfant × {count}',
      bookingFee: 'Frais de réservation',
      totalDue: 'Total à payer',
      selectGuests: 'Sélectionnez le nombre de visiteurs',
      emptyValue: '—',
    },
    confirm: 'Confirmer la réservation',
    continue: 'Continuer',
    cancellationNote: 'Annulation gratuite jusqu\'à 24 heures avant votre visite',
    decreaseAria: 'Diminuer {label}',
    increaseAria: 'Augmenter {label}',
    errors: {
      emailMismatch: 'Les adresses e-mail ne correspondent pas.',
    },
    confirmed: {
      title: 'Réservation confirmée !',
      body:
        'Merci, {firstName} ! Votre billet mobile a été envoyé à {email}. Rendez-vous le {date} à {time}.',
      newBooking: 'Nouvelle réservation',
    },
    calendar: {
      previousMonth: 'Mois précédent',
      nextMonth: 'Mois suivant',
    },
  },
  blog: {
    magazine: 'Magazine',
    title: 'Conseils, récits et guides de voyage',
    subtitle: 'Informations utiles et inspiration pour la visite parfaite de Barcelone.',
    allArticles: 'Tous les articles',
    readMore: 'Lire la suite',
  },
  faq: {
    label: 'FAQ',
    title: 'Questions fréquemment posées',
    faqs: [
      {
        q: 'Est-ce que je n\'ai vraiment pas à faire la queue ?',
        a: 'Exactement ! Chaque billet inclut une entrée rapide coupe-file. Présentez simplement votre billet mobile à l\'entrée à l\'heure réservée.',
      },
      {
        q: 'Quand recevrai-je mon billet ?',
        a: 'Immédiatement après le paiement. Nous envoyons le billet mobile par e-mail, et vous pouvez y accéder à tout moment. Aucune impression requise.',
      },
      {
        q: 'Puis-je annuler ou modifier ma réservation ?',
        a: 'Oui. Vous pouvez annuler ou reprogrammer la plupart des types de billets gratuitement jusqu\'à 24 heures avant votre visite. Les conditions exactes figurent dans votre e-mail de confirmation.',
      },
      {
        q: 'Y a-t-il une réduction pour les enfants ?',
        a: 'Nous proposons des billets à tarif réduit pour les enfants de 3 à 12 ans, et les moins de 3 ans entrent gratuitement. Le tarif enfant apparaît automatiquement lors de la réservation.',
      },
      {
        q: 'Dans quelles langues les visites guidées sont-elles disponibles ?',
        a: 'Nos visites guidées sont disponibles en anglais, espagnol et français. Vous pouvez sélectionner votre langue préférée lors de la réservation.',
      },
      {
        q: 'Peut-on monter dans les tours ?',
        a: 'Oui, avec le billet « Entrée + Tours » ou la visite des tours, vous pouvez prendre l\'ascenseur jusqu\'à la tour de la Passion ou de la Nativité, avec un panorama incomparable sur Barcelone.',
      },
    ],
  },
  footer: {
    tagline:
      'Réservez des billets et des visites guidées pour la Sagrada Família en quelques minutes. Paiement sécurisé, billets mobiles et service client tous les jours de la semaine.',
    columns: {
      tickets: 'Billets',
      tours: 'Visites guidées',
      information: 'Informations',
    },
    ticketLinks: {
      basic: 'Entrée de base',
      towers: 'Entrée + Tours',
      guided: 'Expérience guidée',
    },
    tourLinks: {
      premiumTour: 'Visite premium',
      towersPanorama: 'Tours & Panorama',
      gaudiFullDay: 'Gaudí journée complète',
      groupBooking: 'Réservation de groupe',
    },
    infoLinks: {
      faq: 'FAQ',
      cancellationPolicy: 'Politique d\'annulation',
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: 'Conditions d\'utilisation',
      contact: 'Contact',
    },
    importantNotice: 'Avis important',
    disclaimer:
      'SagradaTickets.com est la propriété de et est exploité par VALOR TOUR LLC, une société à responsabilité limitée du Delaware avec EIN 30-1486586, opérant sous la marque Valor Tours. Nous ne sommes pas la billetterie officielle de la Sagrada Familia, l\'administration de la Sagrada ni aucune autorité de l\'attraction. Nous sommes un service de voyage indépendant et revendeur/intermédiaire de billets spécialisé dans les billets, expériences et visites. Les prix peuvent être supérieurs à la valeur faciale et incluent le service, la gestion des réservations et le service client.',
    rights: '© {year} SagradaTickets. Tous droits réservés.',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d\'utilisation',
    cookies: 'Cookies',
  },
}
