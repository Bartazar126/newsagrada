import Script from 'next/script'

const GOOGLE_ADS_ID = 'AW-18218967264'
const GA_MEASUREMENT_ID = 'G-P7Z5L130VZ'
const GOOGLE_LINKER_DOMAINS = [
  'www.sagradafamiliaticket-s.com',
  'sagradafamiliaticket-s.com',
]

export function GoogleTags() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tags" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('set', 'linker', {
            domains: ${JSON.stringify(GOOGLE_LINKER_DOMAINS)},
            accept_incoming: true
          });

          gtag('config', '${GOOGLE_ADS_ID}');
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
