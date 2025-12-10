import fs from 'fs/promises';
import path from 'path';
import { Doctor, Slot, Service } from './data';
export type { Service };


const DATA_DIR = path.join(process.cwd(), 'data');
const DOCTORS_FILE = path.join(DATA_DIR, 'doctors.json');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');

export type Appointment = {
  id: string;
  patientName: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  phone?: string;
  createdAt: string;
};

// Helper to ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Doctors
export async function getDoctors(): Promise<Doctor[]> {
  try {
    const data = await fs.readFile(DOCTORS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function getDoctorById(id: string): Promise<Doctor | undefined> {
  const doctors = await getDoctors();
  return doctors.find((d) => d.id === id);
}

export async function saveDoctor(doctor: Doctor): Promise<void> {
  await ensureDataDir();
  const doctors = await getDoctors();
  const index = doctors.findIndex((d) => d.id === doctor.id);
  
  if (index >= 0) {
    doctors[index] = doctor;
  } else {
    doctors.push(doctor);
  }
  
  await fs.writeFile(DOCTORS_FILE, JSON.stringify(doctors, null, 2));
}

export async function deleteDoctor(id: string): Promise<void> {
  const doctors = await getDoctors();
  const newDoctors = doctors.filter((d) => d.id !== id);
  await fs.writeFile(DOCTORS_FILE, JSON.stringify(newDoctors, null, 2));
}

// Appointments
export async function getAppointments(): Promise<Appointment[]> {
  try {
    const data = await fs.readFile(APPOINTMENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function addAppointment(appointment: Appointment): Promise<void> {
  await ensureDataDir();
  const appointments = await getAppointments();
  appointments.push(appointment);
  await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
}

export async function deleteAppointment(id: string): Promise<void> {
  const appointments = await getAppointments();
  const newAppointments = appointments.filter((a) => a.id !== id);
  await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(newAppointments, null, 2));
}

// Services
export async function getServices(): Promise<Service[]> {
  try {
    const data = await fs.readFile(SERVICES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((s) => s.id === id);
}

export async function saveService(service: Service): Promise<void> {
  await ensureDataDir();
  const services = await getServices();
  const index = services.findIndex((s) => s.id === service.id);
  
  if (index >= 0) {
    services[index] = service;
  } else {
    services.push(service);
  }
  
  await fs.writeFile(SERVICES_FILE, JSON.stringify(services, null, 2));
}

export async function deleteService(id: string): Promise<void> {
  const services = await getServices();
  const newServices = services.filter((s) => s.id !== id);
  await fs.writeFile(SERVICES_FILE, JSON.stringify(newServices, null, 2));
}
