"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  className = "", 
  direction = "up" 
}: FadeInProps) {
  const directionOffset = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none: { x: 0, y: 0 }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...(direction !== "none" ? directionOffset[direction] : {}) 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.4, 
        delay: delay,
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
