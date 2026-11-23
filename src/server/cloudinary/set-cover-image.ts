import "server-only";

import { prisma } from "@/server/db/prisma";

type SetCoverImageInput = {
    imageId: string;
    propertyId: string;
};

export async function setCoverImage(input: SetCoverImageInput) {
    if (!input.imageId.trim() || !input.propertyId.trim()) {
        throw new Error("Image ID and Property ID are required.");
    }

    return prisma.$transaction(async (tx) => {
        // 1. Make sure the image belongs to this property
        const image = await tx.propertyImage.findFirst({
            where: {
                id: input.imageId,
                propertyId: input.propertyId,
            },
        });

        if (!image) {
            throw new Error("Image not found for this property.");
        }

        // 2. Remove cover status from other images
        await tx.propertyImage.updateMany({
            where: {
                propertyId: input.propertyId,
                isCover: true,
            },
            data: {
                isCover: false,
            },
        });

        // 3. Set the selected image as cover
        return tx.propertyImage.update({
            where: {
                id: input.imageId,
            },
            data: {
                isCover: true,
            },
        });
    });
}