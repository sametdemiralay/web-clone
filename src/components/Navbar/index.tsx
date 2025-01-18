"use client";

import { useState, useLayoutEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "@/src/components/Link";
import { useChangeLocale, useCurrentLocale } from "@/src/locales/client";
import { useDataByLang } from "@/src/utils/useDataByLang";
import { useScrollPosition } from "./hooks";
import data from "./data.json";

type Content = {
  title: string;
  url: string;
};

type Page = {
  title: string;
  url: string;
  contents?: Content[];
  isDropdown?: boolean;
};

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const isScrolled = useScrollPosition();
  const currentLang = useCurrentLocale();
  const changeLang = useChangeLocale();

  const { pages } = useDataByLang(data);

  // Memoized handlers
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback((index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  }, []);

  const isActive = useCallback(
    (path: string) => {
      const normalizedPathname = pathname.toLowerCase();
      const normalizedPath = path.toLowerCase();
      return normalizedPathname.includes(normalizedPath);
    },
    [pathname]
  );

  const langToggle = useCallback(() => {
    changeLang(currentLang === "tr" ? "en" : "tr");
  }, [pathname]);

  // Mobile menu body scroll lock
  useLayoutEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
}, [isMobileMenuOpen]);

  // Memoized page content renderer
  const renderDesktopContent = useCallback((page: Page) => {
    if (!page.contents || !page.isDropdown) return null;

    return (
      <ul className="absolute top-full w-max bg-bgDefault shadow-lg rounded-md py-2 transform transition-transform duration-200 z-50 ease-in-out opacity-0 pointer-events-none translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto">
        {page.contents.map((content) => (
          <li key={content.title}>
            <Link
              href={content.url}
              className="block px-4 py-2 hover:bg-bgSecondary"
            >
              {content.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }, []);

  // Memoized language button renderer
  const LanguageButton = useMemo(
    () => (
      <button onClick={langToggle} className="flex items-center gap-1">
        <div className="relative w-[24px] h-[16px] lg:w-[28px] lg:h-[20px]">
          <Image
            src={`/langs/${currentLang === "tr" ? "en" : "tr"}.svg`}
            alt={`${currentLang === "tr" ? "ingiltere" : "türkiye"} bayrak`}
            fill
          />
        </div>
        <p className={`font-medium text-txtSubtitle ${isScrolled ? "lg:text-txtSubtitle" : "lg:text-bgDefault"}`}>
          {currentLang === "tr" ? "EN" : "TR"}
        </p>
      </button>
    ),
    [currentLang, langToggle, isScrolled]
  );

  // Memoized desktop navigation
  const DesktopNavigation = useMemo(
    () => (
      <nav className="hidden md:flex gap-5">
        {pages.map((page: Page) => (
          <div
            className="relative group inline-flex justify-center"
            key={page.title}
          >
            <Link
              href={page.url}
              className={`hover:text-primary font-medium py-5 px-3 rounded-b border-b-4 ${
                isActive(page.url) ? "border-primary" : "border-transparent"
              } ${isScrolled ? "text-txtSubtitle" : "text-bgDefault"}`}
            >
              {page.title}
            </Link>
            {page.contents && renderDesktopContent(page)}
          </div>
        ))}
      </nav>
    ),
    [pages, isActive, renderDesktopContent, isScrolled]
  );

  return (
    <header className={`fixed w-full shadow-md z-50 ${isScrolled ? "bg-bgDefault" : "bg-black/20"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/">
          <div className="relative w-[180px] h-[48px]">
            <Image src={isScrolled ? "/logo.svg" : "/logo-white.svg"} alt="Optimus Yazılım Logo" fill priority />
          </div>
        </Link>

        {/* Desktop Menu */}
        {DesktopNavigation}

        {/* Language Selector - Desktop */}
        <div className="hidden lg:block">{LanguageButton}</div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-[25px] h-[23px]">
            <Image src={isScrolled ? "/icons/hamburger.svg" : "/icons/hamburger-white.svg"} alt="hamburger menu" fill />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-bgDefault z-50 flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
          <div className="flex justify-end items-center py-5 px-4">
            <button onClick={toggleMobileMenu} aria-label="Close mobile menu">
              <div className="relative w-[23px] h-[23px]">
                <Image src="/icons/close.svg" alt="close menu" fill />
              </div>
            </button>
          </div>

          <nav className="px-4">
            {pages.map((page: Page, index: any) => (
              <div key={page.title}>
                <Link
                  href={page.url}
                  className={`block py-3 border-b ${page.contents && page.isDropdown ? "flex items-center justify-between pr-2" : ""} ${isActive(page.url) ? "text-primary" : ""}`}
                  onClick={(event) => {
                    if (page.contents && page.isDropdown) {
                      event.preventDefault();
                      toggleDropdown(index);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  <p className="font-bold">{page.title}</p>
                  {page.contents && page.isDropdown && (
                    <div
                      className={`relative w-[14px] h-[20px] transition ${activeDropdown ? "rotate-90" : "rotate-0"}`}
                    >
                      <Image src="/icons/arrow.svg" alt="arrow icon" fill />
                    </div>
                  )}
                </Link>

                {page.contents && page.isDropdown && (
                  <ul
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      activeDropdown === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {page.contents.map((content) => (
                      <li key={content.title}>
                        <Link
                          href={content.url}
                          className="block pl-1 py-2"
                          onClick={() => {
                            setMobileMenuOpen(false);
                          }}
                        >
                          <p>{content.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="px-4 py-3">{LanguageButton}</div>
        </div>
      )}
    </header>
  );
}
