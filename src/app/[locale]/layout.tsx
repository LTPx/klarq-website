import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Script from "next/script";
import App from "./app";
import { DEFAULT_OG_IMAGE } from "@/app/constants";
import "tailwindcss/tailwind.css";
import "../global.css";

const DEFAULT_DESCRIPTION =
  "Estudio de Arquitectura e Interiorismo en Ibiza y Mallorca, especializado en crear hogares que respiran elegancia y bienestar con esencia Mediterránea y sostenible.";

// Route-level ISR config: the revalidate export alone only caches the
// underlying fetch() calls (Next's Data Cache) — it does NOT make the HTTP
// response itself cacheable. Confirmed via .next/prerender-manifest.json:
// without generateStaticParams, App Router dynamic segments never get
// registered in `dynamicRoutes`, so every response ships
// `Cache-Control: private, no-cache, no-store` regardless of this value.
// generateStaticParams for the locale segment only (no WP fetch, can't fail)
// registers every route nested under [locale] as ISR-eligible, which is what
// actually flips the response header to `s-maxage=60, stale-while-revalidate`.
export const revalidate = 60;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: "KLARQ",
    description: DEFAULT_DESCRIPTION,
    // robots: seoData.robots,
    openGraph: {
      title: "KLARQ",
      description: DEFAULT_DESCRIPTION,
      siteName: "KLARQ",
      locale: locale,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "KLARQ",
      description: DEFAULT_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
    icons: {
      icon: "/images/icon-logo.png",
    },
  };
}

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://klarq.eu/#organization",
      name: "KLARQ",
      url: "https://klarq.eu",
      logo: "https://klarq.eu/images/KLARQ.svg",
      image: DEFAULT_OG_IMAGE,
      email: "info@klarq.eu",
      telephone: "+34656362863",
      areaServed: [
        { "@type": "AdministrativeArea", name: "Ibiza" },
        { "@type": "AdministrativeArea", name: "Mallorca" },
        { "@type": "AdministrativeArea", name: "Balearic Islands" },
      ],
      sameAs: [
        "https://www.instagram.com/klarq.architecture/",
        "https://www.instagram.com/klarq.decor/",
        "https://www.instagram.com/klarq.development/",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://klarq.eu/#ibiza",
      name: "KLARQ Ibiza",
      branchOf: { "@id": "https://klarq.eu/#organization" },
      telephone: "+34656362863",
      email: "info@klarq.eu",
      address: {
        "@type": "PostalAddress",
        streetAddress: "C/ Vicent Serra i Orvay, 49",
        postalCode: "07800",
        addressLocality: "Ibiza",
        addressCountry: "ES",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://klarq.eu/#mallorca",
      name: "KLARQ Mallorca",
      branchOf: { "@id": "https://klarq.eu/#organization" },
      telephone: "+34656362863",
      email: "info@klarq.eu",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Camino viejo de Pina",
        postalCode: "07210",
        addressLocality: "Mallorca",
        addressCountry: "ES",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://klarq.eu/#website",
      url: "https://klarq.eu",
      name: "KLARQ",
      publisher: { "@id": "https://klarq.eu/#organization" },
    },
  ],
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "en" | "es" | "de" };
}) {
  // Required for next-intl to allow static/ISR rendering instead of forcing
  // every page to be fully dynamic (see revalidate config above).
  unstable_setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </head>
      <body>
        {/* KLARQ Pixel — deferred until after hydration so it no longer competes with LCP/hero resources */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4158171417786538');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* noscript pixel fallback moved out of <head> and to the end of <body> — an <img> in
            <head> was being picked up by Next.js's automatic image-preload heuristic and
            competing with the real hero image for bandwidth. */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4158171417786538&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Google Analytics (GA4) — deferred until after hydration, same reasoning as the FB pixel */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0XX8458MEZ"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0XX8458MEZ');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <App locale={locale}>{children}</App>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}