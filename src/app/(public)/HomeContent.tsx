"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Wrench, BadgeCheck, Globe, Layers } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { CERTIFICATIONS } from "@/lib/constants";

const HERO_IMAGES = ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png", "/images/hero-4.png"];
const INTERVAL_MS = 5000;

// dbKey maps to the category value stored in the database for product counting
const CATEGORIES = [
  {
    name: "Air Circulation Fan",
    slug: "Air Circulation Fan",
    dbKey: "Air Circulator",
    desc: "Energy-efficient airflow for modern living",
    image: "/products/air-circulator/FX-L35R/main.png",
  },
  {
    name: "Traditional Fan",
    slug: "Traditional Fan",
    dbKey: "Traditional Fan",
    desc: "Classic cooling for everyday comfort",
    image: "/products/air-circulator/FX-L33R/main.png",
  },
  {
    name: "Tower Fan",
    slug: "Tower Fan",
    dbKey: "Tower Fan",
    desc: "Slim design, powerful airflow",
    image: "/products/air-circulator/FX-L55R/main.png",
  },
  {
    name: "Evaporative Air Cooler",
    slug: "Evaporative Air Cooler",
    dbKey: "Cool Fan",
    desc: "Natural cooling with water evaporation",
    image: "/products/cool-fan/CF-01R/main.png",
  },
  {
    name: "Carbon Fiber Heater",
    slug: "Carbon Fiber Heater",
    dbKey: "Carbon Fiber Heater",
    desc: "Fast heating with infrared technology",
    image: "/products/heater/QN2601R/main.png",
  },
  {
    name: "Electrothermal Film Heater",
    slug: "Electrothermal Film Heater",
    dbKey: "Electrothermal Film Heater",
    desc: "Ultra-thin, wall-mounted warmth",
    image: "/products/heater/QN236R/main.png",
  },
  {
    name: "PTC Ceramic Heater",
    slug: "PTC Ceramic Heater",
    dbKey: "Heater",
    desc: "Safe, efficient ceramic heating",
    image: "/products/heater/QN816R/main.png",
  },
];

const WHY_CARDS = [
  {
    Icon: Wrench,
    title: "OEM/ODM Capability",
    desc: "From motor design to complete product customization",
  },
  {
    Icon: BadgeCheck,
    title: "Quality Certified",
    desc: "CE, CB, GS, UL, RoHS, REACH certified products",
  },
  {
    Icon: Globe,
    title: "Global Logistics",
    desc: "Efficient delivery to Australia, US and worldwide",
  },
  {
    Icon: Layers,
    title: "End-to-End Solutions",
    desc: "From R&D and manufacturing to global distribution",
  },
];

// ─── Stats section ────────────────────────────────────────────────────────────

type StatDatum = {
  big: string;
  label: string;
  prefix?: string;
  suffix?: string;
  from?: number;
  to?: number;
};

const STATS_DATA: StatDatum[] = [
  { big: "2016", prefix: "Since ", label: "Years of Experience", from: 2010, to: 2016 },
  { big: "25+",  label: "Product Models",       from: 0, to: 25, suffix: "+" },
  { big: "China",  label: "Manufacturing Base" },
  { big: "Global", label: "Sales & Service Network" },
];

function useCountUp(from: number, to: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!active) return;
    let frameId: number;
    const start = performance.now();
    const range = to - from;
    function step(now: number) {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setValue(Math.round(from + eased * range));
      if (p < 1) frameId = requestAnimationFrame(step);
    }
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active, from, to, duration]);
  return value;
}

