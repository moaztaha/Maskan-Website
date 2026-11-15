"use server";

import "server-only";

import { inquirySchema } from "@/lib/validations/inquiry.schema";
import type { InquirySubmissionResult } from "@/types/inquiry";

// TODO(db): replace the body with prisma.inquiry.create plus rate limiting; keep the signature and return type unchanged.
export async function submitInquiry(
  formData: FormData,
): Promise<InquirySubmissionResult> {
  const parsed = inquirySchema.safeParse({
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    propertyId: String(formData.get("propertyId") ?? "") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: "Please check the inquiry details and try again." };
  }

  console.log("Mock inquiry submitted:", parsed.data);
  return { ok: true };
}
