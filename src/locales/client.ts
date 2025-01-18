"use client"
import { createI18nClient } from 'next-international/client'

export const { useScopedI18n: useTranslation, I18nProviderClient, useCurrentLocale, useChangeLocale } = createI18nClient({
  tr: () => import('./tr'),
  en: () => import('./en'),
})
