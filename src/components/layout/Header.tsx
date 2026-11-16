import Link from "next/link";
import { CircleUserRound, House, MessageCircle } from "lucide-react";
import { NAVIGATION } from "@/lib/constants/navigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/layout/Container";

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <div className="header-brand-nav">
          <Link className="brand" href="/" aria-label="Maskan home">
            <span className="brand-mark"><House aria-hidden="true" size={25} /></span>
            <span>Maskan</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {NAVIGATION.map((item, index) => (
              <Link
                key={item.href}
                className={index === 0 ? "nav-link nav-link-active" : "nav-link"}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="header-actions">
          <Link className="account-link" href="/admin/login" aria-label="Account">
            <CircleUserRound size={21} aria-hidden="true" />
          </Link>
          <a className="whatsapp-link" href="https://wa.me/" target="_blank" rel="noreferrer">
            <MessageCircle size={17} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
