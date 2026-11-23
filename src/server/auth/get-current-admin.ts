import "server-only";

import { prisma } from "@/server/db/prisma";
import { verifySession } from "./session";

export async function getCurrentAdmin() {
    const session = await verifySession();

    if (!session) {
        return null;
    }

    const admin = await prisma.admin.findUnique({
        where: {
            id: session.adminId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
        },
    });

    if (!admin || !admin.isActive) {
        return null;
    }

    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
    };
}