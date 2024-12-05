"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/share/Logo";
import LocaleSwitcher from "@/components/share/LocalSwitcher";
import DesktopMenu from "@/components/share/DesktopMenu";
import MobileMenu from "@/components/share/MobileMenu";

export function Header() {
  const t = useTranslations("header");
  return (
    <header className="h-16 min-h-16 w-full border-b-2">
      <nav className="h-full">
        <Container className="relative z-50 flex h-full items-center justify-between">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <DesktopMenu />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <LocaleSwitcher className="border-none bg-transparent" />
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
