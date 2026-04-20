import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-rounded font-semibold mb-3">
          {t("badge")}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight font-display">
          {t("title")}
        </h1>
        <p className="mt-4 text-gray-700 text-lg font-body max-w-xl">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/#contacto"
            className="inline-flex items-center px-6 py-3 rounded-2xl bg-primary text-white font-rounded font-semibold shadow-soft"
          >
            {t("orderNow")}
          </Link>
          <Link
            href="/#precios"
            className="inline-flex items-center px-6 py-3 rounded-2xl border border-secondary/30 text-secondary hover:bg-secondary/10 font-body"
          >
            {t("viewPricing")}
          </Link>
        </div>

        <div className="mt-10 bg-white rounded-2xl shadow p-5 w-full max-w-sm">
          <div className="flex items-start gap-4">
            <div className="bg-primary text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold font-rounded text-lg">
              M
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold font-body">{t("cardTitle")}</div>
              <div className="text-xs text-gray-500 mt-1 font-body">{t("cardSubtitle")}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm font-medium font-body">{t("cardEtaLabel")}</div>
                <div className="text-sm font-semibold font-body">{t("cardEtaValue")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-80 h-80 rounded-3xl bg-secondary flex items-center justify-center shadow-lg">
          <Image
            src="/logos/stacked-with-tagline-white.png"
            alt={t("imageAlt")}
            width={380}
            height={380}
            loading="eager"
            style={{ height: "auto", width: "380px" }}
          />
        </div>
      </div>
    </section>
  );
}
