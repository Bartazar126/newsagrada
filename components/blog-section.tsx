'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/lib/blog-data'
import { useHomeLocale } from '@/components/home-locale-provider'

export function BlogSection() {
  const { t } = useHomeLocale()
  const posts = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t.blog.magazine}
            </span>
            <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl">
              {t.blog.title}
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              {t.blog.subtitle}
            </p>
          </div>
          <Button
            render={<Link href="/blog" />}
            nativeButton={false}
            variant="secondary"
            className="w-fit rounded-full"
          >
            {t.blog.allArticles}
            <ArrowUpRight className="size-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
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
                  {t.blog.readMore}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
