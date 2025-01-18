"use client";

import React from "react";
import { useBannerInfo } from "../components/Navbar/hooks";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export default function GenericContentLayout(props: Props) {
  const bannerdata = useBannerInfo();

  return (
    <>
      <div className="relative w-full h-[167px] sm:h-[215px] lg:h-[265px]">
        <Image
          src={bannerdata.bannerBgImage}
          alt="Banner Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute w-full bottom-4 lg:bottom-10">
          <div className="container mx-auto px-4 text-bgDefault">
            <div className="flex gap-2 mb-1 lg:mb-8">
              <Image
                src="/icons/home.svg"
                alt="Optimus Yazılım Logo"
                width={15}
                height={15}
              />
              <Image
                src="/icons/arrow-fill.svg"
                alt="arrow logo"
                width={4}
                height={8}
              />
              {bannerdata.titles.map((title, index) => (
                <React.Fragment key={index}>
                  <span>{title}</span>
                  {index < bannerdata.titles.length - 1 && (
                    <Image
                      src="/icons/arrow-fill.svg"
                      alt="arrow logo"
                      width={4}
                      height={8}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <h3>
              {bannerdata.titles.length > 0
                ? bannerdata.titles[bannerdata.titles.length - 1]
                : "-"}
            </h3>
          </div>
        </div>
        <div className="absolute inset-0 bg-home-banner-gradient z-1"></div>
      </div>
      {props.children}
    </>
  );
}
