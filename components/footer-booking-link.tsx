'use client'

const PENDING_TICKET_KEY = 'pending-ticket-id'

export function scrollToSection(sectionId: string) {
  if (window.location.pathname === '/') {
    const section = document.getElementById(sectionId)

    if (!section) return

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  window.location.href = `/#${sectionId}`
}

export function scrollToHashSection() {
  const sectionId = window.location.hash.slice(1)

  if (!sectionId) return

  requestAnimationFrame(() => {
    scrollToSection(sectionId)
    window.setTimeout(() => scrollToSection(sectionId), 300)
  })
}

export function selectTicketAndScrollToBooking(ticketId: string) {
  sessionStorage.setItem(PENDING_TICKET_KEY, ticketId)
  window.dispatchEvent(new CustomEvent('select-ticket', { detail: ticketId }))

  scrollToSection('booking')
}

export function consumePendingTicketId(): string | null {
  const id = sessionStorage.getItem(PENDING_TICKET_KEY)
  if (id) sessionStorage.removeItem(PENDING_TICKET_KEY)
  return id
}

export function FooterScrollLink({
  sectionId,
  label,
}: {
  sectionId: string
  label: string
}) {
  return (
    <a
      href={`/#${sectionId}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToSection(sectionId)
      }}
      className="text-sm text-muted-foreground transition-colors hover:text-primary"
    >
      {label}
    </a>
  )
}

export function FooterBookingLink({
  ticketId,
  label,
}: {
  ticketId: string
  label: string
}) {
  return (
    <a
      href="/#booking"
      onClick={(e) => {
        e.preventDefault()
        selectTicketAndScrollToBooking(ticketId)
      }}
      className="text-sm text-muted-foreground transition-colors hover:text-primary"
    >
      {label}
    </a>
  )
}
