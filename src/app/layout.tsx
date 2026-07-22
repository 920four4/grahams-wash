import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { MobileNav } from "@/components/MobileNav";
import { site } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pressure Washing Rocklin CA | Graham's Wash — Hot Wash, Solar & Lights",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "pressure washing Rocklin",
    "power washing Rocklin CA",
    "solar panel cleaning Rocklin",
    "trash can cleaning Roseville",
    "permanent Christmas lights Rocklin",
    "hot pressure washing Sacramento",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Graham's Wash | Rocklin Pressure Washing, Solar & Permanent Lights",
    description: site.description,
    images: [{ url: "/images/hero/neighborhood.webp", width: 1920, height: 1080, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0177ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1b33" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <LocalBusinessJsonLd />
        <Header />
        <main className="flex-1 pb-app">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
