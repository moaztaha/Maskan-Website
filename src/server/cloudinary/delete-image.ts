import "server-only";
import { cloudinary } from "./cloudinary";

export async function deleteImage(publicId: string) {
    if (!publicId.trim()) {
        throw new Error("Image public ID is required.");
    }

    const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
    });

    if (result.result !== "ok" && result.result !== "not found") {
        throw new Error("Failed to delete image from Cloudinary.");
    }

    return result;
}