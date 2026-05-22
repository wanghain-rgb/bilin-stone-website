import { LangProvider } from "@/components/LangProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LangProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </LangProvider>
  );
}
