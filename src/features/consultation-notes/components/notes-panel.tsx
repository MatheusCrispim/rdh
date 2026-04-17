"use client";

import { useState } from "react";
import type { ConsultationNote } from "../models";
import { AddNoteForm } from "./add-note-form";
import { NoteCard } from "./note-card";

type NotesPanelProps = {
  patientId: string;
  patientName: string;
  initialNotes: ConsultationNote[];
};

export function NotesPanel({ patientId, patientName, initialNotes }: NotesPanelProps) {
  const [notes, setNotes] = useState<ConsultationNote[]>(initialNotes);

  function handleNoteAdded(note: ConsultationNote) {
    setNotes((prev) => [note, ...prev]);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <a href="/patients" className="text-sm text-muted-foreground hover:text-foreground">
          ← Patients
        </a>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium">{patientName}</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Consultation Notes</h1>
        <p className="text-muted-foreground">{patientName}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Add Note
        </h2>
        <AddNoteForm patientId={patientId} onNoteAdded={handleNoteAdded} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Notes ({notes.length})
        </h2>
        {notes.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No notes yet. Add the first one.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
