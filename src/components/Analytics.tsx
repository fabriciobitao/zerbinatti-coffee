"use client";

import Script from "next/script";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { hasConsent, onConsentChange } from "@/lib/consent";

/**
 * GA4 + Meta Pixel — env-gated + consent-gated (LGPD).
 *
 * Carrega scripts SOMENTE quando:
 *  - GA4: env NEXT_PUBLIC_GA_ID setada E hasConsent('analytics')
 *  - Meta Pixel: env NEXT_PUBLIC_META_PIXEL_ID setada E hasConsent('marketing')
 *
 * Page view automatico em mudanca de rota (App Router via usePathname/useSearchParams).
 *
 * Sem env, sem consent ou ambos: zero overhead — nada e injetado no DOM.
 */
export function Analytics({
  gaId,
  metaPixelId,
}: {
  gaId?: string;
  metaPixelId?: string;
}) {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Hidrata estado inicial e escuta mudancas de consent (sem reload)
  useEffect(() => {
    setAnalytics(hasConsent("analytics"));
    setMarketing(hasConsent("marketing"));
    const off = onConsentChange(() => {
      setAnalytics(hasConsent("analytics"));
      setMarketing(hasConsent("marketing"));
    });
    return off;
  }, []);

  return (
    <>
      {gaId && analytics && (
        <>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                allow_google_signals: false,
                send_page_view: false
              });
            `}
          </Script>
        </>
      )}

      {metaPixelId && marketing && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      <Suspense fallback={null}>
        <PageViewTracker
          gaId={gaId}
          metaPixelId={metaPixelId}
          analytics={analytics}
          marketing={marketing}
        />
      </Suspense>
    </>
  );
}

/**
 * Dispara page view a cada mudanca de pathname/query, respeitando consent.
 * Isolado em <Suspense> porque useSearchParams suspende a arvore.
 */
function PageViewTracker({
  gaId,
  metaPixelId,
  analytics,
  marketing,
}: {
  gaId?: string;
  metaPixelId?: string;
  analytics: boolean;
  marketing: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    if (gaId && analytics && typeof window.gtag === "function") {
      try {
        window.gtag("event", "page_view", {
          page_path: url,
          page_location: window.location.href,
          page_title: document.title,
        });
      } catch {
        // silencioso
      }
    }

    if (metaPixelId && marketing && typeof window.fbq === "function") {
      try {
        window.fbq("track", "PageView");
      } catch {
        // silencioso
      }
    }
  }, [pathname, searchParams, gaId, metaPixelId, analytics, marketing]);

  return null;
}
