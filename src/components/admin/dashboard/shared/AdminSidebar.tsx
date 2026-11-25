"use client";

import Link from "next/link";
import { LayoutDashboard, Building2, LoaderCircle, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { logoutAdmin } from "@/server/actions/auth";

const items = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Properties", href: "/admin/properties", icon: Building2 },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const [isLoggingOut, startLogout] = useTransition();

  function handleLogout() {
    startLogout(async () => {
      await logoutAdmin();
    });
  }

  return (
    <aside className="flex flex-col border-b border-border bg-bg-surface md:min-h-[calc(100vh-4rem)] md:w-60 md:shrink-0 md:border-b-0 md:border-r">
      <nav aria-label="Admin navigation" className="flex gap-2 overflow-x-auto p-3 md:sticky md:top-16 md:flex-col md:gap-1 md:p-4">
        {items.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-11 shrink-0 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors ${active ? "bg-primary-soft text-primary" : "text-text-secondary hover:bg-bg-subtle hover:text-text-primary"}`}><Icon size={18} aria-hidden="true" /><span>{label}</span></Link>;
        })}
      </nav>
      <div className="mt-2 border-t border-border p-3 md:mt-auto md:p-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          aria-label={isLoggingOut ? "Logging out" : "Log out"}
          aria-busy={isLoggingOut}
          className="inline-flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-danger/10 hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoggingOut ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <LogOut size={18} aria-hidden="true" />}
          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </button>
      </div>
    </aside>
  );
}
