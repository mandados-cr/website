import { useTranslations } from "next-intl";

const ITEM_KEYS = ["shopping", "errands", "deliveries"] as const;

export default function Services() {
  const t = useTranslations("services");
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold font-display">{t("title")}</h2>
      <div className="h-1 w-16 bg-secondary rounded-full mt-2" />
      <p className="text-gray-600 mt-3 max-w-2xl font-body">{t("subtitle")}</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {ITEM_KEYS.map((key) => {
          const bullets = t.raw(`items.${key}.bullets`) as string[];
          return (
            <div
              key={key}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="text-lg font-semibold font-body">
                {t(`items.${key}.title`)}
              </div>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 font-body">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center font-bold">
                      •
                    </div>
                    <div>{b}</div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
