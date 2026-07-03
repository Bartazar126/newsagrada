export type BlogPost = {
  slug: string
  image: string
  category: string
  date: string
  readTime: string
  title: string
  excerpt: string
  author: string
  content: { heading?: string; paragraphs: string[] }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-time-to-visit',
    image: '/images/blog-best-time.png',
    category: 'Travel Tip',
    date: 'January 8, 2026',
    readTime: '5 min read',
    title: 'When is the best time to visit the Sagrada Família?',
    excerpt:
      'Time of day matters: mornings for the Nativity façade, afternoons when the Passion side stained glass glows. We show you the perfect times for the light show.',
    author: 'Marta Vidal',
    content: [
      {
        paragraphs: [
          'The Sagrada Família is not simply a church — it is a living play of light. Gaudí designed the stained-glass windows to change with the sun\'s path, so when you step inside fundamentally shapes your experience.',
        ],
      },
      {
        heading: 'Early morning: the hour of warm light',
        paragraphs: [
          'The first hour after opening is the calmest. Fewer visitors, and the light filtering through the eastern Nativity façade windows bathes the interior columns in warm, golden tones.',
          'If you want to photograph without crowds, choose the very first entry slot. Morning light is softer, and the vast column hall greets you in almost chapel-like silence.',
        ],
      },
      {
        heading: 'Late afternoon: the glow of blue and orange',
        paragraphs: [
          'In the afternoon, the sun moves to the western Passion façade side, and the cool blue and fiery orange stained-glass windows come alive. This is the most dramatic period for the interior color experience.',
          'The one to two hours before sunset are ideal if you want to see the most spectacular light effects, as colored patches wander across the floor and columns.',
        ],
      },
      {
        heading: 'Which month should you choose?',
        paragraphs: [
          'Spring (April–May) and early autumn (September–October) are the most pleasant: mild weather, fewer crowds than peak summer. In summer, book the earliest or latest time slots to avoid heat and long queues.',
        ],
      },
    ],
  },
  {
    slug: '10-tips-first-visit',
    image: '/images/blog-tips.png',
    category: 'Practical',
    date: 'January 3, 2026',
    readTime: '7 min read',
    title: '10 tips for your first visit to Barcelona',
    excerpt:
      'From avoiding crowds to the best photo spots — we\'ve gathered everything you need to know for a smooth visit.',
    author: 'Jordi Serra',
    content: [
      {
        paragraphs: [
          'The Sagrada Família is one of Barcelona\'s most iconic sights, but a smooth visit is easier with a few things planned ahead. Here are our most important tips.',
        ],
      },
      {
        heading: '1–5. Before you arrive',
        paragraphs: [
          'Book online with a timed-entry ticket — that way you won\'t wait in the long ticket queue. Arrive 15 minutes before your slot for security screening.',
          'Bring photo ID, and download an audio guide if you\'re exploring the basilica on your own. Dress appropriately for a sacred site: cover your shoulders and knees.',
        ],
      },
      {
        heading: '6–10. Inside and around the area',
        paragraphs: [
          'Tower access requires a separate ticket, and the Nativity tower is recommended for the best views. Don\'t rush inside: the column hall and stained glass deserve at least an hour.',
          'After your visit, stroll to nearby Gaudí Avenue for a coffee, or head on to Park Güell. Metro lines L2 and L5 go directly to the basilica.',
        ],
      },
    ],
  },
  {
    slug: 'gaudi-masterpiece-completion',
    image: '/images/blog-history.png',
    category: 'History',
    date: 'December 19, 2025',
    readTime: '6 min read',
    title: 'Gaudí\'s masterpiece: nearing completion',
    excerpt:
      'After more than 140 years of construction, the basilica is approaching the finish line. Let\'s look at what awaits in the coming years.',
    author: 'Elena Ruiz',
    content: [
      {
        paragraphs: [
          'Antoni Gaudí took over direction of the Sagrada Família\'s construction in 1883, and devoted the last decades of his life entirely to this work. The basilica has been under construction ever since — but the end is now in sight.',
        ],
      },
      {
        heading: 'A century-old dream',
        paragraphs: [
          'Gaudí knew he would not live to see completion. "My client is not in a hurry," he famously said. Construction is funded by donations and ticket revenue, which explains the slow but steady progress.',
        ],
      },
      {
        heading: 'The final phase',
        paragraphs: [
          'The central Jesus Christ tower will become the world\'s tallest church spire upon completion. The main structure is expected to be finished in the coming years, though decorative work will continue beyond that.',
          'Those who visit today may witness a rare moment: the final chapter of a UNESCO World Heritage masterpiece unfolding before their own eyes.',
        ],
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
