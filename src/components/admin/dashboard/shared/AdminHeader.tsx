"use client";

import { ShieldCheck, User } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/layout/Container";

interface AdminHeaderProps {
  admin?: {
    name: string;
    email: string;
  };
}

export function AdminHeader({ admin }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-border bg-bg-surface shadow-xs">
      <Container className="admin-dashboard-container flex h-full items-center justify-between">
        <h1 className="font-[var(--font-cairo)] text-lg font-bold tracking-tight text-text-primary sm:text-xl">
          Dashboard
        </h1>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="flex items-center gap-2 border-l border-border pl-2">
            <div className="flex items-center gap-2 pl-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-on-primary shadow-xs ring-2 ring-primary/20">
                {admin ? (
                  <span className="text-xs font-bold">
                    {admin.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={18} aria-hidden="true" />
                )}
              </div>
              <div className="hidden flex-col text-left sm:flex">
                <span className="flex items-center gap-1 text-xs font-semibold leading-tight text-text-primary">
                  {admin?.name || "Administrator"}
                  <ShieldCheck size={13} className="text-primary" />
                </span>
                <span className="text-[11px] leading-tight text-text-muted">
                  {admin?.email || "admin@maskan.com"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </header>
  );
}
