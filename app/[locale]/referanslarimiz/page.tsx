"use client";

import { useDataByLang } from "@/src/utils/useDataByLang";
import data from "./data.json";

export default function ReferencesPage() {
  const { metadata } = useDataByLang(data);

  return (
    <>
      <div className="bg-txtSubtitle h-[50vh] flex items-center justify-center flex-col">
        <h2 className="text-secondary">Current Page Metadata Title: {metadata.title}</h2>
      </div>
    </>
  );
}
