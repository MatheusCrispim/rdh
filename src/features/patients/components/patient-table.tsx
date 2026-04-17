"use client";

import { useState } from "react";
import type { ConsultationStatus, Patient } from "../models";
import { StatusBadge } from "./status-badge";

type FilterOption = ConsultationStatus | "all";

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "waiting", label: "Waiting" },
  { value: "in-consultation", label: "In Consultation" },
  { value: "done", label: "Done" },
  { value: "cancelled", label: "Cancelled" },
];

type PatientTableProps = {
  patients: Patient[];
};

export function PatientTable({ patients }: PatientTableProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) => {
    const matchesStatus = activeFilter === "all" || p.status === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map(({ value, label }) => (
            <button
              type="button"
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                activeFilter === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No patients found.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Scheduled</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((patient) => (
                <tr key={patient.id} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{patient.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{patient.scheduledAt}</td>
                  <td className="px-4 py-3 text-muted-foreground">{patient.doctor}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/patients/${patient.id}/notes`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Notes
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
