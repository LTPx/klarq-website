import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import App from "./app";
import "tailwindcss/tailwind.css";
import "../global.css";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: "klarq",
    description: "New Site",
    // robots: seoData.robots,
    openGraph: {
      title: "klarq",
      description: "New Site",
      siteName: "",
      locale: locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "en" | "es" | "de" };
}) {
  const messages = await getMessages({ locale });
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <App locale={locale}>{children}</App>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
