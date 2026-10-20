import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Locale } from '@/i18n/routing';

/** Tailwind sınıflarını çakışmasız birleştirir. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Fiyatı dile göre yerel para formatında verir (TRY). */
export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Sayıyı binlik ayraçla biçimlendirir. */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US').format(value);
}

/** m² gibi alan değerlerini biçimlendirir. */
export function formatArea(value: number, locale: Locale): string {
  return `${formatNumber(value, locale)} m²`;
}
