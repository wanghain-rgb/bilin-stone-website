export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import InquiryForm from "./InquiryForm";

export const metadata = {
  title: "Inquiry",
  description:
    "Send Jianhui Home a product inquiry for air circulation, cooling, and heating appliance sourcing.",
  alternates: {
    canonical: "/inquiry",
  },
};

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { id: true, name: true, nameZh: true, category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <InquiryForm products={products} defaultProductId={product} />
    </div>
  );
}
