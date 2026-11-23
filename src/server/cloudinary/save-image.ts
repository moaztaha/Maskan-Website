import "server-only";
import { prisma } from "@/server/db/prisma";

type SaveImageInput = {
    propertyId: string;
    publicId: string;
    url: string;
    alt: string;
    width: number;
    height: number;
    position?: number;
    isCover?: boolean;
};

export async function saveImage(input: SaveImageInput) {
    const image = await prisma.propertyImage.create({
        data: {
            propertyId: input.propertyId,
            publicId: input.publicId,
            url: input.url,
            alt: input.alt,
            width: input.width,
            height: input.height,
            position: input.position ?? 0,
            isCover: input.isCover ?? false,
        },
    });

    return image;
}