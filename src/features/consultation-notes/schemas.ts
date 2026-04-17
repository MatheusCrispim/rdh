import { z } from "zod/v4";

export const ConsultationNoteSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  author: z.string().min(1),
  content: z.string(),
  createdAt: z.string(),
});

export const AddNoteSchema = z.object({
  patientId: z.string(),
  author: z.string().min(1, "Author is required"),
  content: z.string().min(10, "Note must be at least 10 characters"),
});

export type AddNoteInput = z.infer<typeof AddNoteSchema>;
