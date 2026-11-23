import "server-only";
import { prisma } from "@/server/db/prisma";
import { deleteImage } from "@/server/cloudinary/delete-image";

export async function deletePropertyImage(imageId: string) {
    if (!imageId.trim()) {
        throw new Error("Image ID is required.");
    }

    // 1. نجيب بيانات الصورة من قاعدة البيانات
    const image = await prisma.propertyImage.findUnique({
        where: { id: imageId },
        select: {
            id: true,
            publicId: true,
        },
    });

    if (!image) {
        throw new Error("Image not found.");
    }

    // 2. نحذف الصورة من Cloudinary
    await deleteImage(image.publicId);

    // 3. نحذف سجل الصورة من قاعدة البيانات
    await prisma.propertyImage.delete({
        where: { id: image.id },
    });

    return { success: true };
}