import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Container } from "@/components/layout/Container";

export function PropertyGrid({
  heading,
  properties,
  actionHref,
  actionLabel = "View All",
}: {
  heading: string;
  properties: Property[];
  actionHref: string;
  actionLabel?: string;
}) {
  return (
    <Container as="section" className="content-section property-section" aria-labelledby={heading.toLowerCase().replaceAll(" ", "-")}>
      <div className="section-heading">
        <h2 id={heading.toLowerCase().replaceAll(" ", "-")}>{heading}</h2>
        <Link className="text-link" href={actionHref}>
          {actionLabel}<ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className="property-grid">
        {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
      </div>
    </Container>
  );
}
