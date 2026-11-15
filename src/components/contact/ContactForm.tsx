"use client";

import { useState, type FormEvent } from "react";
import { inquirySchema } from "@/lib/validations/inquiry.schema";
import type { InquirySubmissionResult } from "@/types/inquiry";

export function ContactForm({
  action,
}: {
  action: (formData: FormData) => Promise<InquirySubmissionResult>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function validateBeforeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      propertyId: String(formData.get("propertyId") ?? ""),
    };
    const result = inquirySchema.safeParse(values);
    if (!result.success) {
      setSubmitted(false);
      setError(result.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setError(null);
    const submission = await action(formData);
    setSubmitted(submission.ok);
    setError(submission.ok ? null : submission.error);
  }

  return (
    <form onSubmit={validateBeforeSubmit} className="contact-form">
      <label className="field">
        <span>Name</span>
        <input name="name" autoComplete="name" required minLength={2} />
      </label>
      <label className="field">
        <span>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" required minLength={7} />
      </label>
      <label className="field">
        <span>Email <small>(optional)</small></span>
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} required minLength={10} />
      </label>
      {error ? <p className="form-feedback form-feedback-error" role="alert">{error}</p> : null}
      {submitted ? <p className="form-feedback" role="status">Thanks. Your inquiry is ready to send.</p> : null}
      <button className="button button-primary" type="submit">Send inquiry</button>
    </form>
  );
}
