import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("navbar");
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur z-40 border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="md:hidden">
            <Image
              src="/logos/logo.png"
              alt={t("logoAlt")}
              width={70}
              height={60}
              loading="eager"
            />
          </div>
          <div className="hidden md:block">
            <Image
              src="/logos/horizontal-cropped.png"
              alt={t("logoAltTagline")}
              width={285}
              height={69}
              loading="eager"
              style={{ width: "285px", height: "69px" }}
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#servicios"
            className="text-gray-700 hover:text-secondary font-body"
          >
            {t("services")}
          </Link>
          <Link
            href="/#precios"
            className="text-gray-700 hover:text-secondary font-body"
          >
            {t("pricing")}
          </Link>
          <Link
            href="/#contacto"
            className="text-gray-700 hover:text-secondary font-body"
          >
            {t("contact")}
          </Link>
          <LanguageSwitcher />
          <Link
            href="/#contacto"
            className="ml-2 inline-flex items-center px-5 py-3 rounded-2xl bg-primary text-white font-rounded font-semibold shadow-soft hover:brightness-95"
          >
            {t("orderNow")}
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/#contacto"
            className="inline-flex items-center px-3 py-2 rounded-lg bg-primary text-white font-rounded"
          >
            {t("order")}
          </Link>
        </div>
      </div>
    </header>
  );
}
