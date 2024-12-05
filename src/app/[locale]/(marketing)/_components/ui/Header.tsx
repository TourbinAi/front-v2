"use client";

import Link from "next/link";

import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import DesktopMenu from "@/components/share/DesktopMenu";
import LocaleSwitcher from "@/components/share/LocalSwitcher";
import { Logo } from "@/components/share/Logo";
import MobileMenu from "@/components/share/MobileMenu";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="z-60 absolute top-0 h-64 w-full bg-gradient-to-b from-background to-transparent">
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link
              href="/"
              aria-label="Home"
              className={cn(pathname === "/" ? "hidden" : "block")}
            >
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
