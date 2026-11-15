import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
}) {
  return (
    <button
      className={cn("button", "button-" + variant, className)}
      {...props}
    />
  );
}
