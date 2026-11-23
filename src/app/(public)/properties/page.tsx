import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertyListingContent } from "@/components/property/PropertyListingContent";
import { getAmenities, getProperties } from "@/server/queries/properties";
import { getAreasByCity, getCities } from "@/server/queries/locations";
import { parseFilters, type SearchParams } from "@/lib/utils/filters";
import { PropertyListingSkeleton } from "@/components/ui/LoadingSkeletons";

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const filters = parseFilters(await searchParams);
  return {
    title: filters.purpose === "RENT" ? "Properties for Rent | Maskan" : "Properties for Sale | Maskan",
    description: "Browse properties across Egypt at the best prices and locations.",
  };
}

async function Listing({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const raw = await searchParams;
  const parsed = parseFilters(raw);
  const filters = { ...parsed, purpose: parsed.purpose ?? "SALE" as const, pageSize: parsed.pageSize ?? 9 };
  const [{ items, total, page, pageSize }, cities, amenities] = await Promise.all([
    getProperties(filters), getCities(), getAmenities(),
  ]);
  const areas = (await Promise.all(cities.map((city) => getAreasByCity(city.slug)))).flat();
  return <PropertyListingContent properties={items} total={total} page={page} pageSize={pageSize} filters={filters} cities={cities} areas={areas} amenities={amenities}/>;
}

export default function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return <Suspense fallback={<PropertyListingSkeleton />}><Listing searchParams={searchParams}/></Suspense>;
}
