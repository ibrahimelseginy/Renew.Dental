"use client"
import React from "react"
import { AppointmentProvider } from "../context/AppointmentContext"
import { ToastProvider } from "../context/ToastContext"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AppointmentProvider>
        {children}
      </AppointmentProvider>
    </ToastProvider>
  )
}
