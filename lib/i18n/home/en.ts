import type { HomeCopy } from './types'

export const en: HomeCopy = {
  header: {
    nav: {
      tickets: 'Tickets',
      tours: 'Tours',
      experience: 'Experience',
      blog: 'Blog',
      faq: 'FAQ',
    },
    bookTicket: 'Book a ticket',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homepageAria: 'SagradaTickets homepage',
  },
  hero: {
    badge: 'Heart of Barcelona · Gaudí\'s legacy · Your experience',
    title: 'Discover the Sagrada Família without waiting in line',
    subtitle:
      'Book entry tickets and guided tours to Gaudí\'s awe-inspiring masterpiece. Instant confirmation, mobile tickets, and a guaranteed time slot — in just a few clicks.',
    ctaStart: 'Start booking',
    ctaTickets: 'View ticket types',
    highlights: ['Priority access', 'Instant confirmation', 'Free cancellation'],
    imageAlt:
      'The Sagrada Família basilica towers at sunset in Barcelona',
  },
  trust: {
    items: [
      { title: 'Priority access', desc: 'Timed entry at your slot' },
      { title: 'Mobile ticket', desc: 'No printing needed' },
      { title: 'Free cancellation', desc: 'Up to 24 hours before' },
      { title: 'English support', desc: 'Every day of the week' },
    ],
  },
  tickets: {
    sectionLabel: 'Ticket Types',
    title: 'Choose the experience that suits you',
    subtitle:
      'Every ticket includes skip-the-line entry and instant mobile confirmation. No hidden fees.',
    perPerson: '/ person',
    bookFrom: 'Book from {price} €',
    tiers: {
      basic: {
        name: 'Basic Entry',
        tagline: 'Skip-the-line admission',
        duration: 'Approx. 1–1.5 hours',
        features: [
          'Fast-track entry (skip-the-line)',
          'Self-guided visit of the basilica',
          'Free audio guide app in 16 languages',
          'Mobile ticket — no printing required',
        ],
      },
      towers: {
        name: 'Entry + Towers',
        tagline: 'The most popular choice',
        duration: 'Approx. 2 hours',
        badge: 'Most Popular',
        features: [
          'Everything in Basic Entry',
          'Ascent to the Passion or Nativity tower',
          'Breathtaking panorama over Barcelona',
          'Flexible time slot selection',
          'Free cancellation up to 24 hours before',
        ],
      },
      guided: {
        name: 'Guided Experience',
        tagline: 'With an expert tour guide',
        duration: 'Approx. 1.5 hours',
        badge: 'Premium',
        features: [
          'Everything in Basic Entry',
          'Live guide in English or Spanish',
          'Gaudí\'s secrets and the basilica\'s history',
          'Small group (max. 20 people)',
          'Q&A throughout the tour',
        ],
      },
    },
  },
  experience: {
    label: 'The Experience',
    title: 'Gaudí\'s unfinished masterpiece that takes your breath away',
    body:
      'The Sagrada Família is not just a church — it is a living symphony of stone and light. Walking among the tree-like columns feels like standing in a forest where stained-glass windows paint the walls in rainbow colors. Under construction for over 140 years, it remains one of the world\'s most breathtaking architectural wonders.',
    imageAlts: [
      'The tree-like columns and stained-glass windows inside the Sagrada Família',
      'Colored light streaming through the stained-glass windows',
    ],
    stats: [
      { value: '1882', label: 'Construction began' },
      { value: '172 m', label: 'Planned tallest tower' },
      { value: '18', label: 'Towers in the finished basilica' },
      { value: '4.5 M+', label: 'Annual visitors' },
    ],
  },
  tours: {
    sectionLabel: 'Guided Tours',
    title: 'Visits shaped into experiences',
    subtitle:
      'With local expert guides in small groups. We tell the story of Gaudí\'s genius so you don\'t just see the wonder — you understand it.',
    fromPrice: 'from {price} €',
    chooseTime: 'Choose a time slot',
    tours: {
      'skip-guided': {
        name: 'Sagrada Família Premium Tour',
        description:
          'Discover Gaudí\'s unfinished masterpiece with a passionate local guide who brings every detail of the basilica to life.',
        duration: '1.5 hours',
        groupSize: 'Max. 20 people',
      },
      'towers-tour': {
        name: 'Towers & Panorama Tour',
        description:
          'Climb the breathtaking towers and admire Barcelona from a bird\'s-eye view while learning about the symbolism of the spires.',
        duration: '2 hours',
        groupSize: 'Max. 15 people',
      },
      'gaudi-full': {
        name: 'Gaudí Barcelona Full Day',
        description:
          'Sagrada Família, Park Güell, and Casa Batlló in a single day — a complete tour of Catalan modernism in one exclusive experience.',
        duration: '6 hours',
        groupSize: 'Max. 12 people',
      },
    },
  },
  booking: {
    sectionLabel: 'Booking',
    title: 'Book your ticket in a few simple steps',
    subtitle:
      'Choose your ticket type, date, and group size — we calculate the price in real time. Instant confirmation, secure booking.',
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    steps: {
      ticket: 'Choose your ticket type',
      dateTime: 'Choose a date and time',
      guests: 'How many visitors?',
      details: 'Enter your details',
    },
    perPerson: '/ person',
    availableTimeSlots: 'Available time slots',
    selectDateFirst: 'Select a date first',
    selectDateOnCalendar: 'Select a date on the calendar',
    guestTypes: {
      adult: { label: 'Adult', hint: 'Ages 13 and up' },
      child: { label: 'Child', hint: 'Ages 3–12 · {price} €' },
    },
    fields: {
      fullName: 'Full name',
      email: 'Email address',
      confirmEmail: 'Confirm email address',
      phone: 'Phone number',
    },
    placeholders: {
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+34 600 123 456',
    },
    summary: {
      title: 'Booking summary',
      ticketType: 'Ticket type',
      date: 'Date',
      time: 'Time',
      guests: 'Guests',
      amountPaid: 'Amount paid',
      adultLine: 'Adult × {count}',
      childLine: 'Child × {count}',
      bookingFee: 'Booking fee',
      totalDue: 'Total due',
      selectGuests: 'Select number of guests',
      emptyValue: '—',
    },
    confirm: 'Confirm booking',
    continue: 'Continue',
    cancellationNote: 'Free cancellation up to 24 hours before your visit',
    decreaseAria: 'Decrease {label}',
    increaseAria: 'Increase {label}',
    errors: {
      emailMismatch: 'Email addresses do not match.',
    },
    confirmed: {
      title: 'Booking confirmed!',
      body:
        'Thank you, {firstName}! Your mobile ticket has been sent to {email}. See you on {date} at {time}.',
      newBooking: 'New booking',
    },
    calendar: {
      previousMonth: 'Previous month',
      nextMonth: 'Next month',
    },
  },
  blog: {
    magazine: 'Magazine',
    title: 'Tips, stories & travel guides',
    subtitle: 'Useful insights and inspiration for the perfect Barcelona visit.',
    allArticles: 'All articles',
    readMore: 'Read more',
  },
  faq: {
    label: 'FAQ',
    title: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do I really not have to wait in line?',
        a: 'That\'s right! Every ticket includes fast-track, skip-the-line entry. Just show your mobile ticket at the entrance at your booked time slot.',
      },
      {
        q: 'When will I receive my ticket?',
        a: 'Immediately after payment. We send the mobile ticket by email, and you can access it anytime. No printing required.',
      },
      {
        q: 'Can I cancel or modify my booking?',
        a: 'Yes. You can cancel or reschedule most ticket types free of charge up to 24 hours before your visit. The exact terms are included in your confirmation email.',
      },
      {
        q: 'Is there a discount for children?',
        a: 'We offer discounted tickets for children aged 3 to 12, and children under 3 enter free. The child price appears automatically during booking.',
      },
      {
        q: 'What languages are guided tours available in?',
        a: 'Our guided tours are available in English, Spanish, and French. You can select your preferred language during booking.',
      },
      {
        q: 'Can you go up the towers?',
        a: 'Yes, with the "Entry + Towers" ticket or the towers tour you can take the elevator up to the Passion or Nativity tower, with an unmatched panorama over Barcelona.',
      },
    ],
  },
  footer: {
    tagline:
      'Book tickets and guided tours to the Sagrada Família in minutes. Secure checkout, mobile tickets, and English customer support every day of the week.',
    columns: {
      tickets: 'Tickets',
      tours: 'Tours',
      information: 'Information',
    },
    ticketLinks: {
      basic: 'Basic Entry',
      towers: 'Entry + Towers',
      guided: 'Guided Experience',
    },
    tourLinks: {
      premiumTour: 'Premium Tour',
      towersPanorama: 'Towers & Panorama',
      gaudiFullDay: 'Gaudí Full Day',
      groupBooking: 'Group Booking',
    },
    infoLinks: {
      faq: 'FAQ',
      cancellationPolicy: 'Cancellation Policy',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
    },
    importantNotice: 'Important notice',
    disclaimer:
      'SagradaTickets.com is owned and operated by VALOR TOUR LLC, a Delaware limited liability company with EIN 30-1486586, operating under the Valor Tours brand. We are not the primary ticket office of the Sagrada Familia, Sagrada administration or any attraction authority. We are an independent travel service and ticket reseller/intermediary specializing in tickets, experiences and tours. Prices may be higher than face value and include service, booking management and customer support.',
    rights: '© {year} SagradaTickets. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookies',
  },
}
