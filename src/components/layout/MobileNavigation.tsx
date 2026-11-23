"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAVIGATION } from "@/lib/constants/navigation";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const purpose = searchParams.get("purpose");

  return (
    <div className="mobile-navigation">
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
      </button>
      {open ? (
        <nav id="mobile-navigation-panel" className="mobile-nav-panel" aria-label="Mobile navigation">
          {NAVIGATION.map((item) => {
            const active = item.href === "/"
              ? pathname === "/"
              : item.href === "/contact"
                ? pathname === "/contact"
                : pathname === "/properties" && (item.label === "Properties for Rent" ? purpose === "RENT" : purpose !== "RENT");

            return (
              <Link
                key={item.href}
                className={active ? "nav-link-active" : undefined}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
