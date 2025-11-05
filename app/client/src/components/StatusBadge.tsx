import { Badge } from "@/components/ui/badge";

type JSAStatus = "DRAFT" | "PENDING_SIGNOFF" | "COMPLETE";

interface StatusBadgeProps {
  status: JSAStatus;
  className?: string;
}

const statusConfig = {
  DRAFT: {
    label: "Draft",
    variant: "secondary" as const,
    dotColor: "bg-gray-400"
  },
  PENDING_SIGNOFF: {
    label: "Pending Sign-off",
    variant: "outline" as const,
    dotColor: "bg-yellow-500"
  },
  COMPLETE: {
    label: "Complete",
    variant: "outline" as const,
    dotColor: "bg-green-500"
  }
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className={`gap-1.5 ${className}`} data-testid={`badge-status-${status.toLowerCase()}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </Badge>
  );
}