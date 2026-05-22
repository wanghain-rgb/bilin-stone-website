import { prisma } from "@/lib/prisma";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    take: 6,
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

  return <HomeContent products={products} />;
}
