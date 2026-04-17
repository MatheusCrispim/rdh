# Plan: Patient List with Consultation Status

## Summary

Build a read-only patient list page inside the existing `(dashboard)` layout. Uses mock data (no DB). Displays patients in a table with colored status badges, filterable by status and searchable by name. Follows the vertical slice architecture: feature lives in `src/features/patients/`, page lives in `src/app/(dashboard)/patients/`.

## User Story

As a receptionist or nurse,
I want to see all patients and their consultation status in one place,
So that I can quickly know who is waiting, in consultation, or done.

## Metadata

| Field | Value |
|-------|-------|
| Type | NEW_CAPABILITY |
| Complexity | LOW |
| Systems Affected | src/features/patients, src/app/(dashboard)/patients |

---

## Patterns to Follow

### Types (no DB — plain TypeScript types)
```ts
// SOURCE: src/features/projects/models.ts:7-8
// For MVP with mock data, skip Drizzle — define plain types directly in models.ts
export type ConsultationStatus = "waiting" | "in-consultation" | "done" | "cancelled";
export type Patient = { id: string; name: string; scheduledAt: string; doctor: string; status: ConsultationStatus; };
```

### Schemas (Zod v4)
```ts
// SOURCE: src/features/projects/schemas.ts:1
import { z } from "zod/v4";
```

### Error Classes
```ts
// SOURCE: src/features/projects/errors.ts:12-22
export class PatientError extends Error {
  readonly code: PatientErrorCode;
  constructor(message: string, code: PatientErrorCode) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}
```

### Index (public API)
```ts
// SOURCE: src/features/projects/index.ts
// Export types, schemas, errors, and service functions. Never export repository directly.
```

### Page (Server Component)
```tsx
// SOURCE: src/app/(dashboard)/dashboard/page.tsx:1-10
// Async server component, imports from feature index, uses shadcn Card/Table components.
```

### Named exports only
```ts
// SOURCE: src/features/projects/schemas.ts — all named exports
// Never use default exports except for Next.js pages/layouts.
```

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `src/features/patients/models.ts` | CREATE | Patient type and ConsultationStatus |
| `src/features/patients/mock-data.ts` | CREATE | 8 mock patients for MVP |
| `src/features/patients/schemas.ts` | CREATE | Zod schema for Patient |
| `src/features/patients/errors.ts` | CREATE | PatientNotFoundError |
| `src/features/patients/service.ts` | CREATE | getPatients(), getPatientsByStatus() |
| `src/features/patients/index.ts` | CREATE | Public API exports |
| `src/features/patients/tests/service.test.ts` | CREATE | Tests for service functions |
| `src/components/ui/badge.tsx` | CREATE (shadcn) | Status badge component |
| `src/features/patients/components/status-badge.tsx` | CREATE | Colored badge per status |
| `src/features/patients/components/patient-table.tsx` | CREATE | Table + filter + search (client component) |
| `src/app/(dashboard)/patients/page.tsx` | CREATE | Page that wires everything together |

---

## Tasks

### Task 1: Define types and mock data

- **File**: `src/features/patients/models.ts`
- **Action**: CREATE
- **Implement**: Define `ConsultationStatus` union type and `Patient` type
- **Mirror**: `src/features/projects/models.ts` — follow same style but no Drizzle imports
- **Validate**: `npx tsc --noEmit`

---

- **File**: `src/features/patients/mock-data.ts`
- **Action**: CREATE
- **Implement**: Export `MOCK_PATIENTS: Patient[]` with 8 entries covering all 4 statuses
- **Validate**: `npx tsc --noEmit`

---

### Task 2: Define Zod schema

- **File**: `src/features/patients/schemas.ts`
- **Action**: CREATE
- **Implement**: `PatientSchema` with all Patient fields using `z` from `zod/v4`
- **Mirror**: `src/features/projects/schemas.ts:1-12`
- **Validate**: `npx tsc --noEmit`

