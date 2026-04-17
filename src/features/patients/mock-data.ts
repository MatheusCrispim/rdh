import type { Patient } from "./models";

export const MOCK_PATIENTS: Patient[] = [
  { id: "1", name: "Alice Johnson", scheduledAt: "08:00", doctor: "Dr. Smith", status: "done" },
  { id: "2", name: "Bob Martinez", scheduledAt: "08:30", doctor: "Dr. Patel", status: "done" },
  {
    id: "3",
    name: "Carol White",
    scheduledAt: "09:00",
    doctor: "Dr. Smith",
    status: "in-consultation",
  },
  { id: "4", name: "David Lee", scheduledAt: "09:30", doctor: "Dr. Nguyen", status: "waiting" },
  { id: "5", name: "Eva Brown", scheduledAt: "10:00", doctor: "Dr. Patel", status: "waiting" },
  { id: "6", name: "Frank Davis", scheduledAt: "10:30", doctor: "Dr. Smith", status: "waiting" },
  { id: "7", name: "Grace Kim", scheduledAt: "11:00", doctor: "Dr. Nguyen", status: "cancelled" },
  { id: "8", name: "Henry Wilson", scheduledAt: "11:30", doctor: "Dr. Patel", status: "waiting" },
];
