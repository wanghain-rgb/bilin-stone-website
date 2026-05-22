"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useLang } from "@/components/LangProvider";

type Product = { id: number; name: string; nameZh: string | null; category: string | null };

type SelectedItem = { productId: number; quantity: number; note: string };

export default function InquiryForm({
  products,
  defaultProductId,
}: {
  products: Product[];
  defaultProductId?: string;
}) {
  const router = useRouter();
  const { lang, t } = useLang();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });
  const [items, setItems] = useState<SelectedItem[]>(
    defaultProductId
      ? [{ productId: parseInt(defaultProductId), quantity: 1, note: "" }]
      : [{ productId: 0, quantity: 1, note: "" }]
  );

  const addItem = () =>
    setItems([...items, { productId: 0, quantity: 1, note: "" }]);

  const removeItem = (i: number) =>
    setItems(items.filter((_, idx) => idx !== i));

  const updateItem = (
    i: number,
    field: keyof SelectedItem,
    value: string | number
  ) =>
    setItems(items.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = items.filter((item) => item.productId > 0);
    if (validItems.length === 0) {
      toast.error(t.inquiry.minProduct);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: validItems }),
      });
      if (!res.ok) throw new Error();
      toast.success(t.inquiry.successMsg);
      router.push("/");
    } catch {
      toast.error(t.inquiry.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.inquiry.title}</h1>
        <p className="mt-2 text-gray-500">{t.inquiry.subtitle}</p>
      </div>

      {/* Contact Info */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-semibold text-gray-900">{t.inquiry.contactInfo}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t.inquiry.name} *</Label>
              <Input
                id="name"
                placeholder={t.inquiry.namePh}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">{t.inquiry.phone} *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t.inquiry.phonePh}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t.inquiry.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.inquiry.emailPh}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">{t.inquiry.company}</Label>
              <Input
                id="company"
                placeholder={t.inquiry.companyPh}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">{t.inquiry.products}</h2>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-1" /> {t.inquiry.addProduct}
            </Button>
          </div>
          {items.map((item, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {t.inquiry.product} {i + 1}
                </span>
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-400 hover:text-red-600"
                    onClick={() => removeItem(i)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <Label>{t.inquiry.product} *</Label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    value={item.productId || ""}
                    onChange={(e) =>
                      updateItem(i, "productId", parseInt(e.target.value))
                    }
                    required
                  >
                    <option value="">{t.inquiry.selectProduct}</option>
                    {products.map((p) => {
                      const displayName =
                        lang === "zh" && p.nameZh ? p.nameZh : p.name;
                      return (
                        <option key={p.id} value={p.id}>
                          {displayName}
                          {p.category ? ` (${p.category})` : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>{t.inquiry.quantity}</Label>
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(i, "quantity", parseInt(e.target.value) || 1)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.inquiry.note}</Label>
                  <Input
                    placeholder={t.inquiry.notePh}
                    value={item.note}
                    onChange={(e) => updateItem(i, "note", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Message */}
      <Card>
        <CardContent className="pt-6 space-y-2">
          <Label htmlFor="message">{t.inquiry.message}</Label>
          <Textarea
            id="message"
            placeholder={t.inquiry.messagePh}
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
        disabled={loading}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t.inquiry.submit}
      </Button>
    </form>
  );
}
