export type ConsultationStatus = "waiting" | "in-consultation" | "done" | "cancelled";

export type Patient = {
  id: string;
  name: string;
  scheduledAt: string;
  doctor: string;
  status: ConsultationStatus;
};
