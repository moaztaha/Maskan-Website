"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

const LeafletContactMap = dynamic(
  () => import("@/components/contact/LeafletContactMap").then((module) => module.LeafletContactMap),
  {
    ssr: false,
    loading: () => <div className="contact-map-loading" aria-busy="true" aria-label="Loading map"><Skeleton className="h-full w-full rounded-lg" /></div>,
  },
);

export function PropertyMap({ latitude, longitude, label }: {
  latitude: number;
  longitude: number;
  label: string;
}) {
  return (
    <div className="contact-map" aria-label={`Map showing ${label}`}>
      <LeafletContactMap latitude={latitude} longitude={longitude} label={label}/>
    </div>
  );
}
