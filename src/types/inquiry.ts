import type { Property } from "@/types/property";

export type InquiryStatus = "NEW" | "CONTACTED" | "CLOSED";
export type InquirySubmissionResult =
  | { ok: true }
  | { ok: false; error: string };

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: InquiryStatus;
  propertyId?: string;
  property?: Property;
  createdAt: Date;
  repliedAt?: Date;
}
