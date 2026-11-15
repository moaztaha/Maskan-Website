import type {
  PropertyFinishing,
  PropertyPurpose,
  PropertyStatus,
  PropertyType,
} from "@/types/property";

export const PROPERTY_PURPOSE_LABELS: Record<
  PropertyPurpose,
  { en: string; ar: string }
> = {
  SALE: { en: "For Sale", ar: "للبيع" },
  RENT: { en: "For Rent", ar: "للإيجار" },
};

export const PROPERTY_TYPE_LABELS: Record<
  PropertyType,
  { en: string; ar: string }
> = {
  APARTMENT: { en: "Apartment", ar: "شقة" },
  VILLA: { en: "Villa", ar: "فيلا" },
  DUPLEX: { en: "Duplex", ar: "دوبلكس" },
  LAND: { en: "Land", ar: "أرض" },
  SHOP: { en: "Shop", ar: "محل تجاري" },
  OFFICE: { en: "Office", ar: "مكتب" },
  CHALET: { en: "Chalet", ar: "شاليه" },
};

export const PROPERTY_STATUS_LABELS: Record<
  PropertyStatus,
  { en: string; ar: string }
> = {
  DRAFT: { en: "Draft", ar: "مسودة" },
  PUBLISHED: { en: "Published", ar: "منشور" },
  SOLD: { en: "Sold", ar: "مباع" },
};

export const PROPERTY_FINISHING_LABELS: Record<
  PropertyFinishing,
  { en: string; ar: string }
> = {
  CORE_AND_SHELL: { en: "Core and shell", ar: "بدون تشطيب" },
  SEMI_FINISHED: { en: "Semi-finished", ar: "نصف تشطيب" },
  FINISHED: { en: "Finished", ar: "تشطيب كامل" },
  SUPER_LUX: { en: "Super lux", ar: "سوبر لوكس" },
};

export const PROPERTY_TYPES = PROPERTY_TYPE_LABELS;

export const HOME_PROPERTY_CATEGORY_ORDER: PropertyType[] = [
  "APARTMENT",
  "VILLA",
  "DUPLEX",
  "LAND",
  "SHOP",
];
