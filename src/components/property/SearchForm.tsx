"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormEvent } from "react";
import { Search } from "lucide-react";
import {
  HOME_PROPERTY_CATEGORY_ORDER,
  PROPERTY_TYPE_LABELS,
} from "@/lib/constants/property";
import { buildQueryString, parseFilters, type SearchParams } from "@/lib/utils/filters";
import type { Area, City, PropertyFilters } from "@/types/property";

export function SearchForm({
  cities,
  areas,
  initialFilters,
}: {
  cities: City[];
  areas: Area[];
  initialFilters: PropertyFilters;
}) {
  const router = useRouter();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = Object.fromEntries(formData.entries()) as SearchParams;
    const query = buildQueryString(parseFilters(params));
    router.push(query ? "/properties?" + query : "/properties");
  }

  return (
    <form className="search-panel" onSubmit={submitSearch}>
      <fieldset className="purpose-tabs">
        <legend className="visually-hidden">Listing purpose</legend>
        {(["SALE", "RENT"] as const).map((purpose) => (
          <label className="purpose-tab" key={purpose}>
            <input
              type="radio"
              name="purpose"
              value={purpose}
              defaultChecked={(initialFilters.purpose ?? "SALE") === purpose}
            />
            <span>{purpose === "SALE" ? "Buy" : "Rent"}</span>
          </label>
        ))}
      </fieldset>
      <div className="search-fields">
        <label className="field">
          <span>Property Type</span>
          <select name="type" defaultValue={initialFilters.type ?? ""}>
            <option value="">All Properties</option>
            {HOME_PROPERTY_CATEGORY_ORDER.map((type) => (
              <option key={type} value={type}>{PROPERTY_TYPE_LABELS[type].en}</option>
            ))}
            <option value="OFFICE">{PROPERTY_TYPE_LABELS.OFFICE.en}</option>
            <option value="CHALET">{PROPERTY_TYPE_LABELS.CHALET.en}</option>
          </select>
        </label>
        <label className="field">
          <span>Governorate / City</span>
          <select name="citySlug" defaultValue={initialFilters.citySlug ?? ""}>
            <option value="">All cities</option>
            {cities.map((city) => <option key={city.id} value={city.slug}>{city.name}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Area</span>
          <select name="areaSlug" defaultValue={initialFilters.areaSlug ?? ""}>
            <option value="">All areas</option>
            {areas.map((area) => (
              <option key={area.id} value={area.slug}>{area.name}, {area.city.name}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Bedrooms</span>
          <select name="bedrooms" defaultValue={initialFilters.bedrooms ?? ""}>
            <option value="">Any</option>
            <option value="1">1+ bedroom</option>
            <option value="2">2+ bedrooms</option>
            <option value="3">3+ bedrooms</option>
            <option value="4">4+ bedrooms</option>
          </select>
        </label>
      </div>
      <div className="search-advanced">
        <fieldset className="range-fields">
          <legend>Price (EGP)</legend>
          <label className="visually-hidden" htmlFor="min-price">Minimum price</label>
          <input id="min-price" name="minPrice" type="number" min="0" placeholder="Min" defaultValue={initialFilters.minPrice} />
          <label className="visually-hidden" htmlFor="max-price">Maximum price</label>
          <input id="max-price" name="maxPrice" type="number" min="0" placeholder="Max" defaultValue={initialFilters.maxPrice} />
        </fieldset>
        <fieldset className="range-fields">
          <legend>Area (m²)</legend>
          <label className="visually-hidden" htmlFor="min-area">Minimum area</label>
          <input id="min-area" name="minArea" type="number" min="0" placeholder="Min" defaultValue={initialFilters.minArea} />
          <label className="visually-hidden" htmlFor="max-area">Maximum area</label>
          <input id="max-area" name="maxArea" type="number" min="0" placeholder="Max" defaultValue={initialFilters.maxArea} />
        </fieldset>
        <div className="search-submit-row">
          <Link className="reset-link" href="/properties">Reset</Link>
          <button className="button button-search" type="submit">
            <Search size={19} aria-hidden="true" />Search
          </button>
        </div>
      </div>
    </form>
  );
}
