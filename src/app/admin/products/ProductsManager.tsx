"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  nameZh: string | null;
  description: string | null;
  descriptionZh: string | null;
  category: string | null;
  isActive: boolean;
  createdAt: Date;
};

type FormData = {
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  category: string;
};

const emptyForm: FormData = {
  name: "",
  nameZh: "",
  description: "",
  descriptionZh: "",
  category: "",
};

export default function ProductsManager({ products: initial }: { products: Product[] }) {
  const [products, setProducts] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      nameZh: p.nameZh ?? "",
      description: p.description ?? "",
      descriptionZh: p.descriptionZh ?? "",
      category: p.category ?? "",
    });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("商品名称不能为空");
      return;
    }
    setLoading(true);
    try {
      const url = editing ? `/api/products/${editing.id}` : "/api/products";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const saved: Product = await res.json();
      if (editing) {
        setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
        toast.success("商品已更新");
      } else {
        setProducts((prev) => [saved, ...prev]);
        toast.success("商品已添加");
      }
      setOpen(false);
    } catch {
      toast.error("操作失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (p: Product) => {
    const res = await fetch(`/api/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !p.isActive }),
    });
    if (res.ok) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === p.id ? { ...item, isActive: !item.isActive } : item
        )
      );
      toast.success(p.isActive ? "商品已下架" : "商品已上架");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这个商品吗？")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("商品已删除");
    } else {
      toast.error("删除失败");
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={openCreate}
          className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
        >
          <Plus className="h-4 w-4 mr-1" /> 添加商品
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-400">
            暂无商品，点击上方按钮添加
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map((p) => (
            <Card key={p.id} className={`overflow-hidden ${!p.isActive ? "opacity-60" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900">{p.name}</span>
                      {!p.isActive && <Badge variant="secondary">已下架</Badge>}
                      {p.category && <Badge variant="outline">{p.category}</Badge>}
                    </div>
                    {p.nameZh && (
                      <p className="text-xs text-gray-400 mt-0.5">{p.nameZh}</p>
                    )}
                    {p.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {p.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEdit(p)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400"
                      onClick={() => toggleActive(p)}
                      title={p.isActive ? "下架" : "上架"}
                    >
                      {p.isActive ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑商品" : "添加商品"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto pr-1">
            <div className="space-y-1.5">
              <Label>英文名称 *</Label>
              <Input
                placeholder="Product name in English"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>中文名称</Label>
              <Input
                placeholder="产品中文名称"
                value={form.nameZh}
                onChange={(e) => setForm({ ...form, nameZh: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>分类</Label>
              <Input
                placeholder="如：BLDC Air Circulation Fan"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>英文描述</Label>
              <Textarea
                placeholder="Description in English"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>中文描述</Label>
              <Textarea
                placeholder="产品中文描述"
                rows={3}
                value={form.descriptionZh}
                onChange={(e) =>
                  setForm({ ...form, descriptionZh: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editing ? "保存修改" : "添加商品"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
