"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAVIGATION } from "@/lib/constants/navigation";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

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
          {NAVIGATION.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
