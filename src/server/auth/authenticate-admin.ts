
import "server-only";

import bcrypt from "bcryptjs";
import { prisma } from "@/server/db/prisma";

type AuthenticateAdminInput = {
    email: string;
    password: string;
};

export async function authenticateAdmin({
    email,
    password,
}: AuthenticateAdminInput) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
        return null;
    }

    const admin = await prisma.admin.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (!admin || !admin.isActive) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        admin.passwordHash,
    );

    if (!isPasswordValid) {
        return null;
    }

    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
    };
}
