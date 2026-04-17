# Patient List with Consultation Status

## Problem Statement

Medical staff need a quick way to see all patients and their current consultation status in one view. Without this, nurses and receptionists must check multiple systems or ask around to know who is waiting, in consultation, or done.

## Key Hypothesis

We believe a real-time patient list with status badges will reduce the time staff spend tracking patient flow. We'll know we're right when staff can answer "who is waiting?" in under 5 seconds without leaving the page.

## Users

**Primary User**: Receptionist or nurse at a medical clinic.

**Job to Be Done**: When I start my shift or check the floor, I want to see all patients and their current status at a glance, so I can prioritize who needs attention next.

**Non-Users**: Patients themselves, billing staff.

## Solution

A dashboard page that displays a list of patients with their name, scheduled time, doctor assigned, and current consultation status. Status can be updated inline. No backend required for MVP — use mock data.

### MVP Scope

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | List all patients in a table | Core view |
| Must | Show status badge per patient (Waiting, In Consultation, Done, Cancelled) | Key info |
| Must | Filter patients by status | Reduces noise |
| Should | Search by patient name | Quick lookup |
| Won't | Real-time sync via websockets | Out of scope for MVP |
| Won't | Edit patient details | Separate feature |

## Data Shape

```ts
type ConsultationStatus = "waiting" | "in-consultation" | "done" | "cancelled";

type Patient = {
  id: string;
  name: string;
  scheduledAt: string; // "HH:MM"
  doctor: string;
  status: ConsultationStatus;
};
```

## UI Requirements

- Table with columns: Name, Scheduled Time, Doctor, Status
- Status displayed as a colored badge:
  - `waiting` → yellow
  - `in-consultation` → blue
  - `done` → green
  - `cancelled` → gray
- Filter buttons above the table (All / Waiting / In Consultation / Done / Cancelled)
- Search input to filter by patient name
- Empty state message when no patients match the filter

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Page loads with patient list | < 1s | Visual check |
| Filter works correctly | 100% accurate | Manual test |
| Responsive on tablet | No overflow | Visual check |

## Implementation Phases

| # | Phase | Description | Status | Depends |
|---|-------|-------------|--------|---------|
| 1 | Data & Types | Define Patient type and mock data | pending | - |
| 2 | UI Components | Status badge, patient table, filters | pending | 1 |
| 3 | Page | Wire everything into a dashboard page | pending | 2 |

---

*Generated: 2026-04-17*
*Status: READY FOR IMPLEMENTATION*
