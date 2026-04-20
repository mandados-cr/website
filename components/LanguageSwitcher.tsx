"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

const LABELS: Record<string, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className="relative inline-flex items-center text-sm font-body text-gray-700">
      <span className="sr-only">{t("languageLabel")}</span>
      <select
        aria-label={t("languageLabel")}
        value={locale}
        onChange={onChange}
        disabled={isPending}
        className="appearance-none bg-transparent border border-secondary/30 rounded-xl pl-3 pr-7 py-1.5 text-sm font-rounded font-semibold text-secondary hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {LABELS[l] ?? l.toUpperCase()}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="pointer-events-none absolute right-2 w-4 h-4 text-secondary"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}
