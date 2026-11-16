"use client";

import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locationPin = divIcon({
  className: "contact-map-pin-icon",
  html: '<span class="contact-map-pin"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

export function LeafletContactMap({ latitude, longitude, label }: {
  latitude: number;
  longitude: number;
  label: string;
}) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={false}
      className="contact-leaflet-map"
      aria-label={`Map centered on ${label}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={locationPin}>
        <Popup>{label}</Popup>
      </Marker>
    </MapContainer>
  );
}
