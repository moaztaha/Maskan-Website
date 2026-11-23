"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { inquirySchema } from "@/lib/validations/inquiry.schema";
import { submitInquiry } from "@/server/actions/inquiries";
import type { PropertyPurpose } from "@/types/property";

type Field = "name" | "phone" | "message";

export function PropertyInquiryForm({ propertyId, purpose }: { propertyId: string; purpose: PropertyPurpose }) {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    setFormError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: "",
      subject: purpose === "RENT" ? "rent" : "buy",
      message: String(data.get("message") ?? ""),
      propertyId,
    };
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as Field;
        if (!next[field]) next[field] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setLoading(true);
    data.set("email", "");
    data.set("subject", values.subject);
    data.set("propertyId", propertyId);
    try {
      const result = await submitInquiry(data);
      if (result.ok) {
        setSuccess(true);
        form.reset();
        const message = form.elements.namedItem("message");
        if (message instanceof HTMLTextAreaElement) message.value = "I'm interested in this property";
      } else {
        setFormError(result.error);
      }
    } catch {
      setFormError("Unable to send your inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="property-inquiry" className="property-inquiry-form" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="email" value="" readOnly />
      <input type="hidden" name="subject" value={purpose === "RENT" ? "rent" : "buy"} readOnly />
      <input type="hidden" name="propertyId" value={propertyId} readOnly />
      <label>Name
        <input name="name" autoComplete="name" placeholder="Your full name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "property-name-error" : undefined} />
        {errors.name && <small id="property-name-error">{errors.name}</small>}
      </label>
      <label>Phone Number
        <input name="phone" type="tel" autoComplete="tel" placeholder="+20 1X XXX XXXX" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "property-phone-error" : undefined} />
        {errors.phone && <small id="property-phone-error">{errors.phone}</small>}
      </label>
      <label>Your Message
        <textarea name="message" rows={3} defaultValue="I'm interested in this property" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "property-message-error" : undefined} />
        {errors.message && <small id="property-message-error">{errors.message}</small>}
      </label>
      {formError && <p className="property-inquiry-error" role="alert">{formError}</p>}
      {success && <p className="property-inquiry-success" role="status"><CheckCircle2 size={18} /> Your inquiry has been sent successfully.</p>}
      <button type="submit" disabled={loading}>{loading ? <LoaderCircle className="property-spinner" size={18} /> : <Send size={18} />} {loading ? "Sending…" : "Send Inquiry"}</button>
    </form>
  );
}

export function PropertyInquiryFormDesign({ propertyId, purpose }: { propertyId: string; purpose: PropertyPurpose }) {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError("");
    setSuccess(false);
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: "",
      subject: purpose === "RENT" ? "rent" : "buy",
      message: String(data.get("message") ?? ""),
      propertyId,
    };
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as Field;
        if (!next[field]) next[field] = issue.message;
      }
      setErrors(next);
      return;
    }

    setLoading(true);
    data.set("email", "");
    data.set("subject", values.subject);
    data.set("propertyId", propertyId);
    try {
      const result = await submitInquiry(data);
      if (result.ok) {
        setSuccess(true);
        form.reset();
        const message = form.elements.namedItem("message");
        if (message instanceof HTMLTextAreaElement) message.value = "\u0623\u0646\u0627 \u0645\u0647\u062a\u0645 \u0628\u0647\u0630\u0627 \u0627\u0644\u0639\u0642\u0627\u0631";
      } else {
        setFormError(result.error);
      }
    } catch {
      setFormError("\u062a\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0643. \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="property-inquiry" className="property-inquiry-form" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="email" value="" readOnly />
      <input type="hidden" name="subject" value={purpose === "RENT" ? "rent" : "buy"} readOnly />
      <input type="hidden" name="propertyId" value={propertyId} readOnly />
      <label htmlFor="property-name">Name
        <input id="property-name" name="name" autoComplete="name" placeholder="Enter your full name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "property-name-error" : undefined} />
        {errors.name && <small id="property-name-error">{errors.name}</small>}
      </label>
      <label htmlFor="property-phone">Phone Number
        <input id="property-phone" name="phone" type="tel" autoComplete="tel" placeholder="+20 1X XXX XXXX" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "property-phone-error" : undefined} />
        {errors.phone && <small id="property-phone-error">{errors.phone}</small>}
      </label>
      <label htmlFor="property-message">Message
        <textarea id="property-message" name="message" rows={4} dir="rtl" defaultValue="\u0623\u0646\u0627 \u0645\u0647\u062a\u0645 \u0628\u0647\u0630\u0627 \u0627\u0644\u0639\u0642\u0627\u0631" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "property-message-error" : undefined} />
        {errors.message && <small id="property-message-error">{errors.message}</small>}
      </label>
      {formError && <p className="property-inquiry-error" role="alert">{formError}</p>}
      {success && <p className="property-inquiry-success" role="status"><CheckCircle2 size={18} /> تم إرسال استفسارك بنجاح.</p>}
      <button type="submit" disabled={loading}>
        {loading ? <LoaderCircle className="property-spinner" size={18} /> : <Send size={18} />}
        {loading ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
