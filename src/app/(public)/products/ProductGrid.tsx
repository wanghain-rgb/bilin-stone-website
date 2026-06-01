"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// ─── Types ───────────────────────────────────────────────────────────────────

type Product = {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  images: string | null;
  specs: string | null;
};

type Filters = {
  categories: string[];
  powers: string[];
  controls: string[];
};

// ─── Filter config ────────────────────────────────────────────────────────────

// dbKeys: values that may appear in Product.category for this display label
const CATEGORY_OPTIONS = [
  { label: "Air Circulation Fan",      dbKeys: ["Air Circulator", "Air Circulation Fan"] },
  { label: "Traditional Fan",          dbKeys: ["Traditional Fan"] },
  { label: "Tower Fan",                dbKeys: ["Tower Fan"] },
  { label: "Evaporative Air Cooler",   dbKeys: ["Cool Fan", "Evaporative Air Cooler"] },
  { label: "Carbon Fiber Heater",      dbKeys: ["Carbon Fiber Heater"] },
  { label: "Electrothermal Film Heater", dbKeys: ["Electrothermal Film Heater"] },
  { label: "PTC Ceramic Heater",       dbKeys: ["Heater", "PTC Ceramic Heater"] },
];

const POWER_OPTIONS = [
  { label: "< 30W",   test: (w: number) => w < 30 },
  { label: "30–50W",  test: (w: number) => w >= 30 && w <= 50 },
  { label: "> 50W",   test: (w: number) => w > 50 },
];

const CONTROL_OPTIONS = ["Remote", "Mechanical", "APP"];

// ─── Spec helpers ─────────────────────────────────────────────────────────────

function parsePower(specs: string | null): number | null {
  if (!specs) return null;
  try {
    const raw: string = JSON.parse(specs)["Rated Power"] ?? "";
    const n = parseFloat(raw.split("/")[0].replace(/[^\d.]/g, ""));
    return isNaN(n) ? null : n;
  } catch {
    return null;
  }
}

function parseControl(specs: string | null): string {
  if (!specs) return "";
  try {
    return JSON.parse(specs)["Control"] ?? "";
  } catch {
    return "";
  }
}

// Map a raw URL category param → CATEGORY_OPTIONS label (handles both display
// names like "Air Circulation Fan" and legacy DB names like "Air Circulator")
function resolveCategory(raw: string | undefined): string | null {
  if (!raw) return null;
  return (
    CATEGORY_OPTIONS.find(
      (c) => c.label === raw || c.dbKeys.includes(raw)
    )?.label ?? null
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        fontSize: "13px",
        color: checked ? "#1a3a6b" : "#4b5563",
        fontWeight: checked ? 500 : 400,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: "14px", height: "14px", accentColor: "#1a3a6b", cursor: "pointer", flexShrink: 0 }}
      />
      {label}
    </label>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{
        fontSize: "11px", fontWeight: 600, color: "#6b7a99",
        textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px",
      }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {children}
      </div>
    </div>
  );
}

