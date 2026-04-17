import { NoteInvalidContentError } from "./errors";
import { MOCK_NOTES } from "./mock-data";
import type { ConsultationNote } from "./models";
import type { AddNoteInput } from "./schemas";

const notes: ConsultationNote[] = [...MOCK_NOTES];

export function getNotesByPatient(patientId: string): ConsultationNote[] {
  return notes
    .filter((n) => n.patientId === patientId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addNote(input: AddNoteInput): ConsultationNote {
  if (input.content.trim().length < 10) {
    throw new NoteInvalidContentError();
  }
  const note: ConsultationNote = {
    id: `n${Date.now()}`,
    patientId: input.patientId,
    author: input.author,
    content: input.content.trim(),
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  return note;
}
