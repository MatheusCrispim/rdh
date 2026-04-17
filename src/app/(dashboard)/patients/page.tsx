import { getPatients } from "@/features/patients";
import { PatientTable } from "@/features/patients/components/patient-table";

export default async function PatientsPage() {
  const patients = getPatients();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Patients</h1>
        <p className="text-muted-foreground">Consultation status for today&apos;s appointments.</p>
      </div>
      <PatientTable patients={patients} />
    </div>
  );
}
