"use client";

import { useRouter } from "next/navigation";
import type { PropertyFilters } from "@/types/property";
import { buildQueryString } from "@/lib/utils/filters";

export function SortSelect({ filters }: { filters: PropertyFilters }) {
  const router = useRouter();
  return <label className="listing-sort">Sort by <select aria-label="Sort properties" value={filters.sort ?? "newest"} onChange={(event) => {
    const query = buildQueryString({ ...filters, sort: event.target.value as PropertyFilters["sort"], page: 1 });
    router.push(query ? `/properties?${query}` : "/properties");
  }}><option value="newest">Latest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="area">Area</option></select></label>;
}
