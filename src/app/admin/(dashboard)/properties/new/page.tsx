import { getAmenities } from "@/server/queries/properties";
import { getAreasByCity, getCities } from "@/server/queries/locations";
import { PropertyForm } from "@/components/admin/dashboard/properties/PropertyForm";
import { getAdminPropertyById } from "@/server/queries/properties";
import { notFound } from "next/navigation";

export default async function NewPropertyPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams;
  const property = edit ? await getAdminPropertyById(edit) : null;
  if (edit && !property) notFound();
  const [cities, amenities] = await Promise.all([getCities(), getAmenities()]);
  const cityAreas = await Promise.all(cities.map(async (city) => ({
    cityId: city.id,
    areas: (await getAreasByCity(city.slug)).map(({ id, name, nameAr, cityId }) => ({ id, name, nameAr, cityId })),
  })));
  const governorates = [...new Map(cities.map(({ governorate }) => [governorate.id, {
    id: governorate.id, name: governorate.name, nameAr: governorate.nameAr,
  }])).values()];
  const cityOptions = cities.map(({ id, name, nameAr, governorateId }) => ({ id, name, nameAr, governorateId }));
  const areaOptions = cityAreas.flatMap(({ areas }) => areas);
  const amenityOptions = amenities.map(({ id, name, nameAr }) => ({ id, name, nameAr }));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <a href="/admin/properties" className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">← Back to properties</a>
          <p className="text-xs text-text-muted">Dashboard / Properties / {property ? "Update Property" : "Add New Property"}</p>
          <h1 className="mt-2 font-[var(--font-cairo)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">{property ? "Update Property" : "Add New Property"}</h1>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary">{property ? "Update the listing details, pricing, location, and photos." : "Create a new property listing with complete details, pricing, location, and photos."}</p>
        </div>
      </div>
      <PropertyForm governorates={governorates} cities={cityOptions} areas={areaOptions} amenities={amenityOptions} property={property ? {
        ...property,
        price: Number(property.price),
        governorateId: property.area.city.governorateId,
        areaSqm: property.areaSqm,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        floor: property.floor,
        yearBuilt: property.yearBuilt,
        addressDetails: property.addressDetails,
        finishing: property.finishing,
      } : undefined} />
    </div>
  );
}
