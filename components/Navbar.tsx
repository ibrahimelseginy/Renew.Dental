"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-500",
      isScrolled ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 py-2 shadow-glow" : "bg-transparent py-4 border-b border-transparent"
    )}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo - Right Side (RTL) */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          <Image 
            src="/logo.png" 
            alt="Renew Dental Center" 
            width={300} 
            height={120} 
            className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(191,153,108,0.3)]"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { name: "الرئيسية", href: "/" },
            { name: "الخدمات", href: "#services" },
            { name: "عن المركز", href: "#about" },
            { name: "الحالات", href: "#cases" },
          ].map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="relative text-white/80 hover:text-primary font-medium transition-colors group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <Link 
            href="#booking" 
            className="btn btn-primary px-8"
          >
            احجز الآن
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white hover:text-primary transition-all active:scale-90"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] w-4/5 max-w-sm bg-neutral-900 border-l border-white/5 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <Image src="/logo.png" alt="Logo" width={120} height={50} className="h-10 w-auto" />
                <button 
                  onClick={closeMenu}
                  className="p-2 text-neutral-400 hover:text-white transition-colors bg-white/5 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
                {[
                  { name: "الرئيسية", href: "/" },
                  { name: "الخدمات", href: "#services" },
                  { name: "عن المركز", href: "#about" },
                  { name: "الحالات", href: "#cases" },
                ].map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link 
                      href={link.href} 
                      className="block text-right text-xl font-medium text-white hover:text-primary transition-colors"
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-8"
                >
                   <Link 
                    href="#booking" 
                    className="w-full btn btn-primary text-xl"
                    onClick={closeMenu}
                  >
                    احجز الآن
                  </Link>
                </motion.div>
              </div>
              
              <div className="p-8 border-t border-white/5 text-center text-neutral-500 text-sm">
                <p>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
