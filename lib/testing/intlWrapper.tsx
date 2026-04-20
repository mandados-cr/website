import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/es.json";

export function IntlWrapper({ children, locale = "es" }: { children: ReactNode; locale?: string }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
