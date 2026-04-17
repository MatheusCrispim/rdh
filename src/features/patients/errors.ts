export type PatientErrorCode = "PATIENT_NOT_FOUND";

export class PatientError extends Error {
  readonly code: PatientErrorCode;

  constructor(message: string, code: PatientErrorCode) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

export class PatientNotFoundError extends PatientError {
  constructor(id: string) {
    super(`Patient not found: ${id}`, "PATIENT_NOT_FOUND");
  }
}
