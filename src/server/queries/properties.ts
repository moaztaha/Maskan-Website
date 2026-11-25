import "server-only";
import { prisma } from "@/server/db/prisma";
import { Prisma } from "@prisma/client";
import type {
  LandingStats,
  Amenity,
  PaginatedResult,
  Property,
  PropertyFilters,
  Area,
} from "@/types/property";


const propertyInclude = {
  area: {
    include: {
      city: {
        include: {
          governorate: true,
        },
      },
    },
  },
  images: {
    orderBy: {
      position: "asc",
    },
  },
  amenities: true,
} satisfies Prisma.PropertyInclude;

type PropertyWithRelations = Prisma.PropertyGetPayload<{
  include: typeof propertyInclude;
}>;


export async function getAmenities(): Promise<Amenity[]> {
  return prisma.amenity.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      icon: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getAdminProperties() {
  return prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      area: { include: { city: { include: { governorate: true } } } },
      images: { orderBy: { position: "asc" } },
    },
  });
}

export async function getAdminPropertyById(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: {
      area: { include: { city: { include: { governorate: true } } } },
      images: { orderBy: { position: "asc" } },
      amenities: true,
    },
  });
}

export async function getProperties(
  filters: PropertyFilters = {},
): Promise<PaginatedResult<Property>> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, filters.pageSize ?? 12));


  const where: Prisma.PropertyWhereInput = {
    status: "PUBLISHED",

    ...(filters.purpose && {
      purpose: filters.purpose,
    }),

    ...(filters.type && {
      type: filters.type,
    }),

    ...(filters.citySlug || filters.areaSlug
      ? {
        area: {
          ...(filters.citySlug && {
            city: {
              slug: filters.citySlug,
            },
          }),
          ...(filters.areaSlug && {
            slug: filters.areaSlug,
          }),
        },
      }
      : {}),

    ...(filters.minPrice !== undefined || filters.maxPrice !== undefined
      ? {
        price: {
          ...(filters.minPrice !== undefined && {
            gte: filters.minPrice,
          }),
          ...(filters.maxPrice !== undefined && {
            lte: filters.maxPrice,
          }),
        },
      }
      : {}),

    ...(filters.minArea !== undefined || filters.maxArea !== undefined
      ? {
        areaSqm: {
          ...(filters.minArea !== undefined && {
            gte: filters.minArea,
          }),
          ...(filters.maxArea !== undefined && {
            lte: filters.maxArea,
          }),
        },
      }
      : {}),

    ...(filters.bedrooms !== undefined && {
      bedrooms: {
        gte: filters.bedrooms,
      },
    }),

    ...(filters.bathrooms !== undefined && {
      bathrooms: {
        gte: filters.bathrooms,
      },
    }),

    ...(filters.amenities && filters.amenities.length > 0
      ? {
        AND: filters.amenities.map((slug) => ({
          amenities: {
            some: { slug },
          },
        })),
      }
      : {}),
  };

  const orderBy: Prisma.PropertyOrderByWithRelationInput =
    filters.sort === "price_asc"
      ? { price: "asc" }
      : filters.sort === "price_desc"
        ? { price: "desc" }
        : filters.sort === "area"
          ? { areaSqm: "desc" }
          : { createdAt: "desc" };


  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: propertyInclude,
    }),

    prisma.property.count({
      where,
    }),
  ]);

  return {
    items: properties.map(mapProperty),
    total,
    page,
    pageSize,
  };




}

function mapProperty(property: PropertyWithRelations): Property {
  return {
    ...property,
    price: Number(property.price),
    areaSqm: property.areaSqm ?? undefined,
    bedrooms: property.bedrooms ?? undefined,
    bathrooms: property.bathrooms ?? undefined,
    floor: property.floor ?? undefined,
    finishing: property.finishing ?? undefined,
    yearBuilt: property.yearBuilt ?? undefined,
    addressDetails: property.addressDetails ?? undefined,
    latitude: property.latitude ?? undefined,
    longitude: property.longitude ?? undefined,
    city: property.area.city,
    area: {
      ...property.area,
      description: property.area.description ?? undefined,
      faqs: property.area.faqs as Area["faqs"],
      city: {
        ...property.area.city,
        governorate: property.area.city.governorate,
      },
    },
    images: property.images,
    amenities: property.amenities,
  };
}

export async function getPropertyBySlug(
  slug: string,
): Promise<Property | null> {
  const property = await prisma.property.findFirst({
    where: {
      slug,
      status: {
        in: ["PUBLISHED", "SOLD"],
      },
    },
    include: {
      area: {
        include: {
          city: {
            include: {
              governorate: true,
            },
          },
        },
      },
      images: {
        orderBy: {
          position: "asc",
        },
      },
      amenities: true,
    },
  });

  if (!property) return null;

  return mapProperty(property);
}

export async function getFeaturedProperties(
  limit = 8,
): Promise<Property[]> {
  const properties = await prisma.property.findMany({
    where: {
      status: "PUBLISHED",
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Math.max(0, limit),
    include: {
      area: {
        include: {
          city: {
            include: {
              governorate: true,
            },
          },
        },
      },
      images: {
        orderBy: {
          position: "asc",
        },
      },
      amenities: true,
    },
  });

  return properties.map(mapProperty);
}

export async function getLatestProperties(
  limit = 8,
): Promise<Property[]> {
  const properties = await prisma.property.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Math.max(0, limit),
    include: {
      area: {
        include: {
          city: {
            include: {
              governorate: true,
            },
          },
        },
      },
      images: {
        orderBy: {
          position: "asc",
        },
      },
      amenities: true,
    },
  });

  return properties.map(mapProperty);
}

export async function getSimilarProperties(
  property: Property,
  limit = 4,
): Promise<Property[]> {
  const properties = await prisma.property.findMany({
    where: {
      status: "PUBLISHED",
      id: {
        not: property.id,
      },
      OR: [
        { areaId: property.areaId },
        { cityId: property.cityId },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Math.max(0, limit),
    include: {
      area: {
        include: {
          city: {
            include: {
              governorate: true,
            },
          },
        },
      },
      images: {
        orderBy: {
          position: "asc",
        },
      },
      amenities: true,
    },
  });

  return properties.map(mapProperty);
}

export async function getLandingStats(
  citySlug: string,
  areaSlug?: string,
): Promise<LandingStats> {
  const sales = await prisma.property.findMany({
    where: {
      status: "PUBLISHED",
      purpose: "SALE",
      area: {
        city: {
          slug: citySlug,
        },
        ...(areaSlug
          ? {
            slug: areaSlug,
          }
          : {}),
      },
    },
    select: {
      price: true,
      areaSqm: true,
    },
  });

  const sumPerSqm = sales.reduce(
    (sum, property) =>
      sum + Number(property.price) / property.areaSqm,
    0,
  );

  return {
    totalCount: sales.length,
    averagePricePerSqm: sales.length
      ? Math.round(sumPerSqm / sales.length)
      : 0,
  };
}
