
import { prisma } from "../src/server/db/prisma";
import { mockGovernorates, mockCities, mockAreas } from "../src/server/mock/locations";
import { mockAmenities } from "../src/server/mock/amenities";
import { mockPropertySeeds } from "../src/server/mock/properties";

async function main() {
    for (const governorate of mockGovernorates) {
        await prisma.governorate.upsert({
            where: {
                id: governorate.id,
            },
            update: {
                name: governorate.name,
                slug: governorate.slug,
            },
            create: {
                id: governorate.id,
                name: governorate.name,
                slug: governorate.slug,
            },
        });
    }
    console.log("Governorates seeded successfully!");

    for (const city of mockCities) {
        await prisma.city.upsert({
            where: {
                id: city.id,
            },
            update: {
                name: city.name,
                slug: city.slug,
                governorateId: city.governorateId,
            },
            create: {
                id: city.id,
                name: city.name,
                slug: city.slug,
                governorateId: city.governorateId,
            },
        });
    }
    console.log("Cities seeded successfully!");

    for (const area of mockAreas) {
        await prisma.area.upsert({
            where: {
                id: area.id,
            },
            update: {
                name: area.name,
                slug: area.slug,
                cityId: area.cityId,
                description: area.description,
                faqs: area.faqs,
            },
            create: {
                id: area.id,
                name: area.name,
                slug: area.slug,
                cityId: area.cityId,
                description: area.description,
                faqs: area.faqs,
            },
        });
    }
    console.log("Areas seeded successfully!");

    for (const amenity of mockAmenities) {
        await prisma.amenity.upsert({
            where: {
                id: amenity.id,
            },
            update: {
                name: amenity.name,
                slug: amenity.slug,
                icon: amenity.icon,
            },
            create: {
                id: amenity.id,
                name: amenity.name,
                slug: amenity.slug,
                icon: amenity.icon,
            },
        });
    }
    console.log("Amenities seeded successfully!");

    for (const property of mockPropertySeeds) {
        await prisma.property.upsert({
            where: {
                id: property.id,
            },
            update: {
                slug: property.slug,
                title: property.title,
                description: property.description,
                purpose: property.purpose,
                type: property.type,
                status: property.status,
                isFeatured: property.isFeatured,
                price: property.price,
                areaSqm: property.areaSqm,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                floor: property.floor,
                finishing: property.finishing,
                yearBuilt: property.yearBuilt,
                areaId: property.areaId,
                cityId: property.cityId,
                amenities: {
                    set: property.amenityIds?.map((id) => ({ id })) ?? [],
                },
            },
            create: {
                id: property.id,
                slug: property.slug,
                title: property.title,
                description: property.description,
                purpose: property.purpose,
                type: property.type,
                status: property.status,
                isFeatured: property.isFeatured,
                price: property.price,
                areaSqm: property.areaSqm,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                floor: property.floor,
                finishing: property.finishing,
                yearBuilt: property.yearBuilt,
                areaId: property.areaId,
                cityId: property.cityId,
                amenities: {
                    connect: property.amenityIds?.map((id) => ({ id })) ?? [],
                },
            },
        });
    }

    console.log("Properties seeded successfully!");
}

main()
    .catch((error) => {
        console.error("Seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

