import type { Metadata } from "next";
import { Suspense } from "react";
import { HomePageContent } from "@/components/property/HomePageContent";
import {
  getFeaturedProperties,
  getLatestProperties,
} from "@/server/queries/properties";
import {
  getAreasByCity,
  getCities,
  getCityListingCounts,
} from "@/server/queries/locations";
import { parseFilters, type SearchParams } from "@/lib/utils/filters";
import { HomePageSkeleton } from "@/components/ui/LoadingSkeletons";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Find Your Ideal Home in Egypt | Maskan",
    description:
      "Explore verified properties for sale and rent across Egypt with Maskan.",
  };
}

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default function Page({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageLoader searchParams={searchParams} />
    </Suspense>
  );
}

async function HomePageLoader({ searchParams }: PageProps) {
  const filters = parseFilters(await searchParams);
  const [featuredProperties, latestProperties, cityCounts, cities] =
    await Promise.all([
      getFeaturedProperties(3),
      getLatestProperties(3),
      getCityListingCounts(),
      getCities(),
    ]);
  const areasByCity = await Promise.all(
    cities.map((city) => getAreasByCity(city.slug)),
  );

  return (
    <HomePageContent
      featuredProperties={featuredProperties}
      latestProperties={latestProperties}
      cityCounts={cityCounts}
      cities={cities}
      areas={areasByCity.flat()}
      initialFilters={filters}
    />
  );
}
