import { useTranslations } from "next-intl";

export default function Pricing() {
  const t = useTranslations("pricing");
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h3 className="text-2xl sm:text-3xl font-bold font-display">{t("title")}</h3>
      <div className="h-1 w-16 bg-secondary rounded-full mt-2" />
      <p className="text-gray-600 mt-3 font-body">{t("subtitle")}</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border hover:shadow-md transition-shadow">
          <div className="font-semibold font-body">{t("plans.errands.title")}</div>
          <div className="text-sm text-gray-700 mt-2 font-body">
            {t("plans.errands.price")}
          </div>
          <div className="text-xs text-gray-500 mt-2 font-body">
            {t("plans.errands.note")}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-secondary/40 ring-1 ring-secondary/10 hover:shadow-md transition-shadow relative">
          <span className="absolute -top-3 left-4 px-2 py-0.5 rounded-full bg-secondary text-white text-xs font-rounded">
            {t("mostPopular")}
          </span>
          <div className="font-semibold font-body text-secondary">
            {t("plans.daily.title")}
          </div>
          <div className="text-sm text-gray-700 mt-2 font-body">
            {t("plans.daily.price")}
          </div>
          <div className="text-xs text-gray-500 mt-2 font-body">
            {t("plans.daily.note")}
          </div>
        </div>

        <div className="p-6 rounded-xl border hover:shadow-md transition-shadow">
          <div className="font-semibold font-body">
            {t("plans.shoppingBilling.title")}
          </div>
          <div className="text-sm text-gray-700 mt-2 font-body">
            {t("plans.shoppingBilling.price")}
          </div>
          <div className="text-xs text-gray-500 mt-2 font-body">
            {t("plans.shoppingBilling.note")}
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600 font-body">
        {t.rich("billingNote", {
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </div>
    </div>
  );
}
