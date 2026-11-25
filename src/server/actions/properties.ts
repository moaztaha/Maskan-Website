
"use server";

import "server-only";

import { prisma } from "@/server/db/prisma";
import { propertySchema } from "@/lib/validations/property.schema";
import { getCurrentAdmin } from "@/server/auth/get-current-admin";
import { uploadAndSaveImage } from "@/server/cloudinary/upload-and-save-image";
import { deleteImage } from "@/server/cloudinary/delete-image";
import { revalidatePath } from "next/cache";

type CreatePropertyResult =
    | { ok: true; propertyId: string }
    | { ok: false; error: string };

// Generate a unique slug from the property title.
async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    const baseSlug =
        title
            .trim()
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || `property-${Date.now()}`;

    let slug = baseSlug;
    let counter = 2;

    while (
        await prisma.property.findFirst({
            where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
            select: { id: true },
        })
    ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}

export async function updateProperty(
    propertyId: string,
    formData: FormData,
): Promise<CreatePropertyResult> {
    const admin = await getCurrentAdmin();
    if (!admin) return { ok: false, error: "You are not authorized to update properties." };

    const current = await prisma.property.findUnique({
        where: { id: propertyId },
        include: { images: { orderBy: { position: "asc" } }, amenities: { select: { id: true } } },
    });
    if (!current) return { ok: false, error: "This property could not be found." };

    const images = [0, 1, 2].map((index) => ({
        file: formData.get(`image-${index}`) || undefined,
        alt: String(formData.get(`imageAlt-${index}`) ?? ""),
    }));
    const parsed = propertySchema.safeParse({
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        purpose: String(formData.get("purpose") ?? ""),
        type: String(formData.get("type") ?? ""),
        price: String(formData.get("price") ?? ""),
        areaSqm: String(formData.get("areaSqm") ?? ""),
        status: String(formData.get("status") ?? ""),
        isFeatured: formData.get("isFeatured") === "true",
        bedrooms: String(formData.get("bedrooms") ?? ""),
        bathrooms: String(formData.get("bathrooms") ?? ""),
        floor: String(formData.get("floor") ?? ""),
        finishing: formData.get("finishing") || undefined,
        yearBuilt: String(formData.get("yearBuilt") ?? ""),
        governorateId: String(formData.get("governorateId") ?? ""),
        cityId: String(formData.get("cityId") ?? ""),
        areaId: String(formData.get("areaId") ?? ""),
        addressDetails: String(formData.get("addressDetails") ?? ""),
        amenities: formData.getAll("amenities").map(String),
        images,
    });
    if (!parsed.success) return { ok: false, error: "Please check the property details and try again." };

    const data = parsed.data;
    try {
        const area = await prisma.area.findFirst({
            where: { id: data.areaId, cityId: data.cityId, city: { governorateId: data.governorateId } },
            select: { id: true },
        });
        if (!area) return { ok: false, error: "The selected location is invalid. Please select it again." };
        const amenityIds = [...new Set(data.amenities)];
        const validAmenities = await prisma.amenity.count({ where: { id: { in: amenityIds } } });
        if (validAmenities !== amenityIds.length) return { ok: false, error: "One or more selected amenities are invalid." };

        const slug = await generateUniqueSlug(data.title, propertyId);
        await prisma.property.update({
            where: { id: propertyId },
            data: {
                slug, title: data.title, description: data.description, purpose: data.purpose,
                type: data.type, status: data.status, isFeatured: data.isFeatured, price: data.price,
                areaSqm: data.areaSqm, bedrooms: data.bedrooms, bathrooms: data.bathrooms,
                floor: data.floor, finishing: data.finishing, yearBuilt: data.yearBuilt,
                addressDetails: data.addressDetails, areaId: data.areaId, cityId: data.cityId,
                publishedAt: data.status === "PUBLISHED" ? current.publishedAt ?? new Date() : null,
                amenities: { set: amenityIds.map((id) => ({ id })) },
            },
        });

        for (const [position, image] of data.images.entries()) {
            const previous = current.images.find((item) => item.position === position);
            if (image.file) {
                const replacement = await uploadAndSaveImage({ file: image.file, propertyId, alt: image.alt, position, isCover: position === 0 });
                if (previous) {
                    await prisma.propertyImage.delete({ where: { id: previous.id } });
                    await deleteImage(previous.publicId);
                }
                void replacement;
            } else if (previous) {
                await prisma.propertyImage.update({ where: { id: previous.id }, data: { alt: image.alt, isCover: position === 0 } });
            } else {
                return { ok: false, error: "Please add an image for each image slot." };
            }
        }
        revalidatePath("/admin/properties");
        revalidatePath("/");
        return { ok: true, propertyId };
    } catch {
        return { ok: false, error: "Unable to update the property. Please try again." };
    }
}

