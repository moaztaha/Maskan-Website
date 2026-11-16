import "server-only";

import type {
  LandingStats,
  Amenity,
  PaginatedResult,
  Property,
  PropertyFilters,
} from "@/types/property";
import { mockAmenities } from "@/server/mock/amenities";
import { mockAreas, mockCities } from "@/server/mock/locations";
import {
  mockPropertySeeds,
  mockPropertyImages,
} from "@/server/mock/properties";

const mockProperties: Property[] = mockPropertySeeds.map((seed, index) => {
  const area = mockAreas.find((item) => item.id === seed.areaId)!;
  const city = mockCities.find((item) => item.id === seed.cityId)!;
  const createdAt =
    index === 3
      ? new Date("2026-11-15T09:00:00.000Z")
      : index === 4
        ? new Date("2026-11-14T09:00:00.000Z")
        : index === 5
          ? new Date("2026-11-13T09:00:00.000Z")
          : new Date(Date.UTC(2025, 0, index + 1));

  return {
    ...seed,
    latitude: 30.02 + index * 0.003,
    longitude: 31.2 + index * 0.002,
    addressDetails: seed.addressDetails ?? area.name + ", " + city.name,
    images: [
      {
        url: mockPropertyImages[index % mockPropertyImages.length],
        alt: seed.title + " property in " + area.name + ", " + city.name,
        width: 1200,
        height: 900,
        position: 0,
        isCover: true,
      },
    ],
    amenities: mockAmenities.slice(index % 5, (index % 5) + 3),
    area,
    city,
    publishedAt:
      seed.status === "DRAFT" ? null : new Date(createdAt.getTime() + 60_000),
    createdAt,
  };
});

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getAmenities(): Promise<Amenity[]> {
  return mockAmenities;
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getProperties(
  filters: PropertyFilters = {},
): Promise<PaginatedResult<Property>> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, filters.pageSize ?? 12));
  let results = mockProperties.filter((property) => {
    if (property.status !== "PUBLISHED") return false;
    if (filters.purpose && property.purpose !== filters.purpose) return false;
    if (filters.type && property.type !== filters.type) return false;
    if (filters.citySlug && property.city.slug !== filters.citySlug) return false;
    if (filters.areaSlug && property.area.slug !== filters.areaSlug) return false;
    if (filters.minPrice !== undefined && property.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && property.price > filters.maxPrice) return false;
    if (filters.bedrooms !== undefined && (property.bedrooms ?? 0) < filters.bedrooms) return false;
    if (filters.bathrooms !== undefined && (property.bathrooms ?? 0) < filters.bathrooms) return false;
    if (filters.minArea !== undefined && property.areaSqm < filters.minArea) return false;
    if (filters.maxArea !== undefined && property.areaSqm > filters.maxArea) return false;
    if (
      filters.amenities?.length &&
      !filters.amenities.every((slug) =>
        property.amenities.some((amenity) => amenity.slug === slug),
      )
    ) {
      return false;
    }
    return true;
  });

  if (filters.sort === "price_asc") {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price_desc") {
    results = [...results].sort((a, b) => b.price - a.price);
  } else if (filters.sort === "area") {
    results = [...results].sort((a, b) => b.areaSqm - a.areaSqm);
  } else {
    results = [...results].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  const start = (page - 1) * pageSize;
  return {
    items: results.slice(start, start + pageSize),
    total: results.length,
    page,
    pageSize,
  };
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return (
    mockProperties.find(
      (property) =>
        property.slug === slug &&
        (property.status === "PUBLISHED" || property.status === "SOLD"),
    ) ?? null
  );
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getFeaturedProperties(limit = 8): Promise<Property[]> {
  return mockProperties
    .filter((property) => property.status === "PUBLISHED" && property.isFeatured)
    .slice(0, Math.max(0, limit));
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getLatestProperties(limit = 8): Promise<Property[]> {
  return mockProperties
    .filter((property) => property.status === "PUBLISHED")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, Math.max(0, limit));
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getSimilarProperties(
  property: Property,
  limit = 4,
): Promise<Property[]> {
  return mockProperties
    .filter(
      (candidate) =>
        candidate.status === "PUBLISHED" &&
        candidate.id !== property.id &&
        (candidate.areaId === property.areaId || candidate.cityId === property.cityId),
    )
    .slice(0, Math.max(0, limit));
}

// TODO(db): replace the body with a Prisma query. Keep the signature and return type unchanged.
export async function getLandingStats(
  citySlug: string,
  areaSlug?: string,
): Promise<LandingStats> {
  const sales = mockProperties.filter(
    (property) =>
      property.status === "PUBLISHED" &&
      property.purpose === "SALE" &&
      property.city.slug === citySlug &&
      (!areaSlug || property.area.slug === areaSlug),
  );
  const sumPerSqm = sales.reduce(
    (sum, property) => sum + property.price / property.areaSqm,
    0,
  );

  return {
    totalCount: sales.length,
    averagePricePerSqm: sales.length ? Math.round(sumPerSqm / sales.length) : 0,
  };
}
