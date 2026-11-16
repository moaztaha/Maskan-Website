import Link from "next/link";
import type { Amenity, Area, City, Property, PropertyFilters as Filters } from "@/types/property";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { SortSelect } from "@/components/property/SortSelect";
import { Pagination } from "@/components/ui/Pagination";
import { PROPERTY_PURPOSE_LABELS, PROPERTY_TYPE_LABELS } from "@/lib/constants/property";
import { buildQueryString } from "@/lib/utils/filters";
import { Container } from "@/components/layout/Container";
import { SlidersHorizontal } from "lucide-react";

export function PropertyListingContent({ properties, total, page, pageSize, filters, cities, areas, amenities }: {
  properties: Property[]; total: number; page: number; pageSize: number;
  filters: Filters; cities: City[]; areas: Area[]; amenities: Amenity[];
}) {
  const active: { label: string; href: string }[] = [];
  const without = (key: keyof Filters) => buildQueryString({ ...filters, [key]: undefined, page: 1 });
  if (filters.purpose) active.push({ label: PROPERTY_PURPOSE_LABELS[filters.purpose].en, href: without("purpose") });
  if (filters.type) active.push({ label: PROPERTY_TYPE_LABELS[filters.type].en, href: without("type") });
  if (filters.citySlug) active.push({ label: cities.find((city) => city.slug === filters.citySlug)?.name ?? filters.citySlug, href: without("citySlug") });
  if (filters.areaSlug) active.push({ label: filters.areaSlug, href: without("areaSlug") });
  if (filters.bedrooms) active.push({ label: `${filters.bedrooms}+ Bedrooms`, href: without("bedrooms") });
  for (const slug of filters.amenities ?? []) active.push({ label: amenities.find((item) => item.slug === slug)?.name ?? slug, href: buildQueryString({ ...filters, amenities: filters.amenities?.filter((item) => item !== slug), page: 1 }) });
  const heading = filters.purpose === "RENT" ? "Properties for Rent in Egypt" : "Properties for Sale in Egypt";

  return <Container className="listing-page">
    <nav className="listing-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Properties for {filters.purpose === "RENT" ? "Rent" : "Sale"}</span></nav>
    <header className="listing-heading"><h1>{heading}</h1><p>Browse the latest properties available for {filters.purpose === "RENT" ? "rent" : "sale"} at the best prices and locations</p></header>
    <div className="listing-layout">
      <aside className="listing-sidebar" aria-label="Property filters"><div className="listing-sidebar-heading"><h2><SlidersHorizontal size={14} aria-hidden="true"/>Filter Results</h2><Link href="/properties">Clear All</Link></div><PropertyFilters filters={filters} cities={cities} areas={areas} amenities={amenities}/></aside>
      <section className="listing-results" aria-label="Property results">
        <div className="listing-toolbar"><p><strong>{total.toLocaleString("en-EG")}</strong> properties found</p><SortSelect filters={filters}/></div>
        {active.length ? <div className="listing-chips" aria-label="Active filters"><span>Active Filters:</span>{active.map((chip,index)=><Link key={`${chip.label}-${index}`} href={chip.href ? `/properties?${chip.href}` : "/properties"}>{chip.label}<span aria-hidden="true">×</span></Link>)}<Link className="listing-clear" href="/properties">Clear all</Link></div> : null}
        {properties.length ? <div className="listing-grid">{properties.map((property)=><PropertyCard key={property.id} property={property}/>)}</div> : <div className="listing-empty"><h2>No properties found</h2><p>Try changing your filters to see more properties.</p><Link href="/properties">Clear filters</Link></div>}
        <Pagination page={page} pageSize={pageSize} total={total} filters={filters}/>
      </section>
    </div>
  </Container>;
}
