"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-MK8Y8EL9NW"
const META_PIXEL_ID = "800254155650849"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function BrandbookTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const skipFirstRouteEvent = useRef(true)
  const search = searchParams?.toString() ?? ""
  const isEnabled = process.env.NODE_ENV === "production"

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    // Initial page view is already emitted by GA/Meta bootstrap scripts.
    if (skipFirstRouteEvent.current) {
      skipFirstRouteEvent.current = false
      return
    }

    const pagePath = search ? `${pathname}?${search}` : pathname
    window.gtag?.("config", GA_MEASUREMENT_ID, { page_path: pagePath })
    window.fbq?.("track", "PageView")
  }, [isEnabled, pathname, search])

  if (!isEnabled) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      <noscript>
        <img
          alt=""
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
