import type { ReactNode } from "react";

type Variant = "default" | "success" | "warning" | "muted";

const styles: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  success: "bg-primary/10 text-primary",
  warning: "bg-destructive/10 text-destructive",
  muted: "bg-muted text-muted-foreground",
};

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
