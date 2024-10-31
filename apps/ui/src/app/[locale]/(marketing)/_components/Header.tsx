"use client";

import Link from "next/link";
import { Container } from "@/components/elementary/Container";
import { Logo } from "@/components/elementary/Logo";
import LocaleSwitcher from "@/components/elementary/LocaleSwitcher";
import DesktopMenu from "@/components/elementary/DesktopMenu";
import MobileMenu from "@/components/elementary/MobileMenu";
import { usePathname } from "@/lib/navigation";
import { cn } from "@/lib/styles";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="from-background absolute top-0 z-30 h-64 w-full bg-gradient-to-b to-transparent">
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
