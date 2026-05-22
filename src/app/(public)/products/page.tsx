import { prisma } from "@/lib/prisma";
import ProductGrid from "./ProductGrid";

export const metadata = { title: "Products — BillinStone" };

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      nameZh: true,
      description: true,
      descriptionZh: true,
      category: true,
      images: true,
    },
  });

  return <ProductGrid products={products} />;
}
