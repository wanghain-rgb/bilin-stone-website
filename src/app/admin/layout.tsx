import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar username={session.username} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
