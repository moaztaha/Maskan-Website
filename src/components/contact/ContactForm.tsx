"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Mail, Phone, Send, Tag, User } from "lucide-react";
import { inquirySchema } from "@/lib/validations/inquiry.schema";
import type { InquirySubmissionResult } from "@/types/inquiry";

type ContactField = "name" | "phone" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<ContactField, string>>;

export function ContactForm({ action }: {
  action: (formData: FormData) => Promise<InquirySubmissionResult>;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setFormError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      propertyId: "",
    };
    const validation = inquirySchema.safeParse(values);

    if (!validation.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as ContactField | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    formData.set("propertyId", "");
    setIsSubmitting(true);
    try {
      const result = await action(formData);
      if (result.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setFormError(result.error);
      }
    } catch {
      setFormError("We could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form contact-page-form" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="propertyId" value="" readOnly />
      <div className="contact-form-grid">
        <label className="contact-control" htmlFor="contact-name">
          <span>Full Name <b aria-hidden="true">*</b></span>
          <span className="contact-input-wrap"><User size={19} aria-hidden="true"/><input id="contact-name" name="name" autoComplete="name" placeholder="John Doe" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined}/></span>
          {errors.name ? <small className="contact-field-error" id="contact-name-error">{errors.name}</small> : null}
        </label>
        <label className="contact-control" htmlFor="contact-phone">
          <span>Phone Number <b aria-hidden="true">*</b></span>
          <span className="contact-input-wrap"><Phone size={19} aria-hidden="true"/><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+201012345678" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined}/></span>
          {errors.phone ? <small className="contact-field-error" id="contact-phone-error">{errors.phone}</small> : null}
        </label>
        <label className="contact-control" htmlFor="contact-email">
          <span>Email Address <small>(optional)</small></span>
          <span className="contact-input-wrap"><Mail size={19} aria-hidden="true"/><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined}/></span>
          {errors.email ? <small className="contact-field-error" id="contact-email-error">{errors.email}</small> : null}
        </label>
        <label className="contact-control" htmlFor="contact-subject">
          <span>Subject <b aria-hidden="true">*</b></span>
          <span className="contact-input-wrap"><Tag size={19} aria-hidden="true"/><select id="contact-subject" name="subject" defaultValue="buy" required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined}>
            <option value="buy">Buy a Property</option>
            <option value="rent">Rent a Property</option>
            <option value="list">List Your Property</option>
            <option value="other">General Inquiry</option>
          </select></span>
          {errors.subject ? <small className="contact-field-error" id="contact-subject-error">{errors.subject}</small> : null}
        </label>
      </div>
      <label className="contact-control contact-message-control" htmlFor="contact-message">
        <span>Message <b aria-hidden="true">*</b></span>
        <textarea id="contact-message" name="message" rows={5} placeholder="Type your request details here..." required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined}/>
        {errors.message ? <small className="contact-field-error" id="contact-message-error">{errors.message}</small> : null}
      </label>
      {formError ? <p className="contact-form-error" role="alert">{formError}</p> : null}
      {submitted ? <p className="contact-success" role="status"><CheckCircle2 size={20} aria-hidden="true"/>Your message has been sent successfully. One of our agents will contact you soon.</p> : null}
      <button className="contact-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle size={19} className="contact-spinner" aria-hidden="true"/> : <Send size={19} aria-hidden="true"/>}
        {isSubmitting ? "Sending message…" : "Send Message"}
      </button>
      <span className="visually-hidden" aria-live="polite">{isSubmitting ? "Sending your message" : ""}</span>
    </form>
  );
}
