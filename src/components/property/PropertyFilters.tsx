"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import type { Amenity, Area, City, PropertyFilters as Filters, PropertyType } from "@/types/property";
import { PROPERTY_TYPE_LABELS } from "@/lib/constants/property";
import { buildQueryString, parseFilters } from "@/lib/utils/filters";

const types: PropertyType[] = ["APARTMENT", "VILLA", "DUPLEX", "LAND", "SHOP", "OFFICE", "CHALET"];

export function PropertyFilters({ filters, cities, areas, amenities }: { filters: Filters; cities: City[]; areas: Area[]; amenities: Amenity[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  function submit(formData: FormData) {
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
    const chosen = formData.getAll("amenities").map(String);
    const next = parseFilters({ ...raw, amenities: chosen.join(","), page: "1", purpose: raw.purpose || filters.purpose || "SALE" });
    const query = buildQueryString({ ...next, page: 1 });
    startTransition(() => router.push(query ? `/properties?${query}` : "/properties"));
  }
  return <form action={submit} className="listing-filter-form" aria-busy={isPending}>
    <div className="filter-purpose-section"><span>Purpose</span><div className="filter-purpose"><label><input type="radio" name="purpose" value="SALE" defaultChecked={filters.purpose !== "RENT"}/> Buy</label><label><input type="radio" name="purpose" value="RENT" defaultChecked={filters.purpose === "RENT"}/> Rent</label></div></div>
    <fieldset><legend>Property Type</legend><div className="filter-type-grid">{types.map((type) => <label key={type}><input type="radio" name="type" value={type} defaultChecked={filters.type === type}/>{PROPERTY_TYPE_LABELS[type].en}</label>)}</div></fieldset>
    <fieldset><legend>City &amp; Region</legend><select aria-label="City" name="citySlug" defaultValue={filters.citySlug ?? ""}><option value="">All cities</option>{cities.map((city) => <option key={city.id} value={city.slug}>{city.name}</option>)}</select><select aria-label="Area" name="areaSlug" defaultValue={filters.areaSlug ?? ""}><option value="">All areas</option>{areas.map((area) => <option key={area.id} value={area.slug}>{area.name}</option>)}</select></fieldset>
    <fieldset><legend>Price (EGP)</legend><div className="filter-range"><input type="number" name="minPrice" min="0" placeholder="Min" defaultValue={filters.minPrice}/><input type="number" name="maxPrice" min="0" placeholder="Max" defaultValue={filters.maxPrice}/></div></fieldset>
    <fieldset><legend>Bedrooms</legend><div className="filter-pills">{[1,2,3,4,5].map((n)=><label key={n}><input type="radio" name="bedrooms" value={n} defaultChecked={filters.bedrooms === n}/>{n}{n===5?"+":""}</label>)}</div></fieldset>
    <fieldset><legend>Bathrooms</legend><div className="filter-pills">{[1,2,3,4].map((n)=><label key={n}><input type="radio" name="bathrooms" value={n} defaultChecked={filters.bathrooms === n}/>{n}{n===4?"+":""}</label>)}</div></fieldset>
    <fieldset><legend>Area (m²)</legend><div className="filter-range"><input type="number" name="minArea" min="0" placeholder="Min" defaultValue={filters.minArea}/><input type="number" name="maxArea" min="0" placeholder="Max" defaultValue={filters.maxArea}/></div></fieldset>
    <fieldset><legend>Features</legend><div className="filter-features">{amenities.map((item)=><label key={item.id}><input type="checkbox" name="amenities" value={item.slug} defaultChecked={filters.amenities?.includes(item.slug)}/>{item.name}</label>)}</div></fieldset>
    <button className="button-primary filter-apply" type="submit" disabled={isPending}>{isPending ? <LoaderCircle className="mr-2 inline-block animate-spin align-middle" size={16} aria-hidden="true" /> : null}{isPending ? "Applying…" : "Apply Filters"}</button>
  </form>;
}
