import { readFile } from "node:fs/promises";
import { prisma } from "@/server/db/prisma";
import { uploadAndSaveImage } from "@/server/cloudinary/upload-and-save-image";

const propertyId = "prop-002";

const photos = [
    {
        fileName: "1.jpg",
        alt: "Modern apartment living room",
        position: 0,
        isCover: true,
    },
    {
        fileName: "2.jpg",
        alt: "Modern apartment bedroom",
        position: 1,
        isCover: false,
    },
    {
        fileName: "3.jpg",
        alt: "Modern apartment kitchen",
        position: 2,
        isCover: false,
    },
];

async function main() {
    const property = await prisma.property.findUnique({
        where: { id: propertyId },
        include: { images: true },
    });

    if (!property) {
        throw new Error("Property not found.");
    }

    if (property.images.length > 0) {
        throw new Error("This property already has images.");
    }

    for (const photo of photos) {
        const buffer = await readFile(photo.fileName);

        const file = new File([buffer], photo.fileName, {
            type: "image/jpeg",
        });

        const image = await uploadAndSaveImage({
            file,
            propertyId,
            alt: photo.alt,
            position: photo.position,
            isCover: photo.isCover,
        });

        console.log("Uploaded successfully:", image.id);
    }

    console.log("All property photos uploaded successfully!");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });