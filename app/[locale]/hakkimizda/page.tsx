"use client";

import Image from "next/image";
import { useDataByLang } from "@/src/utils/useDataByLang";
import CustomSection from "@/src/components/CustomSection";
import data from "./data.json";

export default function AboutPage() {
  const { metadata, aboutContent } = useDataByLang(data);

  return (
    <>
      <div className="bg-txtSubtitle h-[50vh] flex items-center justify-center flex-col">
        <h2 className="text-secondary">
          Current Page Metadata Title: {metadata.title}
        </h2>
      </div>
      <CustomSection backgroundColor="bg-custom-bg">
        <p className="mb-3">{aboutContent.txtFirst}</p>
        <p className="mb-3">{aboutContent.txtSecond}</p>
        <p>{aboutContent.txtThird}</p>
        <div className="flex flex-wrap my-6">
          {aboutContent.infoList.map((item: any) => (
            <div
              key={item.title}
              className="flex gap-3 mb-5 w-1/2 lg:w-1/5 justify-center"
            >
              <Image
                src={item.icon}
                alt={item.subtitle}
                width={32}
                height={32}
              />
              <div>
                <h2>{item.title}</h2>
                <h4>{item.subtitle}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="relative w-[21rem] h-[21rem] sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-full lg:h-72 mx-auto lg:my-10 text-bgDefault">
          {aboutContent.circles.map((item: any) => (
            <div
              className={`absolute w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full flex items-center justify-center text-center shadow-xl ${item.customClass}`}
            >
              <div className="w-3/4 md:w-4/6 flex flex-col gap-3">
                <h2 className="font-bold leading-none">{item.head}</h2>
                <div className="flex gap-2">
                  <h3 className="font-bold leading-none">{item.bodyLeft}</h3>
                  <h3 className="font-bold leading-none">{item.bodyRight}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CustomSection>
    </>
  );
}
