import "server-only";
import { cloudinary } from "./cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
];

type UploadImageResult = {
    publicId: string;
    url: string;
    width: number;
    height: number;
    format: string;
};

export async function uploadImage(
    file: File,
    propertyId: string,
): Promise<UploadImageResult> {
    // 1. Validate file
    if (!file || file.size === 0) {
        throw new Error("Image file is required.");
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error("Unsupported image format.");
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error("Image size must not exceed 5MB.");
    }

    // 2. Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 3. Upload to Cloudinary
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: `maskan/properties/${propertyId}`,
                resource_type: "image",
            },
            (error, result) => {
                if (error || !result) {
                    reject(error ?? new Error("Image upload failed."));
                    return;
                }

                resolve({
                    publicId: result.public_id,
                    url: result.secure_url,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                });
            },
        );

        stream.end(buffer);
    });
}