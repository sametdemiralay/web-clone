import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useCurrentLocale } from "../locales/client";

export default function Link({
  href,
  children,
  ...rest
}: Readonly<{ href: string; className?: string; children: React.ReactNode }> &
  ComponentProps<typeof NextLink>) {
  const locale = useCurrentLocale();

  return (
    <NextLink href={`/${locale}${href}`} {...rest}>
      {children}
    </NextLink>
  );
}
