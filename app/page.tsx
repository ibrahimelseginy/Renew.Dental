import Stats from "@/components/Stats"
import Testimonials from "@/components/Testimonials"
import Blog from "@/components/Blog"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import About from "@/components/About"
import Cases from "@/components/Cases"
import ContactBanner from "@/components/ContactBanner"
import { getServices } from "@/lib/db"

export default async function HomePage() {
  const services = await getServices()

  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Stats />
      <Services services={services} />
      <About />
      <Cases />
      <Testimonials />
      <Blog />
      <ContactBanner />
    </div>
  )
}
