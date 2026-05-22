import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const inquiries = await prisma.inquiry.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(inquiries);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, phone, email, company, message, items } = body;

  if (!name || !phone || !items?.length) {
    return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      name,
      phone,
      email: email || null,
      company: company || null,
      message: message || null,
      items: {
        create: items.map((item: { productId: number; quantity: number; note?: string }) => ({
          productId: item.productId,
          quantity: item.quantity || 1,
          note: item.note || null,
        })),
      },
    },
    include: { items: { include: { product: true } } },
  });
  return NextResponse.json(inquiry, { status: 201 });
}
