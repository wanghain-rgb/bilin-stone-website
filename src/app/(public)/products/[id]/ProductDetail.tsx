"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/components/LangProvider";

type Product = {
  id: number;
  name: string;
  nameZh: string | null;
  description: string | null;
  descriptionZh: string | null;
  category: string | null;
  images: string | null;
  specs: string | null;
  specsZh: string | null;
};

export default function ProductDetail({ product }: { product: Product }) {
  const { lang, t } = useLang();

  const images: string[] = product.images ? JSON.parse(product.images) : [];
  const displayName = lang === "zh" && product.nameZh ? product.nameZh : product.name;
  const displayDesc =
    lang === "zh" && product.descriptionZh ? product.descriptionZh : product.description;

  let specs: Record<string, string> = {};
  try {
    const raw = lang === "zh" && product.specsZh ? product.specsZh : product.specs;
    if (raw) specs = JSON.parse(raw);
  } catch {}

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> {t.productDetail.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-gray-50 rounded-xl h-80 lg:h-[480px] relative flex items-center justify-center overflow-hidden">
          {images[0] ? (
            <Image
              src={images[0]}
              alt={displayName}
              fill
              className="object-contain p-6"
              priority
            />
          ) : (
            <span className="text-gray-300">No image</span>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">
              {displayName}
            </h1>
            {product.category && (
              <Badge variant="secondary">{product.category}</Badge>
            )}
          </div>

          {displayDesc && (
            <p className="mt-4 text-gray-600 leading-7">{displayDesc}</p>
          )}

          {Object.keys(specs).length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {t.productDetail.specs}
              </h3>
              <div className="border rounded-lg overflow-hidden">
                {Object.entries(specs).map(([key, val], i) => (
                  <div
                    key={key}
                    className={`flex text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <span className="w-2/5 px-4 py-2.5 text-gray-500 border-r font-medium">
                      {key}
                    </span>
                    <span className="flex-1 px-4 py-2.5 text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Link
              href={`/inquiry?product=${product.id}`}
              className={buttonVariants({
                size: "lg",
                className:
                  "flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold justify-center",
              })}
            >
              {t.productDetail.inquireNow}
            </Link>
            <Link
              href="/inquiry"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t.productDetail.bulkInquiry}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
