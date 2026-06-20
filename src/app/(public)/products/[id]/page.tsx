import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetail from "./ProductDetail";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) return { title: "Product Detail" };

  const product = await prisma.product.findUnique({ where: { id: productId } });
  return {
    title: product ? product.name : "Product Detail",
    description: product?.description ?? undefined,
    alternates: {
      canonical: `/products/${id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();

  const product = await prisma.product.findUnique({
    where: { id: productId, isActive: true },
  });

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
