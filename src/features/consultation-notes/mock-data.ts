import type { ConsultationNote } from "./models";

export const MOCK_NOTES: ConsultationNote[] = [
  {
    id: "n1",
    patientId: "1",
    author: "Dr. Smith",
    content:
      "Patient presented with mild fever. Prescribed ibuprofen 400mg. Follow-up in 7 days if symptoms persist.",
    createdAt: "2026-04-17T08:15:00Z",
  },
  {
    id: "n2",
    patientId: "1",
    author: "Dr. Smith",
    content:
      "Blood pressure slightly elevated at 140/90. Advised lifestyle changes. Monitoring required.",
    createdAt: "2026-04-10T09:00:00Z",
  },
  {
    id: "n3",
    patientId: "2",
    author: "Dr. Patel",
    content: "Routine checkup. All vitals normal. No medication changes needed.",
    createdAt: "2026-04-17T08:45:00Z",
  },
  {
    id: "n4",
    patientId: "3",
    author: "Dr. Smith",
    content:
      "Patient reports persistent headaches for the past week. Ordered MRI. Referred to neurology.",
    createdAt: "2026-04-17T09:10:00Z",
  },
];
