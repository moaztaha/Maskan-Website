import "server-only";

import { prisma } from "@/server/db/prisma";

type ReorderPropertyImagesInput = {
    propertyId: string;
    imageIds: string[];
};

export async function reorderPropertyImages(
    input: ReorderPropertyImagesInput,
) {
    const { propertyId, imageIds } = input;

    if (!propertyId.trim()) {
        throw new Error("Property ID is required.");
    }

    if (new Set(imageIds).size !== imageIds.length) {
        throw new Error("Duplicate image IDs are not allowed.");
    }

    return prisma.$transaction(async (tx) => {
        const images = await tx.propertyImage.findMany({
            where: { propertyId },
            select: { id: true },
        });

        const existingIds = new Set(images.map((image) => image.id));

        if (
            images.length !== imageIds.length ||
            !imageIds.every((id) => existingIds.has(id))
        ) {
            throw new Error("Invalid image IDs for this property.");
        }

        await Promise.all(
            imageIds.map((id, index) =>
                tx.propertyImage.update({
                    where: { id },
                    data: { position: index },
                }),
            ),
        );

        return tx.propertyImage.findMany({
            where: { propertyId },
            orderBy: { position: "asc" },
        });
    });
}