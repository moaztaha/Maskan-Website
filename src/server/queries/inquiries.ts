import "server-only";
import { prisma } from "../db/prisma";

export async function getInquiryActivity() {
    // Start from midnight UTC, 29 days ago.
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setUTCDate(startDate.getUTCDate() - 29);

    // Fetch inquiries created during the last 30 days.
    const inquiries = await prisma.inquiry.findMany({
        where: {
            createdAt: {
                gte: startDate,
            },
        },
        select: {
            createdAt: true,
        },
    });

    // Count inquiries for each date.
    const countsByDate = new Map<string, number>();

    for (const inquiry of inquiries) {
        const dateKey = inquiry.createdAt.toISOString().slice(0, 10);

        countsByDate.set(
            dateKey,
            (countsByDate.get(dateKey) ?? 0) + 1,
        );
    }

    // Build all 30 days, including days with zero inquiries.
    return Array.from({ length: 30 }, (_, index) => {
        const date = new Date(startDate);
        date.setUTCDate(startDate.getUTCDate() + index);

        const dateKey = date.toISOString().slice(0, 10);

        return {
            date: dateKey,
            count: countsByDate.get(dateKey) ?? 0,
        };
    });
}


export async function getInquiries(page: number = 1) {
    const pageSize = 5;

    const [inquiries, totalInquiries] = await Promise.all([
        prisma.inquiry.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                message: true,
                status: true,
                createdAt: true,
                property: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
        }),

        prisma.inquiry.count(),
    ]);

    return {
        inquiries,
        totalInquiries,
        totalPages: Math.ceil(totalInquiries / pageSize),
        currentPage: page,
        pageSize,
    };
}

