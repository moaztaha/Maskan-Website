"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import { createProperty, updateProperty } from "@/server/actions/properties";
import { propertySchema, type PropertyInput } from "@/lib/validations/property.schema";
import { z } from "zod";

type LocationOption = { id: string; name: string; nameAr?: string };
type CityOption = LocationOption & { governorateId: string };
type AreaOption = LocationOption & { cityId: string };
type FormValues = z.input<typeof propertySchema>;
const inputClass = "h-11 w-full rounded-lg border border-border bg-bg-surface px-3 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-bg-subtle";
const sections = "space-y-5 rounded-xl border border-border bg-bg-surface p-5 shadow-sm sm:p-7";
const labelClass = "mb-1.5 block text-sm font-medium text-text-primary";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <div><label className={labelClass}>{label}</label>{children}{error && <p className="mt-1 text-xs text-danger">{error}</p>}</div>;
}

type ExistingProperty = {
  id: string; title: string; description: string; purpose: "SALE" | "RENT";
  type: "APARTMENT" | "VILLA" | "DUPLEX" | "LAND" | "SHOP" | "OFFICE" | "CHALET";
  status: "DRAFT" | "PUBLISHED" | "SOLD"; isFeatured: boolean; price: number;
  areaSqm: number | null; bedrooms: number | null; bathrooms: number | null; floor: number | null;
  finishing: "CORE_AND_SHELL" | "SEMI_FINISHED" | "FINISHED" | "SUPER_LUX" | null;
  yearBuilt: number | null; addressDetails: string | null; areaId: string; cityId: string;
  governorateId: string; amenities: { id: string }[]; images: { url: string; alt: string; position: number }[];
};

