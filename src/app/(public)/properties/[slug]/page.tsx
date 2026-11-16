import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PropertyDetails } from "@/components/property/PropertyDetails";
import { PropertyUnavailable } from "@/components/property/PropertyUnavailable";
import { getPropertyBySlug, getSimilarProperties } from "@/server/queries/properties";

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <PropertyDetailsContent params={params} />
    </Suspense>
  );
}

async function PropertyDetailsContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  if (property.status === "SOLD") {
    const similar = await getSimilarProperties(property, 6);
    return <PropertyUnavailable property={property} similar={similar} />;
  }

  const similar = await getSimilarProperties(property, 3);
  return <PropertyDetails property={property} similar={similar} />;
}
