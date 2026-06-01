import { prisma } from "@/lib/prisma";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const counts = await prisma.product.groupBy({
    by: ["category"],
    where: { isActive: true },
    _count: { id: true },
  });
  const categoryCountMap: Record<string, number> = Object.fromEntries(
    counts.map((c) => [c.category ?? "", c._count.id])
  );
  return <HomeContent categoryCountMap={categoryCountMap} />;
}