---

### Task 3: Define errors

- **File**: `src/features/patients/errors.ts`
- **Action**: CREATE
- **Implement**: `PatientErrorCode` type, `PatientError` base class, `PatientNotFoundError`
- **Mirror**: `src/features/projects/errors.ts:1-28`
- **Validate**: `npx tsc --noEmit`

---

### Task 4: Implement service

- **File**: `src/features/patients/service.ts`
- **Action**: CREATE
- **Implement**:
  - `getPatients(): Patient[]` — returns all mock patients
  - `getPatientsByStatus(status: ConsultationStatus): Patient[]` — filters by status
  - `getPatientById(id: string): Patient` — throws PatientNotFoundError if missing
- **Mirror**: `src/features/projects/service.ts` — same structure, no DB calls
- **Validate**: `npx tsc --noEmit`

---

### Task 5: Export public API

- **File**: `src/features/patients/index.ts`
- **Action**: CREATE
- **Implement**: Export types, schemas, errors, and service functions
- **Mirror**: `src/features/projects/index.ts`
- **Validate**: `npx tsc --noEmit`

---

### Task 6: Write tests

- **File**: `src/features/patients/tests/service.test.ts`
- **Action**: CREATE
- **Implement**:
  - `getPatients()` returns all 8 patients
  - `getPatientsByStatus("waiting")` returns only waiting patients
  - `getPatientById("invalid-id")` throws PatientNotFoundError
- **Mirror**: `src/features/projects/tests/service.test.ts`
- **Validate**: `bun test`

---

### Task 7: Add shadcn Badge component

- **Action**: RUN
- **Command**: `bunx shadcn@canary add badge`
- **Then**: `bun run lint:fix`
- **Validate**: `npx tsc --noEmit`

---

### Task 8: Create StatusBadge component

- **File**: `src/features/patients/components/status-badge.tsx`
- **Action**: CREATE
- **Implement**: Client component that maps `ConsultationStatus` → Badge with variant/color:
  - `waiting` → yellow (`bg-yellow-100 text-yellow-800`)
  - `in-consultation` → blue (`bg-blue-100 text-blue-800`)
  - `done` → green (`bg-green-100 text-green-800`)
  - `cancelled` → gray (`bg-gray-100 text-gray-600`)
- **Validate**: `npx tsc --noEmit`

---

### Task 9: Create PatientTable component

- **File**: `src/features/patients/components/patient-table.tsx`
- **Action**: CREATE
- **Implement**: `"use client"` component with:
  - Props: `patients: Patient[]`
  - Local state for `activeFilter: ConsultationStatus | "all"` and `search: string`
  - Filter buttons: All / Waiting / In Consultation / Done / Cancelled
  - Search input (filters by patient name, case-insensitive)
  - Table: Name, Scheduled Time, Doctor, Status columns
  - Empty state: "No patients found." when list is empty
- **Validate**: `bun run build`

---

### Task 10: Create page

- **File**: `src/app/(dashboard)/patients/page.tsx`
- **Action**: CREATE
- **Implement**: Async server component that calls `getPatients()` and renders `<PatientTable patients={patients} />`
- **Mirror**: `src/app/(dashboard)/dashboard/page.tsx`
- **Validate**: `bun run build`

---

## Validation

```bash
npx tsc --noEmit   # type check
bun run lint       # lint
bun test           # tests
bun run build      # full build
```

---

## Acceptance Criteria

- [ ] All tasks completed
- [ ] `bun run build` passes with zero errors
- [ ] `bun run lint` passes
- [ ] `bun test` passes (PatientNotFoundError, getPatients, getPatientsByStatus)
- [ ] Page renders at `/patients` inside dashboard layout
- [ ] Filter buttons work correctly
- [ ] Search filters by name
- [ ] Status badges show correct colors
- [ ] Empty state shown when no results
