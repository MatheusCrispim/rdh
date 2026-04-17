import { PatientNotFoundError } from "./errors";
import { MOCK_PATIENTS } from "./mock-data";
import type { ConsultationStatus, Patient } from "./models";

export function getPatients(): Patient[] {
  return MOCK_PATIENTS;
}

export function getPatientsByStatus(status: ConsultationStatus): Patient[] {
  return MOCK_PATIENTS.filter((p) => p.status === status);
}

export function getPatientById(id: string): Patient {
  const patient = MOCK_PATIENTS.find((p) => p.id === id);
  if (!patient) {
    throw new PatientNotFoundError(id);
  }
  return patient;
}
