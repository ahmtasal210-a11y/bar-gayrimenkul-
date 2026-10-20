import type { Listing } from '@/types';

// Add only verified Barış Gayrimenkul listings. The supplied template examples were removed.
export const listings: Listing[] = [];

/** Slug'a göre tek ilan getirir. */
export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

/** Öne çıkan ilanları döndürür. */
export function getFeaturedListings(limit = 6): Listing[] {
  return listings.filter((l) => l.featured).slice(0, limit);
}

/** Fırsat olarak işaretlenen ilanları döndürür. */
export function getOpportunityListings(limit = 6): Listing[] {
  return listings.filter((l) => l.opportunity).slice(0, limit);
}

/** Tüm benzersiz illeri döndürür (filtre için). */
export function getCities(): string[] {
  return Array.from(new Set(['Karaman', ...listings.map((l) => l.location.city)])).sort();
}
