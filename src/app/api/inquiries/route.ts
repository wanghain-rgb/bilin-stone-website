import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Resend } from "resend";

type InquiryItem = {
  product: { name: string; category?: string | null };
  quantity: number;
  note?: string | null;
};

function buildEmailHtml(inquiry: {
  name: string;
  phone: string;
  email?: string | null;
  company?: string | null;
  message?: string | null;
  createdAt: Date;
  items: InquiryItem[];
}): string {
  const itemRows = inquiry.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.product.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.product.category ?? "-"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.note ?? "-"}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.08);overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#1a3a6b;padding:28px 40px;">
            <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">New Inquiry — Bilin Stone</h1>
            <p style="margin:6px 0 0;color:#C9922A;font-size:13px;">
              Submitted at ${new Date(inquiry.createdAt).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
            </p>
          </td>
        </tr>

        <!-- Contact Info -->
        <tr>
          <td style="padding:32px 40px 24px;">
            <h2 style="margin:0 0 16px;color:#1a3a6b;font-size:15px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Customer Information</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;color:#6b7a99;font-size:13px;width:100px;">Name</td>
                <td style="padding:6px 0;color:#1a1a2e;font-size:14px;font-weight:500;">${inquiry.name}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7a99;font-size:13px;">Company</td>
                <td style="padding:6px 0;color:#1a1a2e;font-size:14px;">${inquiry.company ?? "-"}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7a99;font-size:13px;">Email</td>
                <td style="padding:6px 0;color:#1a1a2e;font-size:14px;">${inquiry.email ?? "-"}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7a99;font-size:13px;">Phone</td>
                <td style="padding:6px 0;color:#1a1a2e;font-size:14px;">${inquiry.phone}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"></td></tr>

        <!-- Product List -->
        <tr>
          <td style="padding:24px 40px;">
            <h2 style="margin:0 0 16px;color:#1a3a6b;font-size:15px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Inquiry Items</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              <thead>
                <tr style="background:#f5f7fa;">
                  <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7a99;font-weight:500;">Product</th>
                  <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7a99;font-weight:500;">Category</th>
                  <th style="padding:10px 12px;text-align:center;font-size:12px;color:#6b7a99;font-weight:500;">Qty</th>
                  <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7a99;font-weight:500;">Note</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
            </table>
          </td>
        </tr>

        <!-- Message -->
        ${
          inquiry.message
            ? `
        <tr>
          <td style="padding:0 40px 24px;">
            <h2 style="margin:0 0 10px;color:#1a3a6b;font-size:15px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Additional Message</h2>
            <p style="margin:0;color:#1a1a2e;font-size:14px;line-height:1.7;background:#f5f7fa;padding:14px 16px;border-radius:8px;">${inquiry.message}</p>
          </td>
        </tr>`
            : ""
        }

        <!-- Footer -->
        <tr>
          <td style="background:#f5f7fa;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#6b7a99;font-size:12px;">This is an automated notification from the Bilin Stone website.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendInquiryNotification(inquiry: {
  name: string;
  phone: string;
  email?: string | null;
  company?: string | null;
  message?: string | null;
  createdAt: Date;
  items: InquiryItem[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!apiKey || !adminEmail) {
    console.warn("[Resend] Skipping email: RESEND_API_KEY or ADMIN_EMAIL not configured.");
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "Bilin Stone <onboarding@resend.dev>",
    to: adminEmail,
    subject: `New Inquiry from Bilin Stone Website — ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
    html: buildEmailHtml(inquiry),
  });
}

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

  // Fire-and-forget: email failure must not affect the response
  sendInquiryNotification(inquiry).catch((err) =>
    console.error("[Resend] Failed to send inquiry notification:", err)
  );

  return NextResponse.json(inquiry, { status: 201 });
}
