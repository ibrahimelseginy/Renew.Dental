"use client"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo/Name - Right Side (RTL) */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          <Image 
            src="/logo.png" 
            alt="Renew Dental Center" 
            width={300} 
            height={120} 
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation - Center/Left */}
        <nav className="hidden md:flex items-center gap-12">
          <Link href="/" className="text-white hover:text-primary font-medium transition-colors">
            الرئيسية
          </Link>
          <Link href="#services" className="text-white hover:text-primary font-medium transition-colors">
            الخدمات
          </Link>
          <Link href="#about" className="text-white hover:text-primary font-medium transition-colors">
            عن المركز
          </Link>
          <Link href="#cases" className="text-white hover:text-primary font-medium transition-colors">
            الحالات
          </Link>
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="#booking" 
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            احجز الآن
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white hover:text-primary transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[70] w-full bg-neutral-950 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-end p-6">
                <button 
                  onClick={closeMenu}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Link 
                  href="/" 
                  className="block w-full text-right text-lg font-medium text-white hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  الرئيسية
                </Link>
                <Link 
                  href="#services"
                  className="flex items-center justify-end gap-2 w-full text-lg font-medium text-white hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  <ChevronDown className="h-5 w-5" />
                  <span>الخدمات</span>
                </Link>
                <Link 
                  href="#about" 
                  className="block w-full text-right text-lg font-medium text-white hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  عن المركز
                </Link>
                <Link 
                  href="#cases" 
                  className="block w-full text-right text-lg font-medium text-white hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  الحالات
                </Link>
                
                <div className="pt-4 flex justify-end">
                   <Link 
                    href="#booking" 
                    className="inline-flex h-10 items-center justify-center rounded-md border border-primary bg-transparent px-6 text-base font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
                    onClick={closeMenu}
                  >
                    احجز الآن
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
