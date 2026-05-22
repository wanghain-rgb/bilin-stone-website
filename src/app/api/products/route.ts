import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, nameZh, description, descriptionZh, category, specs } = body;
  if (!name) return NextResponse.json({ error: "商品名称不能为空" }, { status: 400 });

  const product = await prisma.product.create({
    data: {
      name,
      nameZh: nameZh || null,
      description: description || null,
      descriptionZh: descriptionZh || null,
      category: category || null,
      specs: specs ? JSON.stringify(specs) : null,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
