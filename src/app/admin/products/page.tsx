export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ProductsManager from "./ProductsManager";

export const metadata = { title: "商品管理 - Bilin Stone 管理后台" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
      <ProductsManager products={products} />
    </div>
  );
}
