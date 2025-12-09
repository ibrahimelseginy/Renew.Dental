"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

export type Appointment = {
  id: string
  patientName: string
  doctorId: string
  date: string
  time: string
  reason: string
}

type AppointmentContextType = {
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

const sampleAppointments: Appointment[] = [
  { id: "a1", patientName: "Mohamed Ali", doctorId: "d1", date: new Date().toISOString().split("T")[0], time: "10:00", reason: "Braces consult" },
  { id: "a2", patientName: "Sara Ahmed", doctorId: "d3", date: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split("T")[0], time: "14:00", reason: "Root canal" },
  { id: "a3", patientName: "Youssef Gamal", doctorId: "d2", date: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split("T")[0], time: "09:00", reason: "Extraction" },
]

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // Load sample data on mount (simulation of fetching)
  useEffect(() => {
    setAppointments(sampleAppointments)
  }, [])

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider")
  }
  return context
}
