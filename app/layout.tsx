import type { Metadata } from "next"
import { Alexandria, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const alexandria = Alexandria({ 
  subsets: ["arabic", "latin"],
  variable: '--font-alexandria',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Renew Dental Center | Trust the Experts",
  description: "مركز متخصص في طب وجراحة الفم والأسنان بأحدث التقنيات. فاقوس، شارع الدروس.",
  icons: {
    icon: "/favicon.svg",
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-black min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
