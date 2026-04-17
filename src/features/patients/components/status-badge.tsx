import type { ConsultationStatus } from "../models";

const statusConfig: Record<ConsultationStatus, { label: string; className: string }> = {
  waiting: { label: "Waiting", className: "bg-yellow-100 text-yellow-800" },
  "in-consultation": { label: "In Consultation", className: "bg-blue-100 text-blue-800" },
  done: { label: "Done", className: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-600" },
};

type StatusBadgeProps = {
  status: ConsultationStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
