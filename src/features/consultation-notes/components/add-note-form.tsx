"use client";

import { useState } from "react";
import type { ConsultationNote } from "../models";

type AddNoteFormProps = {
  patientId: string;
  onNoteAdded: (note: ConsultationNote) => void;
};

export function AddNoteForm({ patientId, onNoteAdded }: AddNoteFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (content.trim().length < 10) {
      setError("Note must be at least 10 characters.");
      return;
    }

    setIsPending(true);
    const note: ConsultationNote = {
      id: `n${Date.now()}`,
      patientId,
      author: "Dr. Current User",
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    onNoteAdded(note);
    setContent("");
    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a clinical note... (min. 10 characters)"
        rows={3}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="self-end rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Add Note"}
      </button>
    </form>
  );
}
