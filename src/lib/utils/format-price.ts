import type { PropertyPurpose } from "@/types/property";

export function formatPrice(price: number, purpose?: PropertyPurpose): string {
  const amount = new Intl.NumberFormat("en-EG", {
    maximumFractionDigits: 0,
  }).format(price);

  return amount + " EGP" + (purpose === "RENT" ? " / شهريًا" : "");
}
