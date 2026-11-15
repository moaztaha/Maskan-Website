import "server-only";

import type {
  Area,
  City,
  CityListingCount,
} from "@/types/property";
import { mockPropertySeeds } from "@/server/mock/properties";
import { mockAreas, mockCities } from "@/server/mock/locations";

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getCities(): Promise<City[]> {
  return mockCities;
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getCityBySlug(slug: string): Promise<City | null> {
  return mockCities.find((city) => city.slug === slug) ?? null;
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getAreaBySlug(
  citySlug: string,
  areaSlug: string,
): Promise<Area | null> {
  return (
    mockAreas.find(
      (area) => area.city.slug === citySlug && area.slug === areaSlug,
    ) ?? null
  );
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getAreasByCity(citySlug: string): Promise<Area[]> {
  return mockAreas.filter((area) => area.city.slug === citySlug);
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getCityListingCounts(): Promise<CityListingCount[]> {
  return mockCities.map((city) => ({
    city,
    count: mockPropertySeeds.filter(
      (property) =>
        property.status === "PUBLISHED" && property.cityId === city.id,
    ).length,
  }));
}
