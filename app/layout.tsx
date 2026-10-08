import type { Metadata, Viewport } from "next";
import { Manrope, Marcellus } from "next/font/google";
import { AntdProvider } from "@/components/providers/AntdProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { phones, site } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Self-hosted at build time by next/font: no request to Google at runtime, no layout shift.
const marcellus = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-marcellus", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Chauffeur & Airport Limousine Service, Worldwide`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Chauffeured, worldwide`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Chauffeured, worldwide`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#131417" },
    { media: "(prefers-color-scheme: dark)", color: "#131417" },
  ],
  colorScheme: "light dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo-bronze-light-bg.png`,
      slogan: site.tagline,
      email: site.email,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "reservations",
        telephone: phones.map((p) => p.number),
        email: site.email,
        availableLanguage: ["English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is corrected before first paint by the inline script, hence suppressHydrationWarning.
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${marcellus.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <a href="#main" className="ow-skip">
          Skip to content
        </a>
        <AntdProvider>
          <MotionProvider>{children}</MotionProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
