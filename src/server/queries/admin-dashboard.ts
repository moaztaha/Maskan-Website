
import "server-only";

import { prisma } from "@/server/db/prisma";

export async function getDashboardStats() {
    const [
        totalProperties,
        publishedProperties,
        draftProperties,
        soldProperties,
        totalInquiries,
        newInquiries,
        contactedInquiries,
        completedInquiries,
    ] = await Promise.all([
        prisma.property.count(),
        prisma.property.count({ where: { status: "PUBLISHED" } }),
        prisma.property.count({ where: { status: "DRAFT" } }),
        prisma.property.count({ where: { status: "SOLD" } }),

        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { status: "NEW" } }),
        prisma.inquiry.count({ where: { status: "CONTACTED" } }),
        prisma.inquiry.count({ where: { status: "COMPLETED" } }),
    ]);

    return {
        properties: {
            total: totalProperties,
            published: publishedProperties,
            draft: draftProperties,
            sold: soldProperties,
        },
        inquiries: {
            total: totalInquiries,
            new: newInquiries,
            contacted: contactedInquiries,
            completed: completedInquiries,
        },
    };
}


