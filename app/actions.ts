'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { addAppointment, deleteAppointment, deleteDoctor, getAppointments, getDoctors, saveDoctor, Appointment, getServices, saveService, deleteService } from '@/lib/db'
import { Doctor, Service } from '@/lib/data'


// Auth
export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string
  // Simple hardcoded password for demo
  if (password === 'admin123') {
    cookies().set('admin_session', 'true', { httpOnly: true, path: '/' })
    redirect('/admin')
  } else {
    // Return error or handle it (for now just redirect back)
    redirect('/admin/login?error=true')
  }
}

export async function logoutAction() {
  cookies().delete('admin_session')
  redirect('/')
}

// Doctors
export async function getDoctorsAction() {
  return await getDoctors()
}

export async function saveDoctorAction(formData: FormData) {
  const id = formData.get('id') as string || Math.random().toString(36).substr(2, 9)
  const name = formData.get('name') as string
  const specialty = formData.get('specialty') as any
  const location = formData.get('location') as string
  const priceRange = formData.get('priceRange') as any
  const bio = formData.get('bio') as string
  const imageUrl = formData.get('imageUrl') as string
  const clinicImagesStr = formData.get('clinicImages') as string
  const clinicImages = clinicImagesStr ? clinicImagesStr.split(',').map(s => s.trim()) : []

  const doctor: Doctor = {
    id,
    name,
    specialty,
    rating: 5.0,
    location,
    priceRange,
    imageUrl: imageUrl || 'https://via.placeholder.com/150',
    bio,
    clinicImages
  }

  await saveDoctor(doctor)
  revalidatePath('/')
  revalidatePath('/admin/doctors')
  redirect('/admin/doctors')
}

export async function deleteDoctorAction(id: string) {
  await deleteDoctor(id)
  revalidatePath('/')
  revalidatePath('/admin/doctors')
}

// Appointments
export async function bookAppointmentAction(data: Omit<Appointment, 'id' | 'createdAt'>) {
  const appointment: Appointment = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  }
  
  await addAppointment(appointment)
  revalidatePath('/admin/appointments')
  revalidatePath(`/doctor/${data.doctorId}`)
  return { success: true }
}

export async function deleteAppointmentAction(id: string) {
  await deleteAppointment(id)
  revalidatePath('/admin/appointments')
}

// Services
export async function getServicesAction() {
  return await getServices()
}

export async function saveServiceAction(formData: FormData) {
  const id = formData.get('id') as string || Math.random().toString(36).substr(2, 9)
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const icon = formData.get('icon') as string

  const service: Service = {
    id,
    title,
    description,
    icon
  }

  await saveService(service)
  revalidatePath('/')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function deleteServiceAction(id: string) {
  await deleteService(id)
  revalidatePath('/')
  revalidatePath('/admin/services')
}