export async function createProperty(
    formData: FormData,
): Promise<CreatePropertyResult> {
    // 1. Make sure the current user is an active admin.
    const admin = await getCurrentAdmin();

    if (!admin) {
        return {
            ok: false,
            error: "You are not authorized to create properties.",
        };
    }

    // 2. Prepare the form data for validation.
    const images = [0, 1, 2].map((index) => ({
        file: formData.get(`image-${index}`) || undefined,
        alt: String(formData.get(`imageAlt-${index}`) ?? ""),
    }));

    const parsed = propertySchema.safeParse({
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        purpose: String(formData.get("purpose") ?? ""),
        type: String(formData.get("type") ?? ""),
        price: String(formData.get("price") ?? ""),
        areaSqm: String(formData.get("areaSqm") ?? ""),
        status: String(formData.get("status") ?? ""),
        isFeatured: formData.get("isFeatured") === "true",
        bedrooms: String(formData.get("bedrooms") ?? ""),
        bathrooms: String(formData.get("bathrooms") ?? ""),
        floor: String(formData.get("floor") ?? ""),
        finishing: formData.get("finishing") || undefined,
        yearBuilt: String(formData.get("yearBuilt") ?? ""),
        governorateId: String(formData.get("governorateId") ?? ""),
        cityId: String(formData.get("cityId") ?? ""),
        areaId: String(formData.get("areaId") ?? ""),
        addressDetails: String(formData.get("addressDetails") ?? ""),
        amenities: formData.getAll("amenities").map(String),
        images,
    });

    if (!parsed.success) {
        return {
            ok: false,
            error: "Please check the property details and try again.",
        };
    }

    const data = parsed.data;

    if (data.images.some((image) => !image.file)) {
        return { ok: false, error: "Please select all three property images." };
    }

    try {
        // 3. Verify that the selected area belongs to the selected city
        // and that the city belongs to the selected governorate.
        const area = await prisma.area.findFirst({
            where: {
                id: data.areaId,
                cityId: data.cityId,
                city: {
                    governorateId: data.governorateId,
                },
            },
            select: {
                id: true,
            },
        });

        if (!area) {
            return {
                ok: false,
                error: "The selected location is invalid. Please select it again.",
            };
        }

        // 4. Verify that all selected amenities exist.
        const amenityIds = [...new Set(data.amenities)];

        const amenities = await prisma.amenity.findMany({
            where: {
                id: { in: amenityIds },
            },
            select: {
                id: true,
            },
        });

        if (amenities.length !== amenityIds.length) {
            return {
                ok: false,
                error: "One or more selected amenities are invalid.",
            };
        }

        // 5. Create the property record.
        const slug = await generateUniqueSlug(data.title);

        const property = await prisma.property.create({
            data: {
                slug,
                title: data.title,
                description: data.description,
                purpose: data.purpose,
                type: data.type,
                status: data.status,
                isFeatured: data.isFeatured,
                price: data.price,
                areaSqm: data.areaSqm,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                floor: data.floor,
                finishing: data.finishing,
                yearBuilt: data.yearBuilt,
                addressDetails: data.addressDetails,
                areaId: data.areaId,
                cityId: data.cityId,
                publishedAt:
                    data.status === "PUBLISHED" ? new Date() : null,
                amenities: {
                    connect: amenityIds.map((id) => ({ id })),
                },
            },
            select: {
                id: true,
            },
        });

        try {
            // 6. Upload the three images and save their database records.
            for (const [index, image] of data.images.entries()) {
                await uploadAndSaveImage({
                    file: image.file!,
                    propertyId: property.id,
                    alt: image.alt,
                    position: index,
                    isCover: index === 0,
                });
            }
        } catch (uploadError) {
            // 7. Clean up uploaded Cloudinary images if an upload fails.
            const savedImages = await prisma.propertyImage.findMany({
                where: { propertyId: property.id },
                select: { publicId: true },
            });

            await Promise.allSettled(
                savedImages.map((image) => deleteImage(image.publicId)),
            );

            // Deleting the property also deletes its related image records.
            await prisma.property.delete({
                where: { id: property.id },
            });

            throw uploadError;
        }

        return {
            ok: true,
            propertyId: property.id,
        };
    } catch {
        return {
            ok: false,
            error: "Unable to create the property. Please try again.",
        };
    }
}