function FilterPanel({
  filters,
  setFilters,
  total,
  filtered,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  total: number;
  filtered: number;
}) {
  const activeCount = filters.categories.length + filters.powers.length + filters.controls.length;

  function toggle(key: keyof Filters, value: string) {
    const current = filters[key];
    setFilters({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  }

  return (
    <div>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}>Filters</span>
        {activeCount > 0 && (
          <button
            onClick={() => setFilters({ categories: [], powers: [], controls: [] })}
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              fontSize: "12px", color: "#C9922A", background: "none",
              border: "none", cursor: "pointer", padding: 0,
            }}
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Result count */}
      <div style={{
        fontSize: "12px", color: "#6b7a99", marginBottom: "24px",
        padding: "8px 12px", background: "#f5f7fa", borderRadius: "6px",
      }}>
        Showing <strong style={{ color: "#1a1a2e" }}>{filtered}</strong> of{" "}
        <strong style={{ color: "#1a1a2e" }}>{total}</strong> products
      </div>

      <FilterSection title="Category">
        {CATEGORY_OPTIONS.map((cat) => (
          <CheckItem
            key={cat.label}
            label={cat.label}
            checked={filters.categories.includes(cat.label)}
            onChange={() => toggle("categories", cat.label)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Rated Power">
        {POWER_OPTIONS.map((p) => (
          <CheckItem
            key={p.label}
            label={p.label}
            checked={filters.powers.includes(p.label)}
            onChange={() => toggle("powers", p.label)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Control Type">
        {CONTROL_OPTIONS.map((c) => (
          <CheckItem
            key={c}
            label={c}
            checked={filters.controls.includes(c)}
            onChange={() => toggle("controls", c)}
          />
        ))}
      </FilterSection>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProductGrid({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(() => ({
    categories: resolveCategory(initialCategory)
      ? [resolveCategory(initialCategory)!]
      : [],
    powers: [],
    controls: [],
  }));

  const filtered = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (filters.categories.length > 0) {
        const dbKeys = CATEGORY_OPTIONS
          .filter((c) => filters.categories.includes(c.label))
          .flatMap((c) => c.dbKeys);
        if (!dbKeys.includes(product.category ?? "")) return false;
      }

      // Power filter
      if (filters.powers.length > 0) {
        const watts = parsePower(product.specs);
        if (watts === null) return false;
        const match = POWER_OPTIONS
          .filter((p) => filters.powers.includes(p.label))
          .some((p) => p.test(watts));
        if (!match) return false;
      }

      // Control filter
      if (filters.controls.length > 0) {
        const control = parseControl(product.specs);
        const match = filters.controls.some((c) => control.includes(c));
        if (!match) return false;
      }

      return true;
    });
  }, [products, filters]);

  const panelProps = { filters, setFilters, total: products.length, filtered: filtered.length };
  const activeCount = filters.categories.length + filters.powers.length + filters.controls.length;

  return (
    <div className="mx-auto max-w-7xl" style={{ padding: "48px 40px" }}>
      {/* Page header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>
          Our Products
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7a99" }}>
          Premium climate solutions for global buyers
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

        {/* ── Desktop sidebar ── */}
        <aside
          className="hidden lg:block shrink-0"
          style={{
            width: "280px",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            padding: "24px",
            position: "sticky",
            top: "90px",
          }}
        >
          <FilterPanel {...panelProps} />
        </aside>

        {/* ── Right column ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Mobile filter trigger */}
          <div className="lg:hidden" style={{ marginBottom: "16px" }}>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <button
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      fontSize: "14px", fontWeight: 500, color: "#1a3a6b",
                      border: "1px solid #1a3a6b", borderRadius: "8px",
                      padding: "8px 16px", background: "white", cursor: "pointer",
                    }}
                  />
                }
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeCount > 0 && (
                  <span style={{
                    background: "#1a3a6b", color: "white", borderRadius: "50%",
                    width: "18px", height: "18px", fontSize: "11px",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {activeCount}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                <div style={{ padding: "24px" }}>
                  <FilterPanel {...panelProps} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#6b7a99" }}>
              <p style={{ fontSize: "16px" }}>No products match your filters.</p>
              <button
                onClick={() => setFilters({ categories: [], powers: [], controls: [] })}
                style={{
                  marginTop: "16px", fontSize: "14px", color: "#1a3a6b",
                  background: "none", border: "none", cursor: "pointer", textDecoration: "underline",
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
              {filtered.map((product) => {
                const images = product.images ? (JSON.parse(product.images) as string[]) : [];
                return (
                  <div
                    key={product.id}
                    className="group"
                    style={{
                      background: "#fff",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    {/* Product image */}
                    <div style={{ height: "200px", background: "#f5f7fa", position: "relative" }}>
                      {images[0] ? (
                        <Image
                          src={images[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div style={{
                          height: "100%", display: "flex", alignItems: "center",
                          justifyContent: "center", color: "#d1d5db", fontSize: "13px",
                        }}>
                          No image
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div style={{ padding: "16px 20px 20px" }}>
                      {product.category && (
                        <p style={{
                          fontSize: "11px", fontWeight: 500, color: "#6b7a99",
                          textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px",
                        }}>
                          {product.category}
                        </p>
                      )}
                      <h3
                        className="group-hover:text-amber-600 transition-colors"
                        style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", lineHeight: "1.4" }}
                      >
                        {product.name}
                      </h3>
                      {product.description && (
                        <p style={{
                          fontSize: "12px", color: "#6b7a99", marginTop: "6px",
                          lineHeight: "1.6", overflow: "hidden",
                          display: "-webkit-box", WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}>
                          {product.description}
                        </p>
                      )}
                      <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                        <Link
                          href={`/products/${product.id}`}
                          style={{
                            fontSize: "13px", fontWeight: 500, color: "#1a3a6b",
                            border: "1px solid #1a3a6b", borderRadius: "8px",
                            padding: "6px 14px", textDecoration: "none",
                            display: "inline-flex", alignItems: "center",
                          }}
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/inquiry?product=${product.id}`}
                          style={{
                            fontSize: "13px", fontWeight: 500, color: "#fff",
                            background: "#C9922A", borderRadius: "8px",
                            padding: "6px 14px", textDecoration: "none",
                            display: "inline-flex", alignItems: "center",
                          }}
                        >
                          Request Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
