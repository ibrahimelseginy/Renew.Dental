import type { Metadata } from "next"
import { Alexandria, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Providers from "../components/Providers"

const alexandria = Alexandria({ subsets: ["arabic"], variable: "--font-alexandria" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Renew Dental Center | Trust the experts",
  description: "Renew Dental Center - Trust the experts. فاقوس شارع الدروس أعلي ميركاتو. للحجز: 01068806864",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`min-h-screen bg-neutral-950 text-white ${alexandria.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

