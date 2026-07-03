export type HomeLocale = 'en' | 'es' | 'fr' | 'de' | 'it'

export type TicketTierId = 'basic' | 'towers' | 'guided'
export type TourId = 'skip-guided' | 'towers-tour' | 'gaudi-full'

export interface HomeCopy {
  header: {
    nav: {
      tickets: string
      tours: string
      experience: string
      blog: string
      faq: string
    }
    bookTicket: string
    openMenu: string
    closeMenu: string
    homepageAria: string
  }
  hero: {
    badge: string
    title: string
    subtitle: string
    ctaStart: string
    ctaTickets: string
    highlights: [string, string, string]
    imageAlt: string
  }
  trust: {
    items: [
      { title: string; desc: string },
      { title: string; desc: string },
      { title: string; desc: string },
      { title: string; desc: string },
    ]
  }
  tickets: {
    sectionLabel: string
    title: string
    subtitle: string
    perPerson: string
    bookFrom: string
    tiers: Record<
      TicketTierId,
      {
        name: string
        tagline: string
        duration: string
        badge?: string
        features: string[]
      }
    >
  }
  experience: {
    label: string
    title: string
    body: string
    imageAlts: [string, string]
    stats: [
      { value: string; label: string },
      { value: string; label: string },
      { value: string; label: string },
      { value: string; label: string },
    ]
  }
  tours: {
    sectionLabel: string
    title: string
    subtitle: string
    fromPrice: string
    chooseTime: string
    tours: Record<
      TourId,
      {
        name: string
        description: string
        duration: string
        groupSize: string
      }
    >
  }
  booking: {
    sectionLabel: string
    title: string
    subtitle: string
    monthNames: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ]
    weekdayNames: [string, string, string, string, string, string, string]
    steps: {
      ticket: string
      dateTime: string
      guests: string
      details: string
    }
    perPerson: string
    availableTimeSlots: string
    selectDateFirst: string
    selectDateOnCalendar: string
    guestTypes: {
      adult: { label: string; hint: string }
      child: { label: string; hint: string }
    }
    fields: {
      fullName: string
      email: string
      confirmEmail: string
      phone: string
    }
    placeholders: {
      fullName: string
      email: string
      phone: string
    }
    summary: {
      title: string
      ticketType: string
      date: string
      time: string
      guests: string
      amountPaid: string
      adultLine: string
      childLine: string
      bookingFee: string
      totalDue: string
      selectGuests: string
      emptyValue: string
    }
    confirm: string
    continue: string
    cancellationNote: string
    decreaseAria: string
    increaseAria: string
    errors: {
      emailMismatch: string
    }
    confirmed: {
      title: string
      body: string
      newBooking: string
    }
    calendar: {
      previousMonth: string
      nextMonth: string
    }
  }
  blog: {
    magazine: string
    title: string
    subtitle: string
    allArticles: string
    readMore: string
  }
  faq: {
    label: string
    title: string
    faqs: [
      { q: string; a: string },
      { q: string; a: string },
      { q: string; a: string },
      { q: string; a: string },
      { q: string; a: string },
      { q: string; a: string },
    ]
  }
  footer: {
    tagline: string
    columns: {
      tickets: string
      tours: string
      information: string
    }
    ticketLinks: Record<TicketTierId, string>
    tourLinks: {
      premiumTour: string
      towersPanorama: string
      gaudiFullDay: string
      groupBooking: string
    }
    infoLinks: {
      faq: string
      cancellationPolicy: string
      privacyPolicy: string
      termsOfService: string
      contact: string
    }
    importantNotice: string
    disclaimer: string
    rights: string
    privacy: string
    terms: string
    cookies: string
  }
}
