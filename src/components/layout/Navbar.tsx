"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLang } from "@/components/LangProvider";

const PRODUCT_CATEGORIES = [
  "Air Circulation Fan",
  "Traditional Fan",
  "Tower Fan",
  "Evaporative Air Cooler",
  "Carbon Fiber Heater",
  "Electrothermal Film Heater",
  "PTC Ceramic Heater",
];

// Renders a single category link with hover colour handled via React state
function CategoryLink({
  cat,
  onClick,
  mobile = false,
}: {
  cat: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/products?category=${encodeURIComponent(cat)}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        padding: mobile ? "6px 0" : "8px 20px",
        fontSize: mobile ? "13px" : "13px",
        fontWeight: 400,
        color: hovered ? "#C9922A" : "#1a1a2e",
        textDecoration: "none",
        transition: "color 0.15s",
      }}
    >
      {cat}
    </Link>
  );
}

export default function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const { t } = useLang();

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur"
      style={{ borderBottom: "1px solid #e5e7eb" }}
    >
      <div
        style={{
          padding: "0 40px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-jianhui-home.svg"
            alt="Jianhui Home"
            style={{ height: "52px", width: "auto" }}
          />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.nav.home}
          </Link>

          {/* Products + dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            {/* Trigger */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "14px",
                fontWeight: 500,
                color: dropdownOpen ? "#1a3a6b" : "#4b5563",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.15s",
              }}
            >
              {t.nav.products}
              <ChevronDown
                size={14}
                style={{
                  transition: "transform 0.2s",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Dropdown panel */}
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 14px)",
                left: "50%",
                width: "230px",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                padding: "6px 0",
                zIndex: 100,
                opacity: dropdownOpen ? 1 : 0,
                pointerEvents: dropdownOpen ? "auto" : "none",
                transform: dropdownOpen
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(-6px)",
                transition: "opacity 0.15s, transform 0.15s",
              }}
            >
              {/* Caret */}
              <div
                style={{
                  position: "absolute",
                  top: "-5px",
                  left: "50%",
                  marginLeft: "-5px",
                  width: "10px",
                  height: "10px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRight: "none",
                  borderBottom: "none",
                  transform: "rotate(45deg)",
                }}
              />

              {/* All Products */}
              <Link
                href="/products"
                style={{
                  display: "block",
                  padding: "8px 20px 10px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#6b7a99",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  borderBottom: "1px solid #f5f7fa",
                  marginBottom: "4px",
                }}
              >
                All Products
              </Link>

              {PRODUCT_CATEGORIES.map((cat) => (
                <CategoryLink key={cat} cat={cat} />
              ))}
            </div>
          </div>

          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.nav.about}
          </Link>

          <Link href="/inquiry" className={buttonVariants({ size: "sm" })}>
            {t.nav.cta}
          </Link>
        </nav>

        {/* ── Mobile: hamburger ── */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  onClick={() => setSheetOpen(false)}
                  className="text-base font-medium text-gray-700 hover:text-gray-900"
                >
                  {t.nav.home}
                </Link>

                {/* Products accordion */}
                <div>
                  <button
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#374151",
                      padding: 0,
                    }}
                  >
                    {t.nav.products}
                    <ChevronRight
                      size={16}
                      style={{
                        transition: "transform 0.2s",
                        transform: mobileProductsOpen
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </button>

                  {mobileProductsOpen && (
                    <div
                      style={{
                        marginTop: "8px",
                        paddingLeft: "12px",
                        borderLeft: "2px solid #f5f7fa",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link
                        href="/products"
                        onClick={() => setSheetOpen(false)}
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#6b7a99",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          textDecoration: "none",
                          padding: "6px 0 8px",
                          borderBottom: "1px solid #f5f7fa",
                          marginBottom: "4px",
                        }}
                      >
                        All Products
                      </Link>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <CategoryLink
                          key={cat}
                          cat={cat}
                          mobile
                          onClick={() => setSheetOpen(false)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  onClick={() => setSheetOpen(false)}
                  className="text-base font-medium text-gray-700 hover:text-gray-900"
                >
                  {t.nav.about}
                </Link>

                <Link
                  href="/inquiry"
                  onClick={() => setSheetOpen(false)}
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
