import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, MapPin, Ruler, Star } from "lucide-react";
import type { Property } from "@/types/property";
import { PROPERTY_PURPOSE_LABELS } from "@/lib/constants/property";
import { formatPrice } from "@/lib/utils/format-price";

export function PropertyCard({ property }: { property: Property }) {
  const cover = property.images.find((image) => image.isCover) ?? property.images[0];

  return (
    <article className="property-card font-[var(--font-inter)]">
      <Link className="property-image-link" href={"/properties/" + property.slug}>
        {cover ? (
          <Image
            alt={cover.alt}
            className="property-image"
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            src={cover.url}
          />
        ) : (
          <span className="property-image-fallback" aria-hidden="true" />
        )}
        <span className="property-image-badges">
          <span className="property-badge property-badge-purpose">
            {PROPERTY_PURPOSE_LABELS[property.purpose].en}
          </span>
          {property.isFeatured ? (
            <span className="property-badge property-badge-featured">
              <Star size={12} fill="currentColor" aria-hidden="true" />
              Featured
            </span>
          ) : null}
        </span>
      </Link>
      <div className="property-card-content">
        <p className="property-price">{formatPrice(property.price, property.purpose)}</p>
        <h3><Link href={"/properties/" + property.slug}>{property.title}</Link></h3>
        <p className="property-location">
          <MapPin size={16} aria-hidden="true" />
          <span>{property.city.name}, {property.area.name}</span>
        </p>
        <div className="property-facts" aria-label="Property details">
          {property.bedrooms !== undefined ? (
            <span><BedDouble size={17} aria-hidden="true" />{property.bedrooms} Beds</span>
          ) : null}
          {property.bathrooms !== undefined ? (
            <span><Bath size={17} aria-hidden="true" />{property.bathrooms} Baths</span>
          ) : null}
          <span><Ruler size={17} aria-hidden="true" />{property.areaSqm} m²</span>
        </div>
      </div>
    </article>
  );
}
