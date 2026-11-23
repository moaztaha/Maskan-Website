"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { authenticateAdmin } from "@/server/auth/authenticate-admin";
import { createSession, deleteSession } from "@/server/auth/session";

const loginSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().min(1, "Password is required."),
});

export async function loginAdmin(formData: FormData) {
    const validation = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validation.success) {
        return {
            error: "Please enter a valid email and password.",
        };
    }

    const admin = await authenticateAdmin(validation.data);

    if (!admin) {
        return {
            error: "Invalid email or password.",
        };
    }

    await createSession(admin.id);

    redirect("/admin");
}

export async function logoutAdmin() {
    await deleteSession();
    redirect("/admin/login");
}
