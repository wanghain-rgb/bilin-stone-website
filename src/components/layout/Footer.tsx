"use client";

import { useLang } from "@/components/LangProvider";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-jianhui-home.svg"
              alt="Jianhui Home"
              style={{ height: '48px', width: 'auto' }}
            />
            <p className="text-sm text-gray-500 mt-2">{t.footer.tagline}</p>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Jianhui Home. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
