"use client";

import React from "react";
import Image from "next/image";
import Link from "@/src/components/Link";
import { useDataByLang } from "@/src/utils/useDataByLang";
import navData from "@/src/components/Navbar/data.json";
import data from "./data.json";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  title?: boolean;
}

interface LinkContentProp {
  title: string;
  url: string;
}

interface LinkProp {
  title: string;
  url: string;
  contents?: LinkContentProp[];
  isDropdown?: boolean;
}

const FooterLink = ({ href, children, title = false }: FooterLinkProps) => {
  const Tag = title ? "h4" : "span";

  return (
    <Link href={href}>
      <Tag className="inline-block hover:text-secondary">{children}</Tag>
    </Link>
  );
};

const Footer = () => {
  const { description, location, phone, mail, linkedinURL, copyrightTxt } =
    useDataByLang(data);
  const { pages } = useDataByLang(navData);

  return (
    <footer>
      <div className="container mx-auto">
        <div className="py-4 lg:py-8 px-4 lg:px-0 flex flex-col lg:flex-row lg:justify-between">
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <div className="relative w-[192px] h-[52px] lg:w-[244px] lg:h-[66px] mb-4">
              <Image src="/logo.svg" alt="Optimus Yazılım Logo" fill />
            </div>

            <h3
              className="leading-tight mb-4"
              dangerouslySetInnerHTML={{ __html: description }}
            ></h3>

            <div className="space-y-2 lg:space-y-4">
              <span className="flex items-start lg:w-2/3">
                <span className="relative w-[18px] h-[18px] lg:w-[24px] lg:h-[24px] mr-2">
                  <Image src="/icons/location.svg" alt="location logo" fill />
                </span>
                {location}
              </span>
              <span className="flex items-center">
                <span className="relative w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] mr-2">
                  <Image src="/icons/phone.svg" alt="phone logo" fill />
                </span>
                {phone}
              </span>
              <span className="flex items-center">{mail}</span>
            </div>

            <Link
              href={linkedinURL}
              className="relative w-[18px] h-[18px] lg:w-[24px] lg:h-[24px] inline-block mt-2 lg:mt-4 transition-opacity hover:opacity-75"
            >
              <Image src="/icons/linkedin.svg" alt="linkedin logo" fill />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:w-1/2">
            <div>
              <FooterLink href={pages[1].url} title>
                {pages[1].title}
              </FooterLink>
              <ul className="lg:mt-2">
                {pages
                  .filter(
                    (item: any) => item.contents && item.isDropdown && Array.isArray(item.contents)
                  )
                  .map((item: LinkProp) =>
                    item.contents?.map((contentItem: LinkContentProp) => (
                      <li key={contentItem.title}>
                        <FooterLink href={contentItem.url}>
                          {contentItem.title}
                        </FooterLink>
                      </li>
                    ))
                  )}
              </ul>
            </div>

            <ul className="space-y-3">
              {pages
                .filter(
                  (item: any) => !item.isDropdown || !Array.isArray(item.contents)
                )
                .map((item: LinkProp) => (
                  <li key={item.title}>
                    <FooterLink href={item.url} title>
                      {item.title}
                    </FooterLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 bg-bgPrimary text-center">
        <span className="lg:font-medium">
          Copyright © {new Date().getFullYear()} {copyrightTxt}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
