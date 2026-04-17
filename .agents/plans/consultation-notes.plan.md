# Plan: Consultation Notes

## Summary

Build a consultation notes feature allowing clinical staff to view and add notes per patient. Notes are stored in-memory using mock data (no DB for MVP). Follows the vertical slice pattern in `src/features/consultation-notes/`. Page lives at `/patients/[patientId]/notes` inside the existing `(dashboard)` layout. The patient list gets a "View Notes" link per row.

## User Story

As a doctor or nurse,
I want to read and write clinical notes for a patient's consultation,
So that I can record observations and hand off context accurately.

## Metadata

| Field | Value |
|-------|-------|
| Type | NEW_CAPABILITY |
| Complexity | LOW |
| Systems Affected | src/features/consultation-notes, src/app/(dashboard)/patients/[patientId], src/features/patients/components/patient-table.tsx |

---

## Patterns to Follow

### Types (plain TypeScript, no Drizzle)
```ts
// SOURCE: src/features/patients/models.ts
export type ConsultationNote = {
  id: string;
  patientId: string;
  author: string;
  content: string;
  createdAt: string;
};
```

### Zod schema (zod/v4)
```ts
// SOURCE: src/features/patients/schemas.ts:1
import { z } from "zod/v4";
```

### Error class
```ts
// SOURCE: src/features/patients/errors.ts:4-21
export class ConsultationNoteError extends Error {
  readonly code: ConsultationNoteErrorCode;
  constructor(message: string, code: ConsultationNoteErrorCode) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}
```

### Service (in-memory mutation)
```ts
// SOURCE: src/features/patients/service.ts
// No DB — operate on a module-level array seeded from mock data
const notes: ConsultationNote[] = [...MOCK_NOTES];
```

### Public API index
```ts
// SOURCE: src/features/patients/index.ts
// Export types, schemas, errors, service functions. Never export internal mock data directly.
```

### Dynamic page (App Router)
```tsx
// SOURCE: src/app/(dashboard)/patients/[patientId]/notes/page.tsx
// Async server component. Receives params: Promise<{ patientId: string }>.
// Uses notFound() from next/navigation for missing patients.
```

### Tests
```ts
// SOURCE: src/features/patients/tests/service.test.ts
import { describe, expect, it } from "bun:test";
```

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `src/features/consultation-notes/models.ts` | CREATE | ConsultationNote type |
| `src/features/consultation-notes/mock-data.ts` | CREATE | 4 mock notes across patients 1–3 |
| `src/features/consultation-notes/schemas.ts` | CREATE | Zod schemas: ConsultationNoteSchema, AddNoteSchema |
| `src/features/consultation-notes/errors.ts` | CREATE | NoteInvalidContentError |
| `src/features/consultation-notes/service.ts` | CREATE | getNotesByPatient, addNote |
| `src/features/consultation-notes/index.ts` | CREATE | Public API exports |
| `src/features/consultation-notes/tests/service.test.ts` | CREATE | 5 tests covering core behaviors |
| `src/features/consultation-notes/components/note-card.tsx` | CREATE | Single note display (author, date, content) |
| `src/features/consultation-notes/components/add-note-form.tsx` | CREATE | Client form with inline validation |
| `src/features/consultation-notes/components/notes-panel.tsx` | CREATE | Client component combining list + form |
| `src/app/(dashboard)/patients/[patientId]/notes/page.tsx` | CREATE | Server page wiring patient + notes |
| `src/features/patients/components/patient-table.tsx` | UPDATE | Add "View Notes" column with link |

---

## Tasks

### Task 1: Define types and mock data

- **File**: `src/features/consultation-notes/models.ts`
- **Action**: CREATE
- **Implement**: `ConsultationNote` type
- **Mirror**: `src/features/patients/models.ts`
- **Validate**: `npx tsc --noEmit`

---

- **File**: `src/features/consultation-notes/mock-data.ts`
- **Action**: CREATE
- **Implement**: `MOCK_NOTES: ConsultationNote[]` with 4 entries for patients 1, 2, 3
- **Validate**: `npx tsc --noEmit`

