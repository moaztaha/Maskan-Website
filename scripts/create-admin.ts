
import bcrypt from "bcryptjs";
import { prisma } from "@/server/db/prisma";

async function main() {
    const name = process.env.ADMIN_NAME?.trim();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
        throw new Error("Admin name, email, and password are required.");
    }

    if (password.length < 12) {
        throw new Error("Password must be at least 12 characters.");
    }

    const existingAdmin = await prisma.admin.findUnique({
        where: { email },
    });

    if (existingAdmin) {
        throw new Error("An admin with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.admin.create({
        data: {
            name,
            email,
            passwordHash,
        },
    });

    console.log("Admin account created successfully.");
}

main()
    .catch((error) => {
        console.error("Failed to create admin:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
