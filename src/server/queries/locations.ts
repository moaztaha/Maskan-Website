import "server-only";
import { prisma } from "@/server/db/prisma";

import type {
  Area,
  City,
  CityListingCount,
} from "@/types/property";

export async function getCities(): Promise<City[]> {
  return prisma.city.findMany({
    include: {
      governorate: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  return prisma.city.findUnique({
    where: {
      slug,
    },
    include: {
      governorate: true,
    },
  });
}

export async function getAreaBySlug(
  citySlug: string,
  areaSlug: string,
): Promise<Area | null> {
  const area = await prisma.area.findFirst({
    where: {
      slug: areaSlug,
      city: {
        slug: citySlug,
      },
    },
    include: {
      city: {
        include: {
          governorate: true,
        },
      },
    },
  });

  if (!area) return null;

  return {
    ...area,
    description: area.description ?? undefined,
    faqs: area.faqs as Area["faqs"],
  };
}

export async function getAreasByCity(citySlug: string): Promise<Area[]> {
  const areas = await prisma.area.findMany({
    where: {
      city: {
        slug: citySlug,
      },
    },
    include: {
      city: {
        include: {
          governorate: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return areas.map((area) => ({
    ...area,
    description: area.description ?? undefined,
    faqs: area.faqs as Area["faqs"],
  }));
}

export async function getCityListingCounts(): Promise<CityListingCount[]> {
  const [cities, propertyCounts] = await Promise.all([
    prisma.city.findMany({
      include: {
        governorate: true,
      },
      orderBy: {
        name: "asc",
      },
    }),

    prisma.property.groupBy({
      by: ["cityId"],
      where: {
        status: "PUBLISHED",
      },
      _count: {
        _all: true,
      },
    }),
  ]);

  const countByCityId = new Map(
    propertyCounts.map((item) => [item.cityId, item._count._all]),
  );

  return cities.map((city) => ({
    city,
    count: countByCityId.get(city.id) ?? 0,
  }));
}
