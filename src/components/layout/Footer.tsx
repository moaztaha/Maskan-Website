import Link from "next/link";
import { House, Mail, MapPin, Phone } from "lucide-react";
import { FOOTER_NAVIGATION } from "@/lib/constants/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <Link className="footer-brand" href="/">
            <House size={23} aria-hidden="true" />
            <span>Maskan</span>
          </Link>
          <p>
            A simpler way to find a home in Egypt. Explore verified properties
            with clear details and helpful local guidance.
          </p>
        </div>
        {FOOTER_NAVIGATION.map((group) => (
          <div className="footer-column" key={group.heading}>
            <h2>{group.heading}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer-column footer-contact">
          <h2>Contact Us</h2>
          <a href="tel:+201000000000"><Phone size={16} aria-hidden="true" /><span dir="ltr">+20 100 000 0000</span></a>
          <a href="mailto:hello@maskan.eg"><Mail size={16} aria-hidden="true" />hello@maskan.eg</a>
          <p><MapPin size={16} aria-hidden="true" />New Cairo, Cairo, Egypt</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Maskan. All rights reserved.</span>
        <span>Find your next place with confidence.</span>
      </div>
    </footer>
  );
}
