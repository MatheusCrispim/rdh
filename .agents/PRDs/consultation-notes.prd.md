# Consultation Notes

## Problem Statement

Doctors and nurses need a way to record and retrieve short clinical notes tied to a specific consultation. Without this, notes are taken on paper or in separate tools, making it hard to review what was observed or decided during a visit.

## Key Hypothesis

We believe a lightweight notes panel per patient will reduce information loss during consultations. We'll know we're right when staff can read back a note for any patient without leaving the dashboard.

## Users

**Primary User**: Doctor or nurse conducting or reviewing a consultation.

**Job to Be Done**: When I finish a consultation, I want to write a quick note about the patient's condition and decisions, so I can recall or hand off context accurately.

**Non-Users**: Patients, billing staff, administrators.

## Solution

A notes panel that appears alongside the patient list. Clicking a patient opens their notes, where staff can read existing notes and add new ones. MVP uses mock data — no backend required.

### MVP Scope

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | List notes per patient | Core view |
| Must | Add a new note (text + timestamp + author) | Core action |
| Must | Show empty state when no notes exist | UX completeness |
| Should | Display notes in reverse chronological order | Most recent first is natural |
| Won't | Edit or delete notes | Audit trail — notes are immutable |
| Won't | Rich text / attachments | Out of scope for MVP |

## Data Shape

```ts
type ConsultationNote = {
  id: string;
  patientId: string;
  author: string;
  content: string;
  createdAt: string; // ISO timestamp
};
```

## UI Requirements

- Notes panel is a separate page at `/patients/[patientId]/notes`
- Header shows patient name and back link to `/patients`
- List of notes, most recent first, each showing author, relative time, and content
- "Add Note" form at the bottom: textarea + submit button
- Form validates: content must be at least 10 characters
- Empty state: "No notes yet. Add the first one."

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Notes render per patient | Correct | Manual test |
| Add note form validates | Correct | Manual test |
| Empty state shown | Correct | Visual check |

## Implementation Phases

| # | Phase | Description | Status | Depends |
|---|-------|-------------|--------|---------|
| 1 | Data & Types | ConsultationNote type, mock data, Zod schema | pending | - |
| 2 | Service | getNotesByPatient, addNote (in-memory) | pending | 1 |
| 3 | UI | NoteCard, AddNoteForm components | pending | 2 |
| 4 | Page | /patients/[patientId]/notes route | pending | 3 |
| 5 | Link | Add "View Notes" link in PatientTable | pending | 4 |

---

*Generated: 2026-04-17*
*Status: READY FOR IMPLEMENTATION*
