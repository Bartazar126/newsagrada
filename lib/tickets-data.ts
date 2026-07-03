export type TicketTier = {
  id: string
  name: string
  tagline: string
  price: number
  oldPrice?: number
  duration: string
  badge?: string
  popular?: boolean
  features: string[]
}

export type Tour = {
  id: string
  name: string
  description: string
  price: number
  duration: string
  groupSize: string
  image: string
  languages: string[]
}

export const ticketTiers: TicketTier[] = [
  {
    id: 'basic',
    name: 'Basic Entry',
    tagline: 'Skip-the-line admission',
    price: 33,
    duration: 'Approx. 1–1.5 hours',
    features: [
      'Fast-track entry (skip-the-line)',
      'Self-guided visit of the basilica',
      'Free audio guide app in 16 languages',
      'Mobile ticket — no printing required',
    ],
  },
  {
    id: 'towers',
    name: 'Entry + Towers',
    tagline: 'The most popular choice',
    price: 46,
    oldPrice: 56,
    duration: 'Approx. 2 hours',
    badge: 'Most Popular',
    popular: true,
    features: [
      'Everything in Basic Entry',
      'Ascent to the Passion or Nativity tower',
      'Breathtaking panorama over Barcelona',
      'Flexible time slot selection',
      'Free cancellation up to 24 hours before',
    ],
  },
  {
    id: 'guided',
    name: 'Guided Experience',
    tagline: 'With an expert tour guide',
    price: 59,
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
]

export const bookingProductTitles: Record<string, string> = {
  basic: 'Sagrada Basic Entry',
  towers: 'Sagrada Entry',
  guided: 'Sagrada Entry',
}

export function getBookingProductTitle(ticketId: string, fallback: string) {
  return bookingProductTitles[ticketId] ?? fallback
}

export const tours: Tour[] = [
  {
    id: 'skip-guided',
    name: 'Sagrada Família Premium Tour',
    description:
      'Discover Gaudí\'s unfinished masterpiece with a passionate local guide who brings every detail of the basilica to life.',
    price: 59,
    duration: '1.5 hours',
    groupSize: 'Max. 20 people',
    image: '/images/interior.png',
    languages: ['English', 'Spanish', 'French'],
  },
  {
    id: 'towers-tour',
    name: 'Towers & Panorama Tour',
    description:
      'Climb the breathtaking towers and admire Barcelona from a bird\'s-eye view while learning about the symbolism of the spires.',
    price: 72,
    duration: '2 hours',
    groupSize: 'Max. 15 people',
    image: '/images/towers.png',
    languages: ['English', 'Spanish'],
  },
  {
    id: 'gaudi-full',
    name: 'Gaudí Barcelona Full Day',
    description:
      'Sagrada Família, Park Güell, and Casa Batlló in a single day — a complete tour of Catalan modernism in one exclusive experience.',
    price: 149,
    duration: '6 hours',
    groupSize: 'Max. 12 people',
    image: '/images/stained-glass.png',
    languages: ['English', 'Spanish'],
  },
]

export const timeSlots = [
  '09:00',
  '09:45',
  '10:30',
  '11:15',
  '12:00',
  '13:30',
  '14:15',
  '15:00',
  '15:45',
  '16:30',
  '17:15',
]

export const monthNames = [
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
]

export const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