function StatItem({ stat, active }: { stat: StatDatum; active: boolean }) {
  const isNumeric = stat.to != null;
  const count = useCountUp(stat.from ?? 0, stat.to ?? 0, active && isNumeric);
  const display = isNumeric
    ? `${stat.prefix ?? ""}${count}${stat.suffix ?? ""}`
    : stat.big;
  return (
    <div style={{ textAlign: "center", padding: "40px 24px" }}>
      <div
        style={{
          fontSize: "48px",
          fontWeight: 700,
          color: "#C9922A",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontSize: "14px",
          color: "#6b7a99",
          marginTop: "12px",
          lineHeight: 1.5,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#1a3a6b" }}>
      <div className="mx-auto max-w-7xl" style={{ padding: "0 40px" }}>
        {/* Grid: 2 cols on mobile/tablet, 4 cols on desktop */}
        {/* gap:1px + background on container = thin divider lines between cells */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "1px", background: "rgba(255,255,255,0.12)" }}
        >
          {STATS_DATA.map((stat) => (
            <div key={stat.label} style={{ background: "#1a3a6b" }}>
              <StatItem stat={stat} active={active} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeContent({
  categoryCountMap,
}: {
  categoryCountMap: Record<string, number>;
}) {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + HERO_IMAGES.length) % HERO_IMAGES.length), []);
  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % HERO_IMAGES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const heroLines = t.home.heroTitle.split("\n");

  return (
    <div>
      {/* Hero Carousel */}
      <section
        className="relative bg-gray-900 text-white overflow-hidden"
        style={{
          /* Exact 16:9 to match 1672×941 images — no cropping */
          height: "calc(100vw * 941 / 1672)",
          minHeight: "580px",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`Hero ${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover object-center"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
              {t.home.heroHighlight}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              {heroLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < heroLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-8 max-w-xl">
              {t.home.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap items-center" style={{ gap: "16px" }}>
              <Link
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "52px",
                  padding: "0 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#ffffff",
                  background: "#C9922A",
                  borderRadius: "8px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#b07e22"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#C9922A"; }}
              >
                {t.home.browseProducts}
              </Link>
              <Link
                href="/inquiry"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "52px",
                  padding: "0 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#ffffff",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s, color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#ffffff";
                  el.style.color = "#1a3a6b";
                  el.style.borderColor = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.color = "#ffffff";
                  el.style.borderColor = "rgba(255,255,255,0.7)";
                }}
              >
                {t.home.requestQuote}
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/55 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/55 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide dots — moved up to leave room for scroll arrow */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-amber-400" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() =>
            window.scrollBy({
              top: (window.innerWidth * 941) / 1672,
              behavior: "smooth",
            })
          }
          className="absolute animate-bounce"
          style={{
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.55)",
            padding: "4px",
            lineHeight: 0,
          }}
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product Categories</h2>
              <p className="text-gray-500 text-sm mt-1">Explore our full range of climate solutions</p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => {
              const count = categoryCountMap[cat.dbKey] ?? 0;
              return (
                <Link
                  key={cat.slug}
                  href={`/products?category=${encodeURIComponent(cat.slug)}`}
                  className="group block"
                >
                  <div
                    className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Image area */}
                    <div
                      className="relative overflow-hidden bg-gray-50"
                      style={{ height: "200px" }}
                    >
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span
                          className="text-white text-sm font-semibold rounded-lg"
                          style={{ border: "1px solid white", padding: "8px 20px" }}
                        >
                          View Products
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: "16px 20px" }}>
                      <h3
                        className="font-semibold text-gray-900"
                        style={{ fontSize: "14px" }}
                      >
                        {cat.name}
                      </h3>
                      <p
                        className="text-gray-500 mt-1"
                        style={{ fontSize: "12px", lineHeight: "1.5" }}
                      >
                        {cat.desc}
                      </p>
                      <p
                        className="font-medium mt-3"
                        style={{ fontSize: "12px", color: "#C9922A" }}
                      >
                        {count} {count === 1 ? "Product" : "Products"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Why Choose Us */}
      <section style={{ background: "#f5f7fa", padding: "80px 0" }}>
        <div className="mx-auto max-w-7xl" style={{ padding: "0 40px" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: "12px",
              }}
            >
              Why Choose Jianhui Home
            </h2>
            <p style={{ fontSize: "15px", color: "#6b7a99", maxWidth: "480px", margin: "0 auto" }}>
              Trusted by buyers across 30+ countries for reliable climate solutions
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
            {WHY_CARDS.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "32px 28px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.06)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background: "rgba(201,146,42,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Icon size={26} style={{ color: "#C9922A" }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1a3a6b",
                    marginBottom: "10px",
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7a99",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-16" style={{ background: "#f5f7fa" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#C9922A" }}
              >
                About Us
              </p>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "#1a3a6b" }}
              >
                {t.home.aboutTitle}
              </h2>
              <p
                className="leading-8 text-lg"
                style={{ color: "#4a5568" }}
              >
                {t.home.aboutSub}
              </p>
              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "32px",
                  background: "#1a3a6b",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "15px",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#142d54"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#1a3a6b"; }}
              >
                {t.home.aboutBtn} <ArrowRight size={16} />
              </Link>
            </div>
            <div>
              <div
                className="flex flex-wrap"
                style={{ gap: "16px", justifyContent: "flex-start" }}
              >
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="transition-transform duration-200 hover:scale-105"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={72}
                      height={56}
                      style={{ height: "36px", width: "auto", objectFit: "contain" }}
                    />
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#6b7a99",
                  marginTop: "20px",
                  lineHeight: 1.5,
                }}
              >
                All major safety & environmental certifications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ background: "#1a3a6b", padding: "80px 0" }}>
        <div
          className="mx-auto max-w-7xl"
          style={{ padding: "0 40px", textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Start Your Inquiry
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.70)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto 52px",
            }}
          >
            Contact us for OEM/ODM cooperation and product inquiries
          </p>

          {/* Business contacts */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: "48px", marginBottom: "48px" }}
          >
            {[
              { name: "Tony Luo",     email: "tony.luo@jianhuihome.com" },
            ].map(({ name, email }) => (
              <div key={name}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "8px",
                  }}
                >
                  {name}
                </p>
                <a
                  href={`mailto:${email}`}
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#C9922A",
                    textDecoration: "none",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                >
                  {email}
                </a>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <Link
            href="/inquiry"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#C9922A",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "15px",
              padding: "14px 36px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#b07e22"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#C9922A"; }}
          >
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