---

### Task 2: Define Zod schemas

- **File**: `src/features/consultation-notes/schemas.ts`
- **Action**: CREATE
- **Implement**: `ConsultationNoteSchema` (full object), `AddNoteSchema` (patientId + author + content min 10 chars)
- **Mirror**: `src/features/patients/schemas.ts`
- **Validate**: `npx tsc --noEmit`

---

### Task 3: Define errors

- **File**: `src/features/consultation-notes/errors.ts`
- **Action**: CREATE
- **Implement**: `NoteInvalidContentError` for content < 10 chars
- **Mirror**: `src/features/patients/errors.ts`
- **Validate**: `npx tsc --noEmit`

---

### Task 4: Implement service

- **File**: `src/features/consultation-notes/service.ts`
- **Action**: CREATE
- **Implement**:
  - `getNotesByPatient(patientId)` — filter + sort descending by `createdAt`
  - `addNote(input)` — validate content length, push to module array, return new note
- **Mirror**: `src/features/patients/service.ts`
- **Validate**: `npx tsc --noEmit`

---

### Task 5: Export public API

- **File**: `src/features/consultation-notes/index.ts`
- **Action**: CREATE
- **Mirror**: `src/features/patients/index.ts`
- **Validate**: `npx tsc --noEmit`

---

### Task 6: Write tests

- **File**: `src/features/consultation-notes/tests/service.test.ts`
- **Action**: CREATE
- **Implement**:
  - `getNotesByPatient("1")` returns notes only for patient 1
  - `getNotesByPatient("99")` returns empty array
  - Notes returned in reverse chronological order
  - `addNote(valid)` returns new note with correct patientId
  - `addNote({ content: "short" })` throws `NoteInvalidContentError`
- **Mirror**: `src/features/patients/tests/service.test.ts`
- **Validate**: `bun test src/features/consultation-notes`

---

### Task 7: Create NoteCard component

- **File**: `src/features/consultation-notes/components/note-card.tsx`
- **Action**: CREATE
- **Implement**: Server component showing author, formatted date, content
- **Validate**: `npx tsc --noEmit`

---

### Task 8: Create AddNoteForm component

- **File**: `src/features/consultation-notes/components/add-note-form.tsx`
- **Action**: CREATE
- **Implement**: `"use client"` — textarea + submit, inline validation (min 10 chars), calls `onNoteAdded` callback
- **Validate**: `npx tsc --noEmit`

---

### Task 9: Create NotesPanel component

- **File**: `src/features/consultation-notes/components/notes-panel.tsx`
- **Action**: CREATE
- **Implement**: `"use client"` — holds notes state, renders breadcrumb + AddNoteForm + list of NoteCards + empty state
- **Validate**: `bun run build`

---

### Task 10: Create page

- **File**: `src/app/(dashboard)/patients/[patientId]/notes/page.tsx`
- **Action**: CREATE
- **Implement**: Async server component — resolves patientId from params, calls `getPatientById` (notFound on error), calls `getNotesByPatient`, renders `<NotesPanel />`
- **Mirror**: `src/app/(dashboard)/patients/page.tsx`
- **Validate**: `bun run build`

---

### Task 11: Add "View Notes" link in PatientTable

- **File**: `src/features/patients/components/patient-table.tsx`
- **Action**: UPDATE
- **Implement**: Add Notes column header + `<a href={/patients/${patient.id}/notes}>View Notes</a>` cell
- **Validate**: `bun run lint && npx tsc --noEmit`

---

## Validation

```bash
npx tsc --noEmit    # type check
bun run lint        # lint
bun test src/features/patients src/features/consultation-notes  # tests
```

---

## Acceptance Criteria

- [ ] All tasks completed
- [ ] TypeScript passes with zero errors
- [ ] Lint passes (zero errors)
- [ ] 10 tests passing across both features
- [ ] `/patients` shows "View Notes" link per row
- [ ] `/patients/[id]/notes` renders notes for that patient
- [ ] Add Note form validates min 10 characters
- [ ] Empty state shown for patients with no notes
- [ ] Notes ordered most recent first
