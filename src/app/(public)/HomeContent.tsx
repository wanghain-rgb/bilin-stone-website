"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Award, Zap, Settings2 } from "lucide-react";
import { useLang } from "@/components/LangProvider";

const HERO_IMAGES = ["/images/hero-1.png", "/images/hero-2.png"];
const INTERVAL_MS = 5000;

type Product = {
  id: number;
  name: string;
  nameZh: string | null;
  description: string | null;
  descriptionZh: string | null;
  category: string | null;
  images: string | null;
};

const featureIcons = [ShieldCheck, Award, Zap, Settings2];

export default function HomeContent({ products }: { products: Product[] }) {
  const { lang, t } = useLang();
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
        {/* Slides */}
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

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
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

        {/* Prev / Next arrows */}
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

        {/* Dot indicators */}
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
                  <h3 className="text-base font-semibold text-gray-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
                </div>
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
                {lang === "zh" ? "关于我们" : "About Us"}
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
                { num: "2016", label: lang === "zh" ? "成立年份" : "Founded" },
                { num: "42", label: lang === "zh" ? "条生产线" : "Production Lines" },
                { num: "50K+", label: lang === "zh" ? "日产能（台）" : "Units / Day" },
                { num: "4", label: lang === "zh" ? "全球运营中心" : "Global Offices" },
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

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t.home.featuredProducts}
              </h2>
              <Link
                href="/products"
                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                {t.home.viewAll} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => {
                const images = product.images ? JSON.parse(product.images) as string[] : [];
                const displayName = lang === "zh" && product.nameZh ? product.nameZh : product.name;
                const displayDesc = lang === "zh" && product.descriptionZh ? product.descriptionZh : product.description;
                return (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="bg-gray-100 h-48 relative flex items-center justify-center">
                      {images[0] ? (
                        <Image
                          src={images[0]}
                          alt={displayName}
                          fill
                          className="object-contain p-4"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No image
                        </span>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900">
                        {displayName}
                      </h3>
                      {product.category && (
                        <p className="text-xs text-gray-500 mt-1">
                          {product.category}
                        </p>
                      )}
                      {displayDesc && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {displayDesc}
                        </p>
                      )}
                      <div className="mt-4">
                        <Link
                          href={`/products/${product.id}`}
                          className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                          })}
                        >
                          {t.products.viewDetail}
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black">{t.home.ctaTitle}</h2>
          <p className="mt-4 text-black/70">{t.home.ctaSub}</p>
          <Link
            href="/inquiry"
            className={buttonVariants({
              size: "lg",
              className:
                "mt-6 bg-black text-white hover:bg-gray-800 inline-flex items-center gap-2",
            })}
          >
            {t.home.ctaBtn} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
