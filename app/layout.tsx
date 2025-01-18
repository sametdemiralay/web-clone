import type { Metadata } from "next";
import "@/src/styles/globals.css";
import { getStaticParams } from "@/src/locales/server";

export const metadata: Metadata = {
  title: "Optimus Yazılım",
  description: "Optimus Yazılım - Website",
};

type Props = {
  children: React.ReactNode;
};

// @NOTE: diğer tüm sayfalara otomatik etki eder. (eğer override edilmezse)
export function generateStaticParams() {
  return getStaticParams()
}

export default async function Layout(props: Props) {
  return props.children
}
