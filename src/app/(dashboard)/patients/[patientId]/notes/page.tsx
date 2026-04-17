import { notFound } from "next/navigation";
import { getNotesByPatient } from "@/features/consultation-notes";
import { NotesPanel } from "@/features/consultation-notes/components/notes-panel";
import { getPatientById, PatientNotFoundError } from "@/features/patients";

type Props = {
  params: Promise<{ patientId: string }>;
};

export default async function ConsultationNotesPage({ params }: Props) {
  const { patientId } = await params;

  let patient: ReturnType<typeof getPatientById>;
  try {
    patient = getPatientById(patientId);
  } catch (e) {
    if (e instanceof PatientNotFoundError) {
      notFound();
    }
    throw e;
  }

  const notes = getNotesByPatient(patientId);

  return <NotesPanel patientId={patientId} patientName={patient.name} initialNotes={notes} />;
}
