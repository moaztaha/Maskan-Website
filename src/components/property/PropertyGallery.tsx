"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PropertyImage } from "@/types/property";

export function PropertyGallery({
  images,
  title,
  unavailable = false,
}: {
  images: PropertyImage[];
  title: string;
  unavailable?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const photos = [...images].sort((a, b) => a.position - b.position);
  const sidePhotos = photos.slice(1, 3);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % photos.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, photos.length]);

  return (
    <>
      <section className={"property-gallery" + (unavailable ? " is-unavailable" : "")} aria-label="صور العقار">
        {photos.length ? (
          <>
            <button className="property-gallery-main" onClick={() => setActive(0)} aria-label="عرض الصورة الرئيسية">
              <Image src={photos[0].url} alt={photos[0].alt || title} fill priority sizes="(max-width: 700px) 100vw, 75vw" />
              {!unavailable && <span className="property-gallery-gradient" aria-hidden="true" />}
              {unavailable && <span className="property-gallery-sold"><strong>العقار مباع</strong><small>لم يعد متاحًا للحجز</small></span>}
            </button>
            {!unavailable && sidePhotos.length > 0 && (
              <div className="property-gallery-side">
                {sidePhotos.map((photo, index) => {
                  const photoIndex = index + 1;
                  const isLastThumbnail = index === sidePhotos.length - 1;
                  return (
                    <div className="property-gallery-thumb" key={photo.url + photo.position}>
                      <button className="property-gallery-thumb-image" type="button" onClick={() => setActive(photoIndex)} aria-label={"عرض الصورة " + (photoIndex + 1)}>
                        <Image src={photo.url} alt={photo.alt || title} fill sizes="(max-width: 700px) 50vw, 25vw" />
                      </button>
                      {isLastThumbnail && photos.length > 1 && (
                        <button className="property-gallery-more" type="button" onClick={() => setActive(0)}>
                          <Camera size={19} aria-hidden="true" />View All Photos ({photos.length})
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {(unavailable || sidePhotos.length === 0) && (
              <button className="property-gallery-count" type="button" onClick={() => setActive(0)}>
                <Camera size={16} aria-hidden="true" />View All Photos ({photos.length})
              </button>
            )}
          </>
        ) : <div className="property-gallery-empty">لا توجد صور متاحة لهذا العقار</div>}
      </section>
      {active !== null && photos[active] && (
        <div className="property-lightbox" role="dialog" aria-modal="true" aria-label="معرض صور العقار" onClick={() => setActive(null)}>
          <button className="property-lightbox-close" onClick={() => setActive(null)} aria-label="إغلاق"><X /></button>
          <button className="property-lightbox-arrow previous" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + photos.length) % photos.length); }} aria-label="الصورة السابقة"><ChevronLeft /></button>
          <div className="property-lightbox-image" onClick={(event) => event.stopPropagation()}>
            <Image src={photos[active].url} alt={photos[active].alt || title} fill sizes="90vw" priority />
          </div>
          <button className="property-lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % photos.length); }} aria-label="الصورة التالية"><ChevronRight /></button>
          <span className="property-lightbox-count">{active + 1} / {photos.length}</span>
        </div>
      )}
    </>
  );
}
