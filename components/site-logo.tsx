type SiteLogoProps = {
  className?: string
  /** Color for the wordmark text. Defaults to currentColor. */
  textClassName?: string
  showWordmark?: boolean
}

/**
 * Brand logo for SagradaTickets.
 * The mark is a stylized set of the Sagrada Família's tapering spires
 * topped with Gaudí's mosaic pinnacles, set inside a warm sun disc that
 * nods to Barcelona's Mediterranean light.
 */
export function SiteLogo({
  className,
  textClassName,
  showWordmark = true,
}: SiteLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <svg
        viewBox="0 0 48 48"
        role="img"
        aria-label="SagradaTickets logo"
        className="size-9 shrink-0"
      >
        {/* Sun disc */}
        <circle cx="24" cy="24" r="23" className="fill-primary" />
        <circle cx="24" cy="24" r="23" className="fill-none stroke-accent" strokeWidth="1.5" strokeOpacity="0.5" />

        {/* Spires group, drawn in the light foreground color */}
        <g className="fill-primary-foreground">
          {/* Left spire */}
          <path d="M13 38 L15 20 L17 38 Z" />
          {/* Left-mid spire */}
          <path d="M18.5 38 L20.5 14 L22.5 38 Z" />
          {/* Center tallest spire (Jesus tower) */}
          <path d="M23.5 38 L24 7 L24.5 38 Z" />
          <path d="M22.4 38 L24 9 L25.6 38 Z" fillOpacity="0.55" />
          {/* Right-mid spire */}
          <path d="M25.5 38 L27.5 14 L29.5 38 Z" />
          {/* Right spire */}
          <path d="M31 38 L33 20 L35 38 Z" />
        </g>

        {/* Mosaic pinnacles (Gaudí's colorful tips) */}
        <g className="fill-accent">
          <circle cx="15" cy="19.5" r="1.6" />
          <circle cx="20.5" cy="13.2" r="1.7" />
          <circle cx="27.5" cy="13.2" r="1.7" />
          <circle cx="33" cy="19.5" r="1.6" />
        </g>
        <circle cx="24" cy="6" r="2.1" className="fill-primary-foreground" />
        <circle cx="24" cy="6" r="1" className="fill-accent" />

        {/* Ground line */}
        <rect x="10" y="37" width="28" height="2" rx="1" className="fill-primary-foreground" fillOpacity="0.85" />
      </svg>

      {showWordmark && (
        <span
          className={`font-heading text-lg font-bold leading-none tracking-tight ${textClassName ?? ''}`}
        >
          Sagrada<span className="text-primary">Tickets</span>
        </span>
      )}
    </span>
  )
}
