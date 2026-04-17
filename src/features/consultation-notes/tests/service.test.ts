import { describe, expect, it } from "bun:test";
import { NoteInvalidContentError } from "../errors";
import { addNote, getNotesByPatient } from "../service";

describe("getNotesByPatient", () => {
  it("returns notes for a given patient", () => {
    const notes = getNotesByPatient("1");
    expect(notes.length).toBeGreaterThan(0);
    expect(notes.every((n) => n.patientId === "1")).toBe(true);
  });

  it("returns empty array for patient with no notes", () => {
    expect(getNotesByPatient("99")).toHaveLength(0);
  });

  it("returns notes in reverse chronological order", () => {
    const notes = getNotesByPatient("1");
    expect(notes[0]!.createdAt >= notes[1]!.createdAt).toBe(true);
  });
});

describe("addNote", () => {
  it("adds a note and returns it", () => {
    const note = addNote({
      patientId: "4",
      author: "Dr. Nguyen",
      content: "Patient is stable and recovering well.",
    });
    expect(note.patientId).toBe("4");
    expect(note.author).toBe("Dr. Nguyen");
  });

  it("throws NoteInvalidContentError when content is too short", () => {
    expect(() => addNote({ patientId: "4", author: "Dr. Nguyen", content: "short" })).toThrow(
      NoteInvalidContentError,
    );
  });
});
