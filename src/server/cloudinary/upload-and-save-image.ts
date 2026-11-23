import "server-only";

import { saveImage } from "@/server/cloudinary/save-image";
import { deleteImage } from "@/server/cloudinary/delete-image";
import { uploadImage } from "./uplode-image";

type UploadAndSaveImageInput = {
    file: File;
    propertyId: string;
    alt: string;
    position?: number;
    isCover?: boolean;
};

export async function uploadAndSaveImage(
    input: UploadAndSaveImageInput,
) {
    // 1. Upload image to Cloudinary
    const uploadedImage = await uploadImage(
        input.file,
        input.propertyId,
    );

    try {
        // 2. Save image metadata in database
        const savedImage = await saveImage({
            propertyId: input.propertyId,
            publicId: uploadedImage.publicId,
            url: uploadedImage.url,
            alt: input.alt,
            width: uploadedImage.width,
            height: uploadedImage.height,
            position: input.position,
            isCover: input.isCover,
        });

        return savedImage;
    } catch (error) {
        // 3. Roll back Cloudinary upload if database save fails
        await deleteImage(uploadedImage.publicId);

        throw error;
    }
}