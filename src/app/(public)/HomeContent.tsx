"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Award, Zap, Settings2 } from "lucide-react";
import { useLang } from "@/components/LangProvider";

const HERO_IMAGES = ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png"];
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

const featureIcons = [ShieldCheck, Award, Zap, Settings2];

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
        style={{ minHeight: "520px" }}
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
              className="object-cover"
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
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-amber-500 hover:bg-amber-600 text-black font-semibold",
                })}
              >
                {t.home.browseProducts}
              </Link>
              <Link
                href="/inquiry"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "text-white border-white/40 hover:bg-white/10",
                })}
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

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
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
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">
            {t.home.whyUs}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.home.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
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

      {/* Company Intro */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
                About Us
              </p>
              <h2 className="text-3xl font-bold mb-6">{t.home.aboutTitle}</h2>
              <p className="text-gray-300 leading-8 text-lg">{t.home.aboutSub}</p>
              <Link
                href="/about"
                className={buttonVariants({
                  size: "lg",
                  className: "mt-8 bg-amber-500 hover:bg-amber-600 text-black font-semibold inline-flex items-center gap-2",
                })}
              >
                {t.home.aboutBtn} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "2016", label: "Founded" },
                { num: "42", label: "Production Lines" },
                { num: "50K+", label: "Units / Day" },
                { num: "4", label: "Global Offices" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-6 text-center">
                  <div className="text-3xl font-bold text-amber-400">{stat.num}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black">{t.home.ctaTitle}</h2>
          <p className="mt-4 text-black/70">{t.home.ctaSub}</p>
          <Link
            href="/inquiry"
            className={buttonVariants({
              size: "lg",
              className: "mt-6 bg-black text-white hover:bg-gray-800 inline-flex items-center gap-2",
            })}
          >
            {t.home.ctaBtn} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
