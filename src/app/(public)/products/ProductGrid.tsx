"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useLang } from "@/components/LangProvider";

type Product = {
  id: number;
  name: string;
  nameZh: string | null;
  description: string | null;
  descriptionZh: string | null;
  category: string | null;
  images: string | null;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const { lang, t } = useLang();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.products.title}</h1>
        <p className="mt-2 text-gray-500">{t.products.subtitle}</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-lg">{t.products.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const images = product.images ? (JSON.parse(product.images) as string[]) : [];
            const displayName = lang === "zh" && product.nameZh ? product.nameZh : product.name;
            const displayDesc =
              lang === "zh" && product.descriptionZh
                ? product.descriptionZh
                : product.description;

            return (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="bg-gray-50 h-52 relative flex items-center justify-center">
                  {images[0] ? (
                    <Image
                      src={images[0]}
                      alt={displayName}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <span className="text-gray-300 text-sm">No image</span>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {displayName}
                    </h3>
                    {product.category && (
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {product.category}
                      </Badge>
                    )}
                  </div>
                  {displayDesc && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {displayDesc}
                    </p>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      {t.products.viewDetail}
                    </Link>
                    <Link
                      href={`/inquiry?product=${product.id}`}
                      className={buttonVariants({
                        size: "sm",
                        className: "bg-amber-500 hover:bg-amber-600 text-black",
                      })}
                    >
                      {t.products.requestQuote}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
