import type { ConsultationNote } from "../models";

type NoteCardProps = {
  note: ConsultationNote;
};

export function NoteCard({ note }: NoteCardProps) {
  const date = new Date(note.createdAt);
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-lg border border-border bg-background p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{note.author}</span>
        <span className="text-muted-foreground">{formatted}</span>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{note.content}</p>
    </div>
  );
}
