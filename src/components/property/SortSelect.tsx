"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import type { PropertyFilters } from "@/types/property";
import { buildQueryString } from "@/lib/utils/filters";

export function SortSelect({ filters }: { filters: PropertyFilters }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return <label className="listing-sort" aria-busy={isPending}>Sort by {isPending ? <LoaderCircle className="animate-spin" size={15} aria-hidden="true" /> : null}<select disabled={isPending} aria-label="Sort properties" value={filters.sort ?? "newest"} onChange={(event) => {
    const query = buildQueryString({ ...filters, sort: event.target.value as PropertyFilters["sort"], page: 1 });
    startTransition(() => router.push(query ? `/properties?${query}` : "/properties"));
  }}><option value="newest">Latest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="area">Area</option></select></label>;
}
