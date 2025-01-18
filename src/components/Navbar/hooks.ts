import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useCurrentLocale } from '@/src/locales/client';
import data from '@/src/components/Navbar/data.json';
import { useDataByLang } from '@/src/utils/useDataByLang';

interface BannerData {
  titles: string[];
  bannerBgImage: string;
}

export const useScrollPosition = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  const handleScroll = useCallback(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 0);
      }, 16);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [handleScroll]);

  return isScrolled;
};

export function useBannerInfo(): BannerData {
  const { pages } = useDataByLang(data);
  const pathname = usePathname();
  const currentLocale = useCurrentLocale();
  const currentURL = pathname.replace(`/${currentLocale}`, '');

  const findBannerData = useMemo(() => {
    return (linkData: any[], currentURL: string): BannerData => {
      for (const link of linkData) {
        if (link.url === currentURL) {
          return {
            titles: [link.title],
            bannerBgImage: link.bannerBgImage,
          };
        }

        if (link.contents) {
          const nestedData = findBannerData(link.contents, currentURL);
          if (nestedData.titles.length > 0) {
            return {
              titles: [link.title, ...nestedData.titles],
              bannerBgImage: nestedData.bannerBgImage,
            };
          }
        }
      }
      return { titles: [], bannerBgImage: "" };
    };
  }, []);

  const bannerData = useMemo(() => {
    return findBannerData(pages, currentURL);
  }, [findBannerData, pages, currentURL]);

  return bannerData;
}