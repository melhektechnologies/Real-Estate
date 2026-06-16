import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Melhek Real Estate OS — Global property transactions, automated.",
  description:
    "The premium operating system for global real estate. Discover verified listings, explore neighborhoods, estimate mortgages, and close deals — all in one intelligent platform.",
  keywords: [
    "real estate",
    "proptech",
    "property listings",
    "mortgage calculator",
    "real estate OS",
    "Melhek",
  ],
  openGraph: {
    title: "Melhek Real Estate OS",
    description: "Global property transactions, automated.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
