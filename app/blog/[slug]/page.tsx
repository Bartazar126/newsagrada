import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock, User } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { blogPosts, getPostBySlug } from '@/lib/blog-data'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Article not found' }
  return {
    title: `${post.title} | Sagrada Família Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <main className="min-h-dvh bg-background">
      <SiteHeader />

      <article className="pb-8">
        {/* Hero */}
        <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
          <Image
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8">
              <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {post.category}
              </span>
              <h1 className="mt-3 text-balance font-heading text-3xl font-bold text-background sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Back to magazine
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {post.readTime}
            </span>
          </div>

          <div className="mt-8 space-y-8">
            {post.content.map((block, i) => (
              <section key={i}>
                {block.heading ? (
                  <h2 className="mb-3 text-balance font-heading text-2xl font-bold text-foreground">
                    {block.heading}
                  </h2>
                ) : null}
                <div className="space-y-4">
                  {block.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-pretty text-lg leading-relaxed text-foreground/80"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-3xl border border-border bg-secondary/50 p-8 text-center">
            <h2 className="text-balance font-heading text-2xl font-bold text-foreground">
              Ready for your visit?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-pretty text-muted-foreground">
              Book your ticket or guided tour in minutes — skip the line, with
              instant confirmation.
            </p>
            <Button
              render={<Link href="/#booking" />}
              nativeButton={false}
              size="lg"
              className="mt-6 rounded-full px-8"
            >
              Book a ticket
            </Button>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 ? (
        <section className="border-t border-border bg-secondary/30 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-balance font-heading text-2xl font-bold text-foreground sm:text-3xl">
              More articles
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {related.map((rel) => (
                <article
                  key={rel.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl sm:flex-row"
                >
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-2/5"
                  >
                    <Image
                      src={rel.image || '/placeholder.svg'}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {rel.category}
                    </span>
                    <h3 className="mt-2 text-balance font-heading text-lg font-bold text-foreground">
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="transition-colors hover:text-primary"
                      >
                        {rel.title}
                      </Link>
                    </h3>
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-70"
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
      ) : null}

      <SiteFooter />
    </main>
  )
}
