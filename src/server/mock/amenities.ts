import "server-only";

import type { Amenity } from "@/types/property";

export const mockAmenities: Amenity[] = [
  { id: "amenity-elevator", slug: "elevator", name: "Elevator", nameAr: "مصعد", icon: "elevator" },
  { id: "amenity-parking", slug: "parking", name: "Parking", nameAr: "موقف سيارات", icon: "local_parking" },
  { id: "amenity-garden", slug: "garden", name: "Garden", nameAr: "حديقة", icon: "yard" },
  { id: "amenity-security", slug: "security", name: "24/7 Security", nameAr: "أمن على مدار الساعة", icon: "shield" },
  { id: "amenity-central-ac", slug: "central-ac", name: "Central AC", nameAr: "تكييف مركزي", icon: "ac_unit" },
  { id: "amenity-pool", slug: "pool", name: "Swimming Pool", nameAr: "حمام سباحة", icon: "pool" },
  { id: "amenity-gym", slug: "gym", name: "Gym", nameAr: "صالة رياضية", icon: "fitness_center" },
  { id: "amenity-balcony", slug: "balcony", name: "Balcony", nameAr: "شرفة", icon: "balcony" },
  { id: "amenity-storage", slug: "storage", name: "Storage Room", nameAr: "غرفة تخزين", icon: "inventory_2" },
  { id: "amenity-pet-friendly", slug: "pet-friendly", name: "Pet Friendly", nameAr: "مناسب للحيوانات الأليفة", icon: "pets" },
];
