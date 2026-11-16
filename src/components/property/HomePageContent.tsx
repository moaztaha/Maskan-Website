import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  House,
  Layers3,
  Map,
  ShieldCheck,
  Store,
  WalletCards,
  Zap,
} from "lucide-react";
import type {
  Area,
  CityListingCount,
  Property,
  PropertyFilters,
  PropertyType,
  City,
} from "@/types/property";
import { HOME_PROPERTY_CATEGORY_ORDER } from "@/lib/constants/property";
import { buildQueryString } from "@/lib/utils/filters";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Container } from "@/components/layout/Container";
import { SearchForm } from "@/components/property/SearchForm";

const categoryIcons: Record<PropertyType, typeof House> = {
  APARTMENT: Building2,
  VILLA: House,
  DUPLEX: Layers3,
  LAND: Map,
  SHOP: Store,
  OFFICE: Building2,
  CHALET: House,
};
const categoryLabels: Record<PropertyType, string> = {
  APARTMENT: "Apartments",
  VILLA: "Villas",
  DUPLEX: "Duplexes",
  LAND: "Land",
  SHOP: "Commercial",
  OFFICE: "Offices",
  CHALET: "Chalets",
};

export function HomePageContent({
  featuredProperties,
  latestProperties,
  cityCounts,
  cities,
  areas,
  initialFilters,
}: {
  featuredProperties: Property[];
  latestProperties: Property[];
  cityCounts: CityListingCount[];
  cities: City[];
  areas: Area[];
  initialFilters: PropertyFilters;
}) {
  return (
    <div className="home-page">
      <section className="hero-section" aria-labelledby="home-title">
        <Image
          alt="Contemporary residential buildings and green landscaping in New Cairo"
          className="hero-image"
          fill
          priority
          sizes="100vw"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2560&q=85"
        />
        <div className="hero-scrim" />
        <Container className="hero-content">
          <h1 id="home-title">Find Your Ideal Home in Egypt</h1>
          <p>Discover thousands of properties for sale and rent at the best prices</p>
          <SearchForm cities={cities} areas={areas} initialFilters={initialFilters} />
        </Container>
      </section>

      <PropertyGrid
        heading="Featured Properties"
        properties={featuredProperties}
        actionHref={"/properties?" + buildQueryString({ sort: "newest" })}
      />

      <Container as="section" className="content-section city-section" aria-labelledby="city-heading">
        <div className="section-heading">
          <h2 id="city-heading">Browse by City</h2>
          <Link className="text-link" href="/properties">
            All Cities<ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="city-grid">
          {cityCounts.map(({ city, count }) => (
            <CityCard key={city.id} city={city} count={count} />
          ))}
        </div>
      </Container>

      <Container as="section" className="content-section category-section" aria-labelledby="category-heading">
        <div className="section-heading">
          <h2 id="category-heading">Browse by Property Type</h2>
        </div>
        <div className="category-grid">
          {HOME_PROPERTY_CATEGORY_ORDER.map((type) => {
            const Icon = categoryIcons[type];
            const label = categoryLabels[type];
            const queryType = type === "SHOP" ? "SHOP" : type;
            const filters: PropertyFilters = { type: queryType };
            return (
              <Link
                className="category-card"
                href={"/properties?" + buildQueryString(filters)}
                key={type}
              >
                <span className="category-icon"><Icon size={26} aria-hidden="true" /></span>
                <span>{label}</span>
                <ArrowRight className="category-arrow" size={16} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </Container>

      <PropertyGrid
        heading="Latest Properties"
        properties={latestProperties}
        actionHref={"/properties?" + buildQueryString({ sort: "newest" })}
      />

      <Container as="section" className="content-section trust-section" aria-labelledby="trust-heading">
        <div className="trust-intro">
          <p className="eyebrow">A better way to find home</p>
          <h2 id="trust-heading">Why Maskan?</h2>
          <p>
            We offer a safe and seamless real estate search experience through
            cutting-edge technology and local expertise.
          </p>
        </div>
        <div className="trust-grid">
          <article className="trust-card">
            <span className="trust-icon"><ShieldCheck size={24} aria-hidden="true" /></span>
            <h3>100% Verified Properties</h3>
            <p>Property details and documents are checked to help you make a confident decision.</p>
          </article>
          <article className="trust-card">
            <span className="trust-icon trust-icon-orange"><Zap size={24} aria-hidden="true" /></span>
            <h3>Fast Support</h3>
            <p>Get clear answers and practical help from our team throughout your search.</p>
          </article>
          <article className="trust-card">
            <span className="trust-icon trust-icon-green"><WalletCards size={24} aria-hidden="true" /></span>
            <h3>Transparent Prices, No Hidden Fees</h3>
            <p>See the important details up front and compare homes on a fair basis.</p>
          </article>
        </div>
      </Container>

      <Container as="section" className="owner-cta" aria-labelledby="owner-cta-heading">
        <div className="owner-cta-copy">
          <span className="owner-cta-icon"><CheckCircle2 size={23} aria-hidden="true" /></span>
          <div>
            <h2 id="owner-cta-heading">Have a Property for Sale or Rent?</h2>
            <p>Add it with us now and connect with thousands of serious buyers easily.</p>
          </div>
        </div>
        <Link className="button button-owner" href="/admin/login">
          Add Your Property for Free<ArrowRight size={18} aria-hidden="true" />
        </Link>
      </Container>
    </div>
  );
}

function CityCard({ city, count }: { city: City; count: number }) {
  return (
    <Link
      className="city-card"
      href={"/properties?" + buildQueryString({ citySlug: city.slug })}
    >
      <span className="city-card-icon"><Map size={21} aria-hidden="true" /></span>
      <span className="city-card-copy">
        <strong>{city.name}</strong>
        <span>{count} Properties</span>
      </span>
      <ArrowRight className="city-card-arrow" size={17} aria-hidden="true" />
    </Link>
  );
}
