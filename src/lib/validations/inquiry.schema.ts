import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  phone: z.string().trim().min(7, "Enter a valid phone number."),
  email: z.union([z.email("Enter a valid email address."), z.literal("")]).optional(),
  message: z.string().trim().min(10, "Add a little more detail to your message."),
  propertyId: z.string().trim().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
