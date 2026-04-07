import Stats from "@/components/Stats"
import Testimonials from "@/components/Testimonials"
import Blog from "@/components/Blog"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import About from "@/components/About"
import Cases from "@/components/Cases"
import ContactBanner from "@/components/ContactBanner"
import BookingSection from "@/components/BookingSection"
import { SERVICES, DUMMY_DOCTORS } from "@/lib/data"

export default function HomePage() {
  const services = SERVICES
  const doctors = DUMMY_DOCTORS

  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Stats />
      <Services services={services} />
      <BookingSection doctors={doctors} services={services} />
      <About />
      <Cases />
      <Testimonials />
      <Blog />
      <ContactBanner />
    </div>
  )
}
