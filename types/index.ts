/** Uygulama genelinde kullanılan tip tanımları. */

export type ListingTransaction = 'sale' | 'rent';

export type PropertyType =
  | 'apartment' // Daire
  | 'villa' // Villa
  | 'office' // Ofis
  | 'land' // Arsa
  | 'shop'; // Dükkan

export interface ListingLocation {
  city: string; // İl
  district: string; // İlçe
  neighborhood?: string; // Mahalle; use a name from data/neighborhoods.ts
}

export interface Listing {
  id: string;
  ref: string; // Görünür referans kodu, örn. "BRS-001"
  slug: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  type: ListingTransaction;
  propertyType: PropertyType;
  price: number; // TRY
  /** Kiralık ilanlar için periyot. Satılıkta kullanılmaz. */
  rentPeriod?: 'monthly';
  location: ListingLocation;
  area: number; // m²; ölçüm türü areaType ile belirtilir
  areaType?: 'net' | 'gross';
  rooms: string; // örn. "3+1", "Stüdyo", "—"
  bathrooms?: number; // yalnızca doğrulandığında belirtilir
  /** Bina yaşı (0 = sıfır bina). */
  buildingAge?: number;
  floor?: string; // örn. "4 / 8"
  images: string[]; // public/ kök yoluna göre, örn. "/images/listings/listing-01.webp"
  features: string[]; // çeviri anahtarları (messages -> listingFeatures.*)
  featured: boolean;
  /** Fırsat Yerler bölümünde gösterilecek, doğrulanmış fırsat ilanı. */
  opportunity?: boolean;
  createdAt: string; // ISO tarih — sıralama/sitemap için
}

export interface NavItem {
  href:
    | '/'
    | '/about'
    | '/services'
    | '/listings'
    | '/contact';
  labelKey: string;
}
