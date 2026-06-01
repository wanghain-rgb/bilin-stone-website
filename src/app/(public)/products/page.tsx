export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ProductGrid from "./ProductGrid";

export const metadata = { title: "Products — Bilin Stone" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      images: true,
      specs: true,
    },
  });

  return <ProductGrid products={products} initialCategory={category} />;
}