export function PropertyForm({ governorates, cities, areas, amenities, property }: {
  governorates: LocationOption[];
  cities: CityOption[];
  areas: AreaOption[];
  amenities: LocationOption[];
  property?: ExistingProperty;
}) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [previews, setPreviews] = useState<(string | null)[]>([0, 1, 2].map((position) => property?.images.find((image) => image.position === position)?.url ?? null));
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues, unknown, PropertyInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title ?? "", description: property?.description ?? "", purpose: property?.purpose ?? "SALE", type: property?.type ?? "APARTMENT", price: property ? String(property.price) as unknown as number : "" as unknown as number,
      areaSqm: property?.areaSqm == null ? "" as unknown as number : String(property.areaSqm) as unknown as number, status: property?.status ?? "DRAFT", isFeatured: property?.isFeatured ?? false,
      bedrooms: property?.bedrooms == null ? "" as unknown as number : String(property.bedrooms) as unknown as number, bathrooms: property?.bathrooms == null ? "" as unknown as number : String(property.bathrooms) as unknown as number, floor: property?.floor == null ? "" as unknown as number : String(property.floor) as unknown as number,
      finishing: property?.finishing ?? undefined, yearBuilt: property?.yearBuilt == null ? "" as unknown as number : String(property.yearBuilt) as unknown as number, governorateId: property?.governorateId ?? "", cityId: property?.cityId ?? "", areaId: property?.areaId ?? "",
      addressDetails: property?.addressDetails ?? "", amenities: property?.amenities.map(({ id }) => id) ?? [], images: [0, 1, 2].map((position) => ({ file: null, alt: property?.images.find((image) => image.position === position)?.alt ?? "" })),
    },
  });
  const governorateId = watch("governorateId");
  const cityId = watch("cityId");
  const selectedAmenities = watch("amenities") ?? [];
  const imageValues = watch("images");
  const filteredCities = useMemo(() => cities.filter((city) => city.governorateId === governorateId), [cities, governorateId]);
  const filteredAreas = useMemo(() => areas.filter((area) => area.cityId === cityId), [areas, cityId]);

  useEffect(() => () => previews.forEach((url) => url && URL.revokeObjectURL(url)), [previews]);

  function setImage(index: number, file?: File) {
    if (file && (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setFeedback({ type: "error", text: "Choose a JPG, PNG, or WebP image smaller than 5MB." });
      return;
    }
    const next = [...(imageValues ?? [])];
    if (previews[index]) URL.revokeObjectURL(previews[index]!);
    const nextPreviews = [...previews];
    if (file) {
      next[index] = { ...next[index], file };
      nextPreviews[index] = URL.createObjectURL(file);
    } else {
      next[index] = { ...next[index], file: null as unknown as File };
      nextPreviews[index] = null;
    }
    setPreviews(nextPreviews);
    setValue("images", next, { shouldValidate: true, shouldDirty: true });
    setFeedback(null);
  }

  async function submit(values: FormValues) {
    setBusy(true);
    setFeedback(null);
    try {
      const data = new FormData();
      for (const key of ["title", "description", "purpose", "type", "price", "areaSqm", "status", "bedrooms", "bathrooms", "floor", "finishing", "yearBuilt", "governorateId", "cityId", "areaId", "addressDetails"] as const) {
        const value = values[key];
        if (value !== undefined && value !== "") data.set(key, String(value));
      }
      data.set("isFeatured", String(values.isFeatured));
      (values.amenities ?? []).forEach((id) => data.append("amenities", id));
      values.images.forEach((image, index) => {
        if (image.file) data.set(`image-${index}`, image.file);
        data.set(`imageAlt-${index}`, image.alt);
      });
      const result = property ? await updateProperty(property.id, data) : await createProperty(data);
      if (!result.ok) {
        setFeedback({ type: "error", text: result.error });
        return;
      }
      setFeedback({ type: "success", text: property ? "Property updated successfully. Returning to properties…" : "Property created successfully. Returning to properties…" });
      router.push("/admin/properties");
      router.refresh();
    } catch {
      setFeedback({ type: "error", text: "Unable to create the property. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      {feedback && <div role={feedback.type === "error" ? "alert" : "status"} className={`flex items-center gap-2 rounded-lg border p-4 text-sm ${feedback.type === "error" ? "border-danger/30 bg-danger/5 text-danger" : "border-green-300 bg-green-50 text-green-800"}`}>{feedback.type === "error" ? <AlertCircle size={18} /> : <Check size={18} />}{feedback.text}</div>}

      <section className={sections}>
        <div><h2 className="font-[var(--font-cairo)] text-xl font-semibold text-text-primary">1. Basic Information</h2><p className="mt-1 text-sm text-text-secondary">General listing identity, purpose, and property type.</p></div>
        <Field label="Property Title *" error={errors.title?.message}><input {...register("title")} className={inputClass} placeholder="e.g. Modern apartment in New Cairo" /></Field>
        <Field label="Description *" error={errors.description?.message}><textarea {...register("description")} rows={5} className="w-full rounded-lg border border-border bg-bg-surface p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Describe the property and its highlights…" /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Purpose *" error={errors.purpose?.message}><select {...register("purpose")} className={inputClass}><option value="SALE">For Sale</option><option value="RENT">For Rent</option></select></Field>
          <Field label="Property Type *" error={errors.type?.message}><select {...register("type")} className={inputClass}>{[["APARTMENT","Apartment"],["VILLA","Villa"],["DUPLEX","Duplex"],["LAND","Land"],["SHOP","Shop"],["OFFICE","Office"],["CHALET","Chalet"]].map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
        </div>
      </section>

      <section className={sections}>
        <div><h2 className="font-[var(--font-cairo)] text-xl font-semibold text-text-primary">2. Pricing & Property Details</h2><p className="mt-1 text-sm text-text-secondary">Set the price, area, and property specifications.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Price (EGP) *" error={errors.price?.message}><input {...register("price")} type="number" min="0" step="any" className={inputClass} placeholder="0" /></Field>
          <Field label="Area (m²)" error={errors.areaSqm?.message}><input {...register("areaSqm")} type="number" min="0" step="any" className={inputClass} placeholder="Optional" /></Field>
          <Field label="Bedrooms" error={errors.bedrooms?.message}><input {...register("bedrooms")} type="number" min="0" className={inputClass} /></Field>
          <Field label="Bathrooms" error={errors.bathrooms?.message}><input {...register("bathrooms")} type="number" min="0" className={inputClass} /></Field>
          <Field label="Floor" error={errors.floor?.message}><input {...register("floor")} type="number" className={inputClass} /></Field>
          <Field label="Year Built" error={errors.yearBuilt?.message}><input {...register("yearBuilt")} type="number" min="1800" max={new Date().getFullYear()} className={inputClass} /></Field>
          <Field label="Finishing" error={errors.finishing?.message}><select {...register("finishing")} className={inputClass}><option value="">Select finishing</option>{[["CORE_AND_SHELL","Core and shell"],["SEMI_FINISHED","Semi-finished"],["FINISHED","Finished"],["SUPER_LUX","Super lux"]].map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
        </div>
      </section>

      <section className={sections}>
        <div><h2 className="font-[var(--font-cairo)] text-xl font-semibold text-text-primary">3. Location</h2><p className="mt-1 text-sm text-text-secondary">Choose a governorate, then narrow down the city and area.</p></div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Governorate *" error={errors.governorateId?.message}><select {...register("governorateId", { onChange: () => { setValue("cityId", ""); setValue("areaId", ""); } })} className={inputClass}><option value="">Select governorate</option>{governorates.map((item) => <option key={item.id} value={item.id}>{item.nameAr || item.name}</option>)}</select></Field>
          <Field label="City *" error={errors.cityId?.message}><select {...register("cityId", { onChange: () => setValue("areaId", "") })} className={inputClass} disabled={!governorateId}><option value="">Select city</option>{filteredCities.map((item) => <option key={item.id} value={item.id}>{item.nameAr || item.name}</option>)}</select></Field>
          <Field label="Area *" error={errors.areaId?.message}><select {...register("areaId")} className={inputClass} disabled={!cityId}><option value="">Select area</option>{filteredAreas.map((item) => <option key={item.id} value={item.id}>{item.nameAr || item.name}</option>)}</select></Field>
        </div>
        <Field label="Address Details" error={errors.addressDetails?.message}><textarea {...register("addressDetails")} rows={2} className="w-full rounded-lg border border-border bg-bg-surface p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Building, street, or nearby landmark (optional)" /></Field>
      </section>

      <section className={sections}>
        <div><h2 className="font-[var(--font-cairo)] text-xl font-semibold text-text-primary">4. Status & Amenities</h2><p className="mt-1 text-sm text-text-secondary">Choose visibility and highlight available features.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Property Status *" error={errors.status?.message}><select {...register("status")} className={inputClass}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option><option value="SOLD">Sold</option></select></Field>
          <label className="flex min-h-11 items-center gap-3 rounded-lg border border-border px-3 text-sm font-medium text-text-primary"><input {...register("isFeatured")} type="checkbox" className="size-4 accent-primary" />Feature this property</label>
        </div>
        <Field label="Amenities"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{amenities.map((amenity) => <label key={amenity.id} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm text-text-secondary"><input type="checkbox" checked={selectedAmenities.includes(amenity.id)} onChange={(event) => setValue("amenities", event.target.checked ? [...selectedAmenities, amenity.id] : selectedAmenities.filter((id) => id !== amenity.id), { shouldDirty: true })} className="size-4 accent-primary" />{amenity.nameAr || amenity.name}</label>)}</div></Field>
      </section>

      <section className={sections}>
        <div><h2 className="font-[var(--font-cairo)] text-xl font-semibold text-text-primary">5. Property Images</h2><p className="mt-1 text-sm text-text-secondary">{property ? "Keep each current image or choose a replacement. Images must be JPG, PNG, or WebP files up to 5MB each." : "Add exactly 3 JPG, PNG, or WebP images (up to 5MB each). The first image is the cover."}</p></div>
        {errors.images?.message && <p className="text-sm text-danger">{errors.images.message}</p>}
        {([0, 1, 2] as const).map((index) => (
          <div key={index} className="grid gap-4 rounded-lg border border-border p-4 sm:grid-cols-[180px_1fr]">
            <div className="relative flex min-h-36 items-center justify-center overflow-hidden rounded-lg bg-bg-subtle">
      {previews[index] ? <img src={previews[index]!} alt={imageValues?.[index]?.alt || `Property image ${index + 1} preview`} className="absolute inset-0 size-full object-cover" /> : <div className="flex flex-col items-center gap-2 text-text-muted"><ImagePlus size={28} /><span className="text-xs">{index === 0 ? "Cover image" : `Image ${index + 1}`}</span></div>}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between"><p className="text-sm font-semibold text-text-primary">{index === 0 ? "Cover image" : `Additional image ${index}`}</p>{previews[index]?.startsWith("blob:") && <button type="button" onClick={() => setImage(index)} className="inline-flex items-center gap-1 text-xs text-danger hover:underline"><Trash2 size={14} />Remove</button>}</div>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setImage(index, event.target.files?.[0])} className="block w-full text-sm text-text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:font-medium file:text-primary" />
              <Field label="Image description (alt text) *" error={errors.images?.[index]?.alt?.message}><input value={imageValues?.[index]?.alt ?? ""} onChange={(event) => { const next = [...(imageValues ?? [])]; next[index] = { ...next[index], alt: event.target.value }; setValue("images", next, { shouldValidate: true }); }} className={inputClass} placeholder="Describe what this photo shows" /></Field>
              {errors.images?.[index]?.file?.message && <p className="text-xs text-danger">{String(errors.images[index]?.file?.message)}</p>}
            </div>
          </div>
        ))}
      </section>

      <div className="flex flex-col-reverse justify-end gap-3 border-t border-border pt-5 sm:flex-row">
        <button type="button" onClick={() => router.push("/admin/properties")} className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-text-secondary hover:bg-bg-subtle">Cancel</button>
        <button type="submit" disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60">{busy && <LoaderCircle className="animate-spin" size={17} />}{busy ? "Saving property…" : property ? "Update Property" : "Create Property"}</button>
      </div>
    </form>
  );
}





