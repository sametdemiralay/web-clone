import { Metadata } from "next";

export function generateMetadataByLang(json: Record<"tr" | "en", Metadata>) {
  return async ({ params }: { params: { locale: "tr" | "en" } }) => {
    const { locale } = await params
    return json[locale]
  }
}
