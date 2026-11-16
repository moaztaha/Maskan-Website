import Link from "next/link";
import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  Layers3,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
} from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyInquiryForm } from "@/components/property/PropertyInquiryForm";
import { PropertyMap } from "@/components/property/PropertyMap";
import { PropertyDescription } from "@/components/property/PropertyDescription";
import { Container } from "@/components/layout/Container";
import { PROPERTY_FINISHING_LABELS, PROPERTY_PURPOSE_LABELS, PROPERTY_TYPE_LABELS } from "@/lib/constants/property";
import { SITE_CONTACT } from "@/lib/constants/site";
import { formatPrice } from "@/lib/utils/format-price";
import type { Property, PropertyFinishing } from "@/types/property";

const factIcons = {
  bedrooms: BedDouble,
  bathrooms: Bath,
  areaSqm: Ruler,
  floor: Building2,
  finishing: Layers3,
  yearBuilt: CalendarDays,
};

const finishingLabel = (value: PropertyFinishing) => PROPERTY_FINISHING_LABELS[value].en;

export function PropertyDetails({ property, similar }: { property: Property; similar: Property[] }) {
  return <PropertyDetailLayout property={property} similar={similar} />;
}

export function PropertyDetailLayout({
  property,
  similar,
  unavailable = false,
}: {
  property: Property;
  similar: Property[];
  unavailable?: boolean;
}) {
  const location = [property.area.name, property.city.name].filter(Boolean).join(", ");
  const whatsapp = new URL(SITE_CONTACT.whatsapp.href);
  whatsapp.searchParams.set("text", `أنا مهتم بهذا العقار: ${property.title}`);

  const facts = [
    property.bedrooms !== undefined ? { key: "bedrooms", label: "Bedrooms", value: `${property.bedrooms} Beds` } : null,
    property.bathrooms !== undefined ? { key: "bathrooms", label: "Bathrooms", value: `${property.bathrooms} Baths` } : null,
    property.areaSqm !== undefined ? { key: "areaSqm", label: "Area", value: `${property.areaSqm} m²` } : null,
    property.floor !== undefined ? { key: "floor", label: "Floor", value: String(property.floor) } : null,
    property.finishing ? { key: "finishing", label: "Finishing", value: finishingLabel(property.finishing) } : null,
    property.yearBuilt !== undefined ? { key: "yearBuilt", label: "Built Year", value: String(property.yearBuilt) } : null,
  ].filter(Boolean) as { key: keyof typeof factIcons; label: string; value: string }[];

  const detailRows: [string, string][] = [
    ["Property type", PROPERTY_TYPE_LABELS[property.type].en],
    ["Purpose", PROPERTY_PURPOSE_LABELS[property.purpose].en],
    ...(property.finishing ? [["Finishing", finishingLabel(property.finishing)] as [string, string]] : []),
    ...(property.yearBuilt !== undefined ? [["Year built", String(property.yearBuilt)] as [string, string]] : []),
    ...(property.floor !== undefined ? [["Floor", String(property.floor)] as [string, string]] : []),
    ...(property.addressDetails ? [["Address", property.addressDetails] as [string, string]] : []),
    ["Listing reference", property.id],
  ];

  const propertyTitle = unavailable ? "This property is unavailable" : property.title;

  return (
    <div className={`property-details-page${unavailable ? " is-unavailable" : ""}`}>
      {unavailable && (
        <div className="property-unavailable-banner" role="status">
          <Container className="property-unavailable-inner">
            <span className="property-alert-icon" aria-hidden="true">!</span>
            <div>
              <strong>هذا العقار لم يعد متاحًا</strong>
              <p>This property has already been sold or rented and requests cannot be accepted at this time.</p>
            </div>
            <span className="property-unavailable-tag">Sold / Rented</span>
          </Container>
        </div>
      )}

      <Container className="property-details-container">
        <nav className="property-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronLeft size={16} aria-hidden="true" />
          <Link href={`/properties?purpose=${property.purpose}`}>
            {PROPERTY_PURPOSE_LABELS[property.purpose].en}
          </Link>
          <ChevronLeft size={16} aria-hidden="true" />
          <Link href={`/${property.purpose === "RENT" ? "rent" : "sale"}/${property.city.slug}`}>
            {property.city.name}
          </Link>
          <ChevronLeft size={16} aria-hidden="true" />
          <span aria-current="page">{property.title}</span>
        </nav>

        {unavailable && (
          <header className="property-heading property-heading-unavailable">
            <div className="property-heading-copy">
              <div className="property-detail-meta">
                <span className="property-type-tag">{PROPERTY_TYPE_LABELS[property.type].en}</span>
                <span><MapPin size={17} aria-hidden="true" />{location}</span>
              </div>
              <h1>{property.title}</h1>
            </div>
            <div className="property-price property-price-old">
              <small>Previous Price</small>
              <strong>{formatPrice(property.price)}</strong>
            </div>
          </header>
        )}

        <PropertyGallery images={property.images} title={property.title} unavailable={unavailable} />

        <div className="property-detail-layout">
          <div className="property-detail-main">
            {!unavailable && (
              <header className="property-heading">
                <div className="property-heading-copy">
                  <div className="property-detail-meta">
                    <span className="property-type-tag">{PROPERTY_PURPOSE_LABELS[property.purpose].en}</span>
                    {property.isFeatured && <span className="property-featured-tag">Featured</span>}
                    <span className="property-listing-reference">Listing ID: {property.id}</span>
                  </div>
                  <h1>{property.title}</h1>
                  <p className="property-heading-location"><MapPin size={19} aria-hidden="true" />{location}</p>
                  <div className="property-heading-price">
                    <strong>{formatPrice(property.price)}</strong>
                    {property.purpose === "RENT" && <span>/ month</span>}
                  </div>
                </div>
              </header>
            )}

            {unavailable && <PropertyFacts facts={facts} />}

            {!unavailable && <PropertyFacts facts={facts} />}

            <section className="property-content-card property-description-card">
              <h2>{unavailable ? "Property Details" : "Description"}</h2>
              <PropertyDescription description={property.description} />
              {unavailable && property.amenities.length > 0 && (
                <div className="property-sold-amenities" aria-label="Amenities and features">
                  {property.finishing && <span>{finishingLabel(property.finishing)} Finishing</span>}
                  {property.amenities.map((amenity) => <span key={amenity.id}>{amenity.name}</span>)}
                </div>
              )}
            </section>

            {!unavailable && property.amenities.length > 0 && (
              <section className="property-content-card">
                <h2>Amenities &amp; Services</h2>
                <div className="property-amenities">
                  {property.amenities.map((amenity) => (
                    <div className="property-amenity" key={amenity.id}>
                      <Check size={19} aria-hidden="true" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!unavailable && (
              <section className="property-content-card">
                <h2>Additional Details</h2>
                <dl className="property-details-table">
                  {detailRows.map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
              </section>
            )}

            {!unavailable && property.latitude !== undefined && property.longitude !== undefined && (
              <section className="property-content-card property-location-card">
                <h2>Property Location on Map</h2>
                <PropertyMap latitude={property.latitude} longitude={property.longitude} label={location} />
              </section>
            )}
          </div>

          <aside className={`property-contact-card${unavailable ? " property-unavailable-card" : ""}`}>
            {unavailable ? (
              <>
                <span className="property-unavailable-card-icon" aria-hidden="true">×</span>
                <h2>This property is unavailable</h2>
                <p>We apologize, this unit has been fully sold or rented.</p>
                <p className="property-similar-prompt">Are you looking for a similar unit in the same area? We have excellent options ready for immediate inspection.</p>
                <a className="property-primary-button" href="#similar-properties">Browse Similar Properties</a>
              </>
            ) : (
              <>
                <div className="property-contact-price">
                  <div><small>Total Price</small><strong>{formatPrice(property.price)}</strong>{property.purpose === "RENT" && <span>/ month</span>}</div>
                  <span className="property-purpose-pill">{PROPERTY_PURPOSE_LABELS[property.purpose].en}</span>
                </div>
                <div className="property-contact-actions">
                  <a className="property-whatsapp-button" href={whatsapp.toString()} target="_blank" rel="noreferrer">
                    <MessageCircle size={19} aria-hidden="true" />WhatsApp
                  </a>
                  <a className="property-call-button" href={SITE_CONTACT.phone.href}>
                    <Phone size={19} aria-hidden="true" />Call Now
                  </a>
                </div>
                <div className="property-contact-divider" />
                <h2>Inquire about this property</h2>
                <PropertyInquiryForm propertyId={property.id} purpose={property.purpose} />
              </>
            )}
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="property-similar" id="similar-properties">
            <div className="property-similar-heading">
              <div>
                {unavailable && <span>FEATURED ALTERNATIVES</span>}
                <h2>{unavailable ? "Similar Available Properties" : "Similar Properties"}</h2>
              </div>
              <Link href="/properties">Browse All <ChevronLeft size={17} aria-hidden="true" /></Link>
            </div>
            <div className="property-similar-grid">
              {similar.map((item) => <PropertyCard key={item.id} property={item} />)}
            </div>
            {unavailable && <div className="property-browse-all"><Link href="/properties">Browse All Properties</Link></div>}
          </section>
        )}

        {!unavailable && (
          <div className="property-mobile-bar" aria-label="Property contact actions">
            <strong>{formatPrice(property.price)}</strong>
            {property.purpose === "RENT" && <span>/ month</span>}
            <a className="property-mobile-whatsapp" href={whatsapp.toString()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle size={20} aria-hidden="true" />
            </a>
            <a className="property-mobile-call" href={SITE_CONTACT.phone.href} aria-label="Call now">
              <Phone size={20} aria-hidden="true" />
            </a>
            <a className="property-mobile-inquire" href="#property-inquiry">Inquire</a>
          </div>
        )}

        <span className="sr-only">{propertyTitle}</span>
      </Container>
    </div>
  );
}

function PropertyFacts({ facts }: { facts: { key: keyof typeof factIcons; label: string; value: string }[] }) {
  return (
    <section className="property-facts-bar" aria-label="Key property facts">
      {facts.map((fact) => {
        const Icon = factIcons[fact.key];
        return (
          <div className="property-fact-item" key={fact.key}>
            <Icon size={23} aria-hidden="true" />
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        );
      })}
    </section>
  );
}

