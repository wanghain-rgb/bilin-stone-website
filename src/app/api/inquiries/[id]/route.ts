import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();
  const validStatuses = ["pending", "contacted", "closed"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "无效状态" }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.update({
    where: { id: parseInt(id) },
    data: { status },
  });
  return NextResponse.json(inquiry);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.inquiry.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
