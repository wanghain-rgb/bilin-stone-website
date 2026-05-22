import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Package, MessageSquare, Clock, CheckCircle } from "lucide-react";

export const metadata = { title: "管理后台 - BillinStone" };

export default async function AdminDashboard() {
  const [productCount, inquiryCount, pendingCount, contactedCount] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "pending" } }),
    prisma.inquiry.count({ where: { status: "contacted" } }),
  ]);

  type InquiryWithItems = Awaited<ReturnType<typeof prisma.inquiry.findMany>>[number] & {
    items: Array<{ product: { name: string } }>;
  };
  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  }) as InquiryWithItems[];

  const stats = [
    { label: "在售商品", value: productCount, icon: Package, color: "text-blue-600 bg-blue-50" },
    { label: "询价总数", value: inquiryCount, icon: MessageSquare, color: "text-purple-600 bg-purple-50" },
    { label: "待处理", value: pendingCount, icon: Clock, color: "text-amber-600 bg-amber-50" },
    { label: "已联系", value: contactedCount, icon: CheckCircle, color: "text-green-600 bg-green-50" },
  ];

  const statusMap: Record<string, string> = {
    pending: "待处理",
    contacted: "已联系",
    closed: "已成交",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">数据概览</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 pt-5">
              <div className={`p-3 rounded-full ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-5">
          <h2 className="font-semibold text-gray-900 mb-4">最近询价</h2>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">暂无询价记录</p>
          ) : (
            <div className="divide-y">
              {recentInquiries.map((inq: InquiryWithItems) => (
                <div key={inq.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{inq.name} · {inq.phone}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {inq.items.map((i: { product: { name: string } }) => i.product.name).join("、")}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    inq.status === "pending" ? "bg-amber-100 text-amber-700" :
                    inq.status === "contacted" ? "bg-blue-100 text-blue-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {statusMap[inq.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
