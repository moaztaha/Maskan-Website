"use client";

import dynamic from "next/dynamic";

const LeafletContactMap = dynamic(
  () => import("@/components/contact/LeafletContactMap").then((module) => module.LeafletContactMap),
  {
    ssr: false,
    loading: () => <div className="contact-map-loading" aria-busy="true">Loading map…</div>,
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
