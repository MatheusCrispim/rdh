export type ConsultationNoteErrorCode = "NOTE_INVALID_CONTENT";

export class ConsultationNoteError extends Error {
  readonly code: ConsultationNoteErrorCode;

  constructor(message: string, code: ConsultationNoteErrorCode) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

export class NoteInvalidContentError extends ConsultationNoteError {
  constructor() {
    super("Note content must be at least 10 characters", "NOTE_INVALID_CONTENT");
  }
}
