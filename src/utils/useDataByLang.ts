import { useMemo } from "react";
import { useCurrentLocale } from "@/src/locales/client";

export const useDataByLang = <T extends Record<string, any>>(data: T) => {
  const locale = useCurrentLocale();

  const filteredData = useMemo(() => {
    if (!data || typeof data !== "object") return {};

    const langData: Record<string, any> = {};
    for (const key in data) {
      const value = data[key];

      if (value && typeof value === "object" && locale in value) {
        langData[key] = value[locale];
      } else {
        langData[key] = value;
      }
    }

    return langData;
  }, [data, locale]);

  return filteredData;
};
