export type PropertyPurpose = "SALE" | "RENT";
export type PropertyType =
  | "APARTMENT"
  | "VILLA"
  | "DUPLEX"
  | "LAND"
  | "SHOP"
  | "OFFICE"
  | "CHALET";
export type PropertyStatus = "DRAFT" | "PUBLISHED" | "SOLD";
export type PropertyFinishing =
  | "CORE_AND_SHELL"
  | "SEMI_FINISHED"
  | "FINISHED"
  | "SUPER_LUX";
export type PropertySort = "newest" | "price_asc" | "price_desc" | "area";

export interface Governorate {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  governorateId: string;
  governorate: Governorate;
}

export interface Area {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  description?: string;
  faqs?: { q: string; a: string }[];
  cityId: string;
  city: City;
}

export interface Amenity {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  icon?: string | null;
}

export interface PropertyImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  position: number;
  isCover: boolean;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  status: PropertyStatus;
  isFeatured: boolean;
  price: number;
  areaSqm?: number | null;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  finishing?: PropertyFinishing;
  yearBuilt?: number;
  addressDetails?: string;
  latitude?: number;
  longitude?: number;
  areaId: string;
  cityId: string;
  images: PropertyImage[];
  amenities: Amenity[];
  area: Area;
  city: City;
  publishedAt: Date | null;
  createdAt: Date;
}

export interface PropertyFilters {
  purpose?: PropertyPurpose;
  type?: PropertyType;
  citySlug?: string;
  areaSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
  sort?: PropertySort;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CityListingCount {
  city: City;
  count: number;
}

export interface LandingStats {
  totalCount: number;
  averagePricePerSqm: number;
}
