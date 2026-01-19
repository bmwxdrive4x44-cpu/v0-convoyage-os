import { cn } from "@/lib/utils"

type StatusType = "pending" | "accepted" | "paid" | "completed" | "in-progress" | "rejected" | "upcoming"

const statusStyles: Record<StatusType, string> = {
  pending: "bg-warning/20 text-warning border-warning/30",
  accepted: "bg-success/20 text-success border-success/30",
  paid: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-success/20 text-success border-success/30",
  "in-progress": "bg-primary/20 text-primary border-primary/30",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
  upcoming: "bg-muted text-muted-foreground border-border",
}

const statusLabels: Record<StatusType, string> = {
  pending: "En attente",
  accepted: "Accepté",
  paid: "Payé",
  completed: "Terminé",
  "in-progress": "En cours",
  rejected: "Refusé",
  upcoming: "À venir",
}

interface BadgeStatusProps {
  status: StatusType
  className?: string
}

export function BadgeStatus({ status, className }: BadgeStatusProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  )
}
