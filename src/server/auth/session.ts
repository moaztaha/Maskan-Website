
import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "maskan_admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60;

function getSecretKey() {
    const secret = process.env.SESSION_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error("SESSION_SECRET is missing or invalid.");
    }

    return new TextEncoder().encode(secret);
}

export async function createSession(adminId: string) {
    const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

    const token = await new SignJWT({ adminId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getSecretKey());

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
    });
}

export async function verifySession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, getSecretKey());

        if (typeof payload.adminId !== "string") {
            return null;
        }

        return {
            adminId: payload.adminId,
        };
    } catch {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME);
}
