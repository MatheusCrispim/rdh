export type { PatientErrorCode } from "./errors";
export { PatientError, PatientNotFoundError } from "./errors";
export type { ConsultationStatus, Patient } from "./models";
export type { PatientInput } from "./schemas";
export { ConsultationStatusSchema, PatientSchema } from "./schemas";
export { getPatientById, getPatients, getPatientsByStatus } from "./service";
