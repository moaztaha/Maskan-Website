import { Suspense } from "react";
import Link from "next/link";
import { CircleUserRound, House, MessageCircle } from "lucide-react";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { MainNavigation } from "@/components/layout/MainNavigation";
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
          <Suspense fallback={<nav className="desktop-nav" aria-label="Main navigation" />}>
            <MainNavigation />
          </Suspense>
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
          <Suspense fallback={null}><MobileNavigation /></Suspense>
        </div>
      </Container>
    </header>
  );
}
