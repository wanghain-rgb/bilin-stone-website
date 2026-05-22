"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLang } from "@/components/LangProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, t, setLang } = useLang();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/products", label: t.nav.products },
    { href: "/about", label: t.nav.about },
    { href: "/inquiry", label: t.nav.inquiry },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur" style={{ borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ padding: '0 40px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dark.png"
              alt="Bilin Stone"
              style={{ height: '160px', width: 'auto' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-md px-2.5 py-1 transition-colors"
              title="Switch language"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>

            <Link href="/inquiry" className={buttonVariants({ size: "sm" })}>
              {t.nav.cta}
            </Link>
          </nav>

          {/* Mobile: lang toggle + sheet */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="text-xs font-medium text-gray-500 border border-gray-200 rounded px-2 py-1"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-gray-700 hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/inquiry"
                    onClick={() => setOpen(false)}
                    className={buttonVariants({ size: "sm", className: "w-fit" })}
                  >
                    {t.nav.cta}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </header>
  );
}
