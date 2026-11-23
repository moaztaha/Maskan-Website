import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "outline" | "neutral";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
  dot = false,
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-primary-soft text-primary border-primary/20",
    secondary: "bg-accent-soft text-accent border-accent/20",
    success: "bg-success-soft text-success border-success/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    outline: "bg-transparent text-text-secondary border-border",
    neutral: "bg-bg-subtle text-text-secondary border-border",
  };

  const dotStyles = {
    primary: "bg-primary",
    secondary: "bg-accent",
    success: "bg-success",
    danger: "bg-danger",
    warning: "bg-amber-500",
    outline: "bg-text-secondary",
    neutral: "bg-text-muted",
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs font-medium px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotStyles[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
