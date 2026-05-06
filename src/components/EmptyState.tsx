import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function EmptyState({
  icon: Icon,
  message,
  actionLabel,
  actionHref,
}: {
  icon: LucideIcon;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon className="h-12 w-12 text-muted-foreground" />
      <p className="mt-4 text-muted-foreground">{message}</p>
      {actionLabel && actionHref && (
        <Link
          to={actionHref}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
