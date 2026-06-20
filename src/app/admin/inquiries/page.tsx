export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import InquiryTable from "./InquiryTable";

export const metadata = { title: "询价记录" };

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">询价记录</h1>
      <InquiryTable inquiries={inquiries} />
    </div>
  );
}
