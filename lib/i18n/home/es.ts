import type { HomeCopy } from './types'

export const es: HomeCopy = {
  header: {
    nav: {
      tickets: 'Entradas',
      tours: 'Visitas guiadas',
      experience: 'La experiencia',
      blog: 'Blog',
      faq: 'Preguntas frecuentes',
    },
    bookTicket: 'Reservar entrada',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    homepageAria: 'Página de inicio de SagradaTickets',
  },
  hero: {
    badge: 'Corazón de Barcelona · Legado de Gaudí · Tu experiencia',
    title: 'Descubre la Sagrada Família sin hacer cola',
    subtitle:
      'Reserva entradas y visitas guiadas a la obra maestra de Gaudí. Confirmación instantánea, entradas móviles y franja horaria garantizada — en solo unos clics.',
    ctaStart: 'Empezar reserva',
    ctaTickets: 'Ver tipos de entrada',
    highlights: ['Acceso prioritario', 'Confirmación instantánea', 'Cancelación gratuita'],
    imageAlt:
      'Las torres de la basílica de la Sagrada Família al atardecer en Barcelona',
  },
  trust: {
    items: [
      { title: 'Acceso prioritario', desc: 'Entrada a tu hora reservada' },
      { title: 'Entrada móvil', desc: 'Sin necesidad de imprimir' },
      { title: 'Cancelación gratuita', desc: 'Hasta 24 horas antes' },
      { title: 'Atención al cliente', desc: 'Todos los días de la semana' },
    ],
  },
  tickets: {
    sectionLabel: 'Tipos de entrada',
    title: 'Elige la experiencia que mejor se adapte a ti',
    subtitle:
      'Todas las entradas incluyen acceso sin colas y confirmación móvil instantánea. Sin cargos ocultos.',
    perPerson: '/ persona',
    bookFrom: 'Reservar desde {price} €',
    tiers: {
      basic: {
        name: 'Entrada básica',
        tagline: 'Acceso sin colas',
        duration: 'Aprox. 1–1,5 horas',
        features: [
          'Entrada rápida (sin colas)',
          'Visita autoguiada de la basílica',
          'App de audioguía gratuita en 16 idiomas',
          'Entrada móvil — sin necesidad de imprimir',
        ],
      },
      towers: {
        name: 'Entrada + Torres',
        tagline: 'La opción más popular',
        duration: 'Aprox. 2 horas',
        badge: 'Más popular',
        features: [
          'Todo lo incluido en Entrada básica',
          'Subida a la torre de la Pasión o del Nacimiento',
          'Panorama impresionante sobre Barcelona',
          'Selección flexible de franja horaria',
          'Cancelación gratuita hasta 24 horas antes',
        ],
      },
      guided: {
        name: 'Experiencia guiada',
        tagline: 'Con guía experto',
        duration: 'Aprox. 1,5 horas',
        badge: 'Premium',
        features: [
          'Todo lo incluido en Entrada básica',
          'Guía en directo en inglés o español',
          'Los secretos de Gaudí y la historia de la basílica',
          'Grupo reducido (máx. 20 personas)',
          'Preguntas y respuestas durante toda la visita',
        ],
      },
    },
  },
  experience: {
    label: 'La experiencia',
    title: 'La obra maestra inacabada de Gaudí que te deja sin aliento',
    body:
      'La Sagrada Família no es solo una iglesia — es una sinfonía viva de piedra y luz. Caminar entre columnas que parecen árboles es como estar en un bosque donde los vitrales pintan las paredes con colores del arcoíris. En construcción desde hace más de 140 años, sigue siendo una de las maravillas arquitectónicas más impresionantes del mundo.',
    imageAlts: [
      'Las columnas en forma de árbol y los vitrales en el interior de la Sagrada Família',
      'Luz de colores filtrándose a través de los vitrales',
    ],
    stats: [
      { value: '1882', label: 'Inicio de la construcción' },
      { value: '172 m', label: 'Altura prevista de la torre principal' },
      { value: '18', label: 'Torres en la basílica terminada' },
      { value: '4,5 M+', label: 'Visitantes anuales' },
    ],
  },
  tours: {
    sectionLabel: 'Visitas guiadas',
    title: 'Visitas convertidas en experiencias',
    subtitle:
      'Con guías locales expertos en grupos reducidos. Contamos la historia del genio de Gaudí para que no solo veas la maravilla — la entiendas.',
    fromPrice: 'desde {price} €',
    chooseTime: 'Elegir franja horaria',
    tours: {
      'skip-guided': {
        name: 'Visita premium Sagrada Família',
        description:
          'Descubre la obra maestra inacabada de Gaudí con un guía local apasionado que da vida a cada detalle de la basílica.',
        duration: '1,5 horas',
        groupSize: 'Máx. 20 personas',
      },
      'towers-tour': {
        name: 'Visita Torres y Panorama',
        description:
          'Sube a las impresionantes torres y admira Barcelona desde lo alto mientras aprendes sobre el simbolismo de los campanarios.',
        duration: '2 horas',
        groupSize: 'Máx. 15 personas',
      },
      'gaudi-full': {
        name: 'Gaudí Barcelona día completo',
        description:
          'Sagrada Família, Park Güell y Casa Batlló en un solo día — un recorrido completo del modernismo catalán en una experiencia exclusiva.',
        duration: '6 horas',
        groupSize: 'Máx. 12 personas',
      },
    },
  },
  booking: {
    sectionLabel: 'Reserva',
    title: 'Reserva tu entrada en unos sencillos pasos',
    subtitle:
      'Elige el tipo de entrada, la fecha y el tamaño del grupo — calculamos el precio en tiempo real. Confirmación instantánea, reserva segura.',
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    weekdayNames: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    steps: {
      ticket: 'Elige tu tipo de entrada',
      dateTime: 'Elige fecha y hora',
      guests: '¿Cuántos visitantes?',
      details: 'Introduce tus datos',
    },
    perPerson: '/ persona',
    availableTimeSlots: 'Franjas horarias disponibles',
    selectDateFirst: 'Selecciona primero una fecha',
    selectDateOnCalendar: 'Selecciona una fecha en el calendario',
    guestTypes: {
      adult: { label: 'Adulto', hint: 'De 13 años en adelante' },
      child: { label: 'Niño', hint: 'De 3 a 12 años · {price} €' },
    },
    fields: {
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      confirmEmail: 'Confirmar correo electrónico',
      phone: 'Número de teléfono',
    },
    placeholders: {
      fullName: 'María García',
      email: 'maria@ejemplo.com',
      phone: '+34 600 123 456',
    },
    summary: {
      title: 'Resumen de la reserva',
      ticketType: 'Tipo de entrada',
      date: 'Fecha',
      time: 'Hora',
      guests: 'Visitantes',
      amountPaid: 'Importe pagado',
      adultLine: 'Adulto × {count}',
      childLine: 'Niño × {count}',
      bookingFee: 'Gastos de gestión',
      totalDue: 'Total a pagar',
      selectGuests: 'Selecciona el número de visitantes',
      emptyValue: '—',
    },
    confirm: 'Confirmar reserva',
    continue: 'Continuar',
    cancellationNote: 'Cancelación gratuita hasta 24 horas antes de tu visita',
    decreaseAria: 'Reducir {label}',
    increaseAria: 'Aumentar {label}',
    errors: {
      emailMismatch: 'Las direcciones de correo no coinciden.',
    },
    confirmed: {
      title: '¡Reserva confirmada!',
      body:
        'Gracias, {firstName}. Tu entrada móvil se ha enviado a {email}. Nos vemos el {date} a las {time}.',
      newBooking: 'Nueva reserva',
    },
    calendar: {
      previousMonth: 'Mes anterior',
      nextMonth: 'Mes siguiente',
    },
  },
  blog: {
    magazine: 'Revista',
    title: 'Consejos, historias y guías de viaje',
    subtitle: 'Información útil e inspiración para la visita perfecta a Barcelona.',
    allArticles: 'Todos los artículos',
    readMore: 'Leer más',
  },
  faq: {
    label: 'Preguntas frecuentes',
    title: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿De verdad no tengo que hacer cola?',
        a: '¡Exacto! Todas las entradas incluyen acceso rápido sin colas. Solo muestra tu entrada móvil en la puerta a la hora reservada.',
      },
      {
        q: '¿Cuándo recibiré mi entrada?',
        a: 'Inmediatamente después del pago. Enviamos la entrada móvil por correo electrónico y puedes acceder a ella en cualquier momento. No hace falta imprimir.',
      },
      {
        q: '¿Puedo cancelar o modificar mi reserva?',
        a: 'Sí. Puedes cancelar o reprogramar la mayoría de tipos de entrada sin cargo hasta 24 horas antes de tu visita. Los términos exactos están en el correo de confirmación.',
      },
      {
        q: '¿Hay descuento para niños?',
        a: 'Ofrecemos entradas con descuento para niños de 3 a 12 años, y los menores de 3 entran gratis. El precio infantil aparece automáticamente durante la reserva.',
      },
      {
        q: '¿En qué idiomas hay visitas guiadas?',
        a: 'Nuestras visitas guiadas están disponibles en inglés, español y francés. Puedes seleccionar tu idioma preferido durante la reserva.',
      },
      {
        q: '¿Se puede subir a las torres?',
        a: 'Sí, con la entrada "Entrada + Torres" o la visita a las torres puedes subir en ascensor a la torre de la Pasión o del Nacimiento, con un panorama incomparable sobre Barcelona.',
      },
    ],
  },
  footer: {
    tagline:
      'Reserva entradas y visitas guiadas a la Sagrada Família en minutos. Pago seguro, entradas móviles y atención al cliente todos los días de la semana.',
    columns: {
      tickets: 'Entradas',
      tours: 'Visitas guiadas',
      information: 'Información',
    },
    ticketLinks: {
      basic: 'Entrada básica',
      towers: 'Entrada + Torres',
      guided: 'Experiencia guiada',
    },
    tourLinks: {
      premiumTour: 'Visita premium',
      towersPanorama: 'Torres y Panorama',
      gaudiFullDay: 'Gaudí día completo',
      groupBooking: 'Reserva de grupo',
    },
    infoLinks: {
      faq: 'Preguntas frecuentes',
      cancellationPolicy: 'Política de cancelación',
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos del servicio',
      contact: 'Contacto',
    },
    importantNotice: 'Aviso importante',
    disclaimer:
      'SagradaTickets.com es propiedad y está operado por VALOR TOUR LLC, una sociedad de responsabilidad limitada de Delaware con EIN 30-1486586, que opera bajo la marca Valor Tours. No somos la taquilla oficial de la Sagrada Familia, la administración de la Sagrada ni ninguna autoridad de la atracción. Somos un servicio de viajes independiente y revendedor/intermediario de entradas especializado en entradas, experiencias y visitas. Los precios pueden ser superiores al valor nominal e incluyen servicio, gestión de reservas y atención al cliente.',
    rights: '© {year} SagradaTickets. Todos los derechos reservados.',
    privacy: 'Política de privacidad',
    terms: 'Términos del servicio',
    cookies: 'Cookies',
  },
}
