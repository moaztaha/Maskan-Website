import "server-only";

import type { Area, City, Governorate } from "@/types/property";

export const mockGovernorates: Governorate[] = [
  { id: "gov-cairo", slug: "cairo", name: "Cairo", nameAr: "القاهرة" },
  { id: "gov-giza", slug: "giza", name: "Giza", nameAr: "الجيزة" },
  {
    id: "gov-alexandria",
    slug: "alexandria",
    name: "Alexandria",
    nameAr: "الإسكندرية",
  },
];

const citySeeds = [
  { id: "city-new-cairo", slug: "new-cairo", name: "New Cairo", governorateId: "gov-cairo" },
  { id: "city-cairo", slug: "cairo", name: "Cairo", governorateId: "gov-cairo" },
  { id: "city-sheikh-zayed", slug: "sheikh-zayed", name: "Sheikh Zayed", governorateId: "gov-giza" },
  { id: "city-october", slug: "6th-of-october", name: "6th of October", governorateId: "gov-giza" },
  { id: "city-alexandria", slug: "alexandria", name: "Alexandria", governorateId: "gov-alexandria" },
  { id: "city-north-coast", slug: "north-coast", name: "North Coast", governorateId: "gov-alexandria" },
];

export const mockCities: City[] = citySeeds.map((city) => ({
  ...city,
  nameAr:
    city.id === "city-new-cairo"
      ? "القاهرة الجديدة"
      : city.id === "city-sheikh-zayed"
        ? "الشيخ زايد"
        : city.id === "city-october"
          ? "السادس من أكتوبر"
          : city.id === "city-alexandria"
            ? "الإسكندرية"
            : city.id === "city-north-coast"
              ? "الساحل الشمالي"
              : "القاهرة",
  governorate:
    mockGovernorates.find((governorate) => governorate.id === city.governorateId)!,
}));

const areaSeeds = [
  { id: "area-fifth-settlement", slug: "fifth-settlement", name: "Fifth Settlement", nameAr: "التجمع الخامس", cityId: "city-new-cairo" },
  { id: "area-rehab", slug: "rehab", name: "Al Rehab", nameAr: "الرحاب", cityId: "city-new-cairo" },
  { id: "area-north-90", slug: "north-90", name: "North 90 Street", nameAr: "شارع التسعين الشمالي", cityId: "city-new-cairo" },
  { id: "area-mostakbal", slug: "mostakbal-city", name: "Mostakbal City", nameAr: "مدينة المستقبل", cityId: "city-new-cairo" },
  { id: "area-maadi", slug: "maadi", name: "Maadi", nameAr: "المعادي", cityId: "city-cairo" },
  { id: "area-zamalek", slug: "zamalek", name: "Zamalek", nameAr: "الزمالك", cityId: "city-cairo" },
  { id: "area-nasr-city", slug: "nasr-city", name: "Nasr City", nameAr: "مدينة نصر", cityId: "city-cairo" },
  { id: "area-beverly-hills", slug: "beverly-hills", name: "Beverly Hills", nameAr: "بيفرلي هيلز", cityId: "city-sheikh-zayed" },
  { id: "area-sheikh-zayed", slug: "sheikh-zayed-center", name: "Sheikh Zayed", nameAr: "الشيخ زايد", cityId: "city-sheikh-zayed" },
  { id: "area-october-gardens", slug: "october-gardens", name: "October Gardens", nameAr: "حدائق أكتوبر", cityId: "city-october" },
  { id: "area-dreamland", slug: "dreamland", name: "Dreamland", nameAr: "دريم لاند", cityId: "city-october" },
  { id: "area-smouha", slug: "smouha", name: "Smouha", nameAr: "سموحة", cityId: "city-alexandria" },
  { id: "area-sidi-gaber", slug: "sidi-gaber", name: "Sidi Gaber", nameAr: "سيدي جابر", cityId: "city-alexandria" },
  { id: "area-ras-el-hekma", slug: "ras-el-hekma", name: "Ras El Hekma", nameAr: "رأس الحكمة", cityId: "city-north-coast" },
  { id: "area-marina", slug: "marina", name: "Marina", nameAr: "مارينا", cityId: "city-north-coast" },
];

export const mockAreas: Area[] = areaSeeds.map((area) => ({
  ...area,
  ...(area.id === "area-fifth-settlement"
    ? {
        description:
          "Fifth Settlement is the lively heart of New Cairo, known for its contemporary compounds, universities, and the restaurants and shops along South 90 Street.",
        faqs: [
          {
            q: "Where is Fifth Settlement?",
            a: "Fifth Settlement is in New Cairo, east of central Cairo, and is connected to the Ring Road and Suez Road.",
          },
          {
            q: "What types of homes are available in Fifth Settlement?",
            a: "The area has apartments, duplexes, penthouses, and villas in gated compounds and residential neighborhoods.",
          },
          {
            q: "How much does an apartment cost in Fifth Settlement?",
            a: "Prices vary by compound, size, finishing, and amenities. Compare current listings to find options in your budget.",
          },
          {
            q: "Is Fifth Settlement suitable for families?",
            a: "Many residents choose it for its schools, universities, healthcare, green spaces, and family services.",
          },
        ],
      }
    : {}),
  city: mockCities.find((city) => city.id === area.cityId)!,
}));
