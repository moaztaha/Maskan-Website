import type {
  PropertyFilters,
  PropertyPurpose,
  PropertySort,
  PropertyType,
} from "@/types/property";

export type SearchParams = Record<string, string | string[] | undefined>;

const propertyTypes: PropertyType[] = [
  "APARTMENT",
  "VILLA",
  "DUPLEX",
  "LAND",
  "SHOP",
  "OFFICE",
  "CHALET",
];
const sortOptions: PropertySort[] = [
  "newest",
  "price_asc",
  "price_desc",
  "area",
];

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

function parseInteger(value: string | undefined): number | undefined {
  const number = parseNumber(value);

  return number !== undefined && Number.isInteger(number)
    ? number
    : undefined;
}

export function parseFilters(searchParams: SearchParams): PropertyFilters {
  const purposeValue = firstValue(searchParams.purpose);
  const typeValue = firstValue(searchParams.type);
  const sortValue = firstValue(searchParams.sort);
  const amenitiesValue = firstValue(searchParams.amenities);

  return {
    purpose:
      purposeValue === "SALE" || purposeValue === "RENT"
        ? (purposeValue as PropertyPurpose)
        : undefined,
    type:
      typeValue && propertyTypes.includes(typeValue as PropertyType)
        ? (typeValue as PropertyType)
        : undefined,
    citySlug: firstValue(searchParams.citySlug),
    areaSlug: firstValue(searchParams.areaSlug),
    minPrice: parseNumber(firstValue(searchParams.minPrice)),
    maxPrice: parseNumber(firstValue(searchParams.maxPrice)),
    bedrooms: parseInteger(firstValue(searchParams.bedrooms)),
    bathrooms: parseInteger(firstValue(searchParams.bathrooms)),
    minArea: parseNumber(firstValue(searchParams.minArea)),
    maxArea: parseNumber(firstValue(searchParams.maxArea)),
    amenities: amenitiesValue
      ? amenitiesValue.split(",").map((value) => value.trim()).filter(Boolean)
      : undefined,
    sort:
      sortValue && sortOptions.includes(sortValue as PropertySort)
        ? (sortValue as PropertySort)
        : undefined,
    page: parseInteger(firstValue(searchParams.page)),
    pageSize: parseInteger(firstValue(searchParams.pageSize)),
  };
}

export function buildQueryString(filters: PropertyFilters): string {
  const params = new URLSearchParams();
  const entries: [keyof PropertyFilters, string][] = [
    ["purpose", "purpose"],
    ["type", "type"],
    ["citySlug", "citySlug"],
    ["areaSlug", "areaSlug"],
    ["minPrice", "minPrice"],
    ["maxPrice", "maxPrice"],
    ["bedrooms", "bedrooms"],
    ["bathrooms", "bathrooms"],
    ["minArea", "minArea"],
    ["maxArea", "maxArea"],
    ["sort", "sort"],
    ["page", "page"],
    ["pageSize", "pageSize"],
  ];

  for (const [key, queryKey] of entries) {
    const value = filters[key];
    if (value !== undefined && value !== "") {
      params.set(queryKey, String(value));
    }
  }
  if (filters.amenities?.length) {
    params.set("amenities", filters.amenities.join(","));
  }

  return params.toString();
}
