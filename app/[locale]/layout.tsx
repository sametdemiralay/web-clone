import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nProviderClient } from "@/src/locales/client";
import { setStaticParamsLocale } from "next-international/server";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Optimus Yazılım",
  description: "Optimus Yazılım - Website",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout(props: Props) {
  const { locale } = await props.params;

  setStaticParamsLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProviderClient locale={locale}>
          <Navbar />
          {props.children}
          <Footer />
        </I18nProviderClient>
      </body>
    </html>
  );
}
