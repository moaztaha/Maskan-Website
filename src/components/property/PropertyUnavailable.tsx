import { PropertyDetailLayout } from "@/components/property/PropertyDetails";
import type { Property } from "@/types/property";

export function PropertyUnavailable({ property, similar }: { property: Property; similar: Property[] }) {
  return <PropertyDetailLayout property={property} similar={similar} unavailable />;
}
