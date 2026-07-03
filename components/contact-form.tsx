'use client'

import { useState } from 'react'
import { Check, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  formatPhoneHref,
  useContactSettings,
} from '@/components/use-contact-settings'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const subjects = [
  'Booking & tickets',
  'Guided tours',
  'Cancellation or refund',
  'Payment issue',
  'General inquiry',
]

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(subjects[0])
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const canSubmit =
    name.trim().length >= 2 &&
    EMAIL_RE.test(email.trim()) &&
    message.trim().length >= 10

  if (sent) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-8" />
        </div>
        <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">
          Message sent
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          Thank you, {name.split(' ')[0]}! We received your message and will get
          back to you at{' '}
          <span className="font-medium text-foreground">{email}</span> as soon as
          possible — usually within one business day.
        </p>
        <Button
          className="mt-8 rounded-full px-8"
          onClick={() => {
            setSent(false)
            setName('')
            setEmail('')
            setSubject(subjects[0])
            setMessage('')
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      onSubmit={(e) => {
        e.preventDefault()
        if (canSubmit) setSent(true)
      }}
    >
      <h2 className="font-heading text-2xl font-bold text-foreground">
        Send us a message
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Fill in the form below and our support team will reply by email.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Full name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            autoComplete="name"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Email address
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            autoComplete="email"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Subject
          </span>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {subjects.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Message
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            rows={6}
            className="w-full resize-y rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </label>
      </div>

      <Button
        type="submit"
        disabled={!canSubmit}
        size="lg"
        className="mt-6 w-full rounded-full disabled:cursor-not-allowed sm:w-auto sm:px-10"
      >
        Send message
      </Button>
    </form>
  )
}

export function ContactDetails() {
  const contactSettings = useContactSettings()

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-secondary/40 p-6">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Customer support
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Our English-speaking team is available every day of the week to help with
          bookings, tickets, and tour questions.
        </p>
        <ul className="mt-6 space-y-4 text-sm">
          <li className="flex gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Email</p>
              <a
                href={`mailto:${contactSettings.supportEmail}`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {contactSettings.supportEmail}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Phone</p>
              <a
                href={formatPhoneHref(contactSettings.supportPhone)}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {contactSettings.supportPhone}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Sagrada Familia Location</p>
              <p className="text-muted-foreground">
                Carrer de Mallorca, 401
                <br />
                Barcelona, Spain
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">VALOR TOUR LLC</p>
        <p className="mt-2">
          8 The Green STE B, Dover, KENT COUNTY, DE 19901, United States
        </p>
        <p className="mt-1">EIN: 30-1486586</p>
      </div>
    </div>
  )
}
