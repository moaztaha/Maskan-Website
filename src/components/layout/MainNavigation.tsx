'use client';

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { NAVIGATION } from "@/lib/constants/navigation";

export function MainNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const purpose = searchParams.get("purpose");

  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      {NAVIGATION.map((item) => {
        const active = item.href === "/"
          ? pathname === "/"
          : item.href === "/contact"
            ? pathname === "/contact"
            : pathname === "/properties" && (item.label === "Properties for Rent" ? purpose === "RENT" : purpose !== "RENT");

        return (
          <Link
            key={item.href}
            className={active ? "nav-link nav-link-active" : "nav-link"}
            href={item.href}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

