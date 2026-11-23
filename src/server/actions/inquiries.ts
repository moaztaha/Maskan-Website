"use server";

import "server-only";
import { prisma } from "@/server/db/prisma";
import { inquirySchema } from "@/lib/validations/inquiry.schema";
import type { InquirySubmissionResult } from "@/types/inquiry";

export async function submitInquiry(
  formData: FormData,
): Promise<InquirySubmissionResult> {
  const parsed = inquirySchema.safeParse({
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    propertyId: String(formData.get("propertyId") ?? ""),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the inquiry details and try again.",
    };
  }

  try {
    const property = await prisma.property.findFirst({
      where: {
        id: parsed.data.propertyId,
        status: "PUBLISHED",
      },
      select: {
        id: true,
      },
    });

    if (!property) {
      return {
        ok: false,
        error: "This property is no longer available.",
      };
    }

    await prisma.inquiry.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        message: parsed.data.message,
        propertyId: property.id,
      },
    });

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Unable to submit your inquiry. Please try again.",
    };
  }
}
