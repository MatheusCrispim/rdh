import { z } from "zod/v4";

export const ConsultationStatusSchema = z.enum(["waiting", "in-consultation", "done", "cancelled"]);

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  scheduledAt: z.string().regex(/^\d{2}:\d{2}$/),
  doctor: z.string().min(1),
  status: ConsultationStatusSchema,
});

export type PatientInput = z.infer<typeof PatientSchema>;
