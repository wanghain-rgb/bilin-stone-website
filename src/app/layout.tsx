import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jianhuihome.com"),
  title: {
    default: "Jianhui Home",
    template: "%s | Jianhui Home",
  },
  description:
    "Jianhui Home supplies air circulation fans, evaporative air coolers, and space heaters for global OEM and ODM buyers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jianhui Home",
    description:
      "Cooling and heating solutions for global OEM and ODM buyers.",
    url: "https://jianhuihome.com",
    siteName: "Jianhui Home",
    images: [
      {
        url: "/images/hero-1.png",
        width: 1200,
        height: 630,
        alt: "Jianhui Home cooling and heating solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jianhui Home",
    description:
      "Cooling and heating solutions for global OEM and ODM buyers.",
    images: ["/images/hero-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
