"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, ChevronDown } from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  message: string | null;
  status: string;
  createdAt: Date | string;
  items: Array<{
    id: number;
    quantity: number;
    note: string | null;
    product: { id: number; name: string };
  }>;
};

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "待处理", className: "bg-amber-100 text-amber-700 border-amber-200" },
  contacted: { label: "已联系", className: "bg-blue-100 text-blue-700 border-blue-200" },
  closed: { label: "已成交", className: "bg-green-100 text-green-700 border-green-200" },
};

export default function InquiryTable({ inquiries: initial }: { inquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initial);
  const [expanded, setExpanded] = useState<number | null>(null);

  const updateStatus = async (id: number, status: string) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
      toast.success("状态已更新");
    } else {
      toast.error("更新失败");
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm("确定要删除这条询价记录吗？")) return;
    const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    if (res.ok) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      toast.success("已删除");
    } else {
      toast.error("删除失败");
    }
  };

  if (inquiries.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-gray-400">暂无询价记录</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {inquiries.map((inq) => {
        const cfg = statusConfig[inq.status] ?? statusConfig.pending;
        const isOpen = expanded === inq.id;
        return (
          <Card key={inq.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900">{inq.name}</span>
                    <span className="text-gray-500 text-sm">{inq.phone}</span>
                    {inq.company && <span className="text-gray-400 text-sm">· {inq.company}</span>}
                    <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    产品：{inq.items.map((i) => `${i.product.name}×${i.quantity}`).join("、")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(inq.createdAt).toLocaleString("zh-CN")}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Select value={inq.status} onValueChange={(val) => val && updateStatus(inq.id, val)}>
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">待处理</SelectItem>
                      <SelectItem value="contacted">已联系</SelectItem>
                      <SelectItem value="closed">已成交</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => deleteInquiry(inq.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setExpanded(isOpen ? null : inq.id)}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </Button>
                </div>
              </div>

              {isOpen && (
                <div className="mt-4 pt-4 border-t space-y-3 text-sm">
                  {inq.email && <p className="text-gray-600">邮箱：{inq.email}</p>}
                  {inq.message && <p className="text-gray-600">备注：{inq.message}</p>}
                  <div>
                    <p className="font-medium text-gray-700 mb-2">询价明细：</p>
                    <div className="space-y-1.5 pl-2">
                      {inq.items.map((item) => (
                        <div key={item.id} className="flex gap-4 text-gray-600">
                          <span>{item.product.name}</span>
                          <span>数量：{item.quantity}</span>
                          {item.note && <span className="text-gray-400">备注：{item.note}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
