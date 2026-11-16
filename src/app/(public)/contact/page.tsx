import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { PropertyMap } from "@/components/property/PropertyMap";
import { submitInquiry } from "@/server/actions/inquiries";
import { SITE_CONTACT } from "@/lib/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact Us | Maskan",
    description: "Get in touch with the Maskan real estate team in New Cairo.",
  };
}

export default function Page() {
  return (
    <div className="contact-page">
      <section className="contact-intro-band" aria-labelledby="contact-title">
        <Container className="contact-intro">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Contact Us</span>
          </nav>
          <h1 id="contact-title">We are here to help you find your dream home</h1>
          <p>A team of real estate experts ready to answer your inquiries around the clock. Contact us through the channels below or leave your message and we will get back to you promptly.</p>
        </Container>
      </section>

      <Container className="contact-layout">
        <section className="contact-form-card" aria-labelledby="contact-form-title">
          <span className="contact-card-accent" aria-hidden="true"/>
          <h2 id="contact-form-title">Send us a message</h2>
          <p className="contact-card-intro">Fill out the form below and one of our real estate agents will contact you within minutes.</p>
          <ContactForm action={submitInquiry}/>
        </section>

        <div className="contact-side-column">
          <section className="contact-info-card" aria-labelledby="contact-info-title">
            <span className="contact-info-decoration" aria-hidden="true"/>
            <h2 id="contact-info-title">Contact Information</h2>
            <ul className="contact-info-list">
              <li className="contact-info-item">
                <span className="contact-info-icon"><PhoneCall size={22} aria-hidden="true"/></span>
                <div><h3>Call Us Directly</h3><a className="contact-info-value" href={SITE_CONTACT.phone.href} dir="ltr">{SITE_CONTACT.phone.display}</a></div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon contact-whatsapp-icon"><MessageCircle size={22} aria-hidden="true"/></span>
                <div><h3>WhatsApp Chat</h3><a className="contact-info-value" href={SITE_CONTACT.whatsapp.href} target="_blank" rel="noreferrer" dir="ltr">{SITE_CONTACT.whatsapp.display}</a></div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon"><Mail size={22} aria-hidden="true"/></span>
                <div><h3>Email Address</h3><a className="contact-info-value" href={SITE_CONTACT.email.href}>{SITE_CONTACT.email.display}</a></div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon"><MapPin size={22} aria-hidden="true"/></span>
                <div><h3>Main Address</h3><address className="contact-info-value">{SITE_CONTACT.address}</address></div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon"><Clock3 size={22} aria-hidden="true"/></span>
                <div><h3>Working Hours</h3><p className="contact-info-value">{SITE_CONTACT.hours.map((hours) => <span key={hours}>{hours}</span>)}</p></div>
              </li>
            </ul>
          </section>

          <section className="contact-map-card" aria-labelledby="contact-map-title">
            <h2 id="contact-map-title">Our Location on Map</h2>
            <PropertyMap latitude={SITE_CONTACT.location.latitude} longitude={SITE_CONTACT.location.longitude} label={SITE_CONTACT.location.label}/>
          </section>
        </div>
      </Container>
    </div>
  );
}
