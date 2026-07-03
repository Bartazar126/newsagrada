import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { blogPosts } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Blog & Magazine | Sagrada Família Tickets',
  description:
    'Tips, stories, and travel guides for visiting the Sagrada Família. Articles from our local experts on the best times to visit, practical advice, and the basilica\'s history.',
}

export default function BlogListPage() {
  const [featured, ...rest] = blogPosts

  return (
    <main className="min-h-dvh bg-background">
      <SiteHeader solid />

      <section className="border-b border-border bg-secondary/40 pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Magazine
          </span>
          <h1 className="mt-2 max-w-3xl text-balance font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Tips, stories & travel guides
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Everything you should know before your visit — from our local experts,
            so your Barcelona adventure is perfect.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <Image
                src={featured.image || '/placeholder.svg'}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {featured.category}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                <span>{featured.date}</span>
                <span aria-hidden="true">•</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="mt-3 text-balance font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read more
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {post.category}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    <span>{post.date}</span>
                    <span aria-hidden="true">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-balance font-heading text-xl font-bold text-foreground">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-70"
                  >
                    Read more
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
