
import { z } from "zod";

// Convert input values into numbers
const numberFromInput = <T>(schema: z.ZodType<T>) =>
    z.preprocess(
        (value) => {
            if (value === "" || value === null || value === undefined) {
                return undefined;
            }

            if (typeof value === "string") {
                return Number(value);
            }

            return value;
        },
        schema,
    );

const optionalNumber = <T>(schema: z.ZodType<T>) =>
    z.preprocess(
        (value) => {
            if (value === "" || value === null || value === undefined) {
                return undefined;
            }

            if (typeof value === "string") {
                return Number(value);
            }

            return value;
        },
        schema.optional(),
    );

export const propertySchema = z.object({
    // Basic Information
    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters.")
        .max(100, "Title cannot exceed 100 characters."),

    description: z
        .string()
        .trim()
        .min(15, "Description must be at least 15 characters."),

    purpose: z.enum(["SALE", "RENT"], {
        error: "Choose a property purpose.",
    }),

    type: z.enum(
        ["APARTMENT", "VILLA", "DUPLEX", "LAND", "SHOP", "OFFICE", "CHALET"],
        {
            error: "Choose a property type.",
        },
    ),

    // Pricing & Area
    price: numberFromInput(
        z
            .number({ error: "Enter a valid property price." })
            .positive("Price must be greater than zero."),
    ),

    areaSqm: optionalNumber(
        z.number().positive("Area must be greater than zero."),
    ),

    // Status
    status: z.enum(["DRAFT", "PUBLISHED", "SOLD"], {
        error: "Choose a property status.",
    }),

    isFeatured: z.boolean().default(false),

    // Property Details
    bedrooms: optionalNumber(
        z
            .number()
            .int("Bedrooms must be a whole number.")
            .min(0, "Bedrooms cannot be negative."),
    ),

    bathrooms: optionalNumber(
        z
            .number()
            .int("Bathrooms must be a whole number.")
            .min(0, "Bathrooms cannot be negative."),
    ),

    floor: optionalNumber(
        z.number().int("Floor must be a whole number."),
    ),

    finishing: z
        .enum(["CORE_AND_SHELL", "SEMI_FINISHED", "FINISHED", "SUPER_LUX"])
        .optional(),

    yearBuilt: optionalNumber(
        z
            .number()
            .int("Year must be a whole number.")
            .min(1800, "Enter a valid construction year.")
            .max(new Date().getFullYear(), "Year cannot be in the future."),
    ),

    // Location
    governorateId: z
        .string()
        .min(1, "Choose a governorate."),

    cityId: z
        .string()
        .min(1, "Choose a city."),

    areaId: z
        .string()
        .min(1, "Choose an area."),

    addressDetails: z.string().trim().optional(),

    // Amenities
    amenities: z.array(z.string()).default([]),

    // Images
    images: z
        .array(
            z.object({
                file: z
                    .instanceof(File, {
                        error: "Please select a valid image.",
                    })
                    .refine(
                        (file) =>
                            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
                        "Only JPG, PNG, and WebP images are allowed.",
                    )
                    .refine(
                        (file) => file.size <= 5 * 1024 * 1024,
                        "Image size must not exceed 5MB.",
                    ).nullable().optional(),

                alt: z
                    .string()
                    .trim()
                    .min(1, "Image description is required."),
            }),
        )
        .length(3, "Exactly 3 images are required."),
});

export type PropertyInput = z.infer<typeof propertySchema>;
