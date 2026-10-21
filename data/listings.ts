import type { Listing } from '@/types';

// User-supplied listing details and original photographs from the uploaded RAR archive.
export const listings: Listing[] = [
  {
    id: 'BRS-001',
    ref: 'BRS-001',
    slug: 'hamidiye-mahallesi-105-net-2plus1-satilik-daire',
    title: {
      tr: 'Hamidiye’de 105 m² Net, Komple Yapılı 2+1',
      en: 'Renovated 2+1 Apartment in Hamidiye — 105 m² Net',
    },
    description: {
      tr: 'Karaman Merkez Hamidiye Mahallesi’nde; 105 m² net kullanım alanı, 2+1 planı ve güney-doğu cephesiyle öne çıkan satılık daire.\n\nKomple yapılı iç mekân, doğal gaz ve dış cephe yalıtımı. Binanın çatısı yeni yapılmıştır.\n\nDaire, 4 katlı binanın 4. katındadır.\n\nSatış fiyatı: 2.490.000 TL. Detayları Ahmet Asal’dan öğrenin; daireyi görmek için randevu oluşturalım.',
      en: 'An apartment for sale in Hamidiye, Karaman Merkez, with 105 m² of net floor area, a 2-bedroom plus living-room layout and south-east exposure.\n\nRenovated interior, natural gas and exterior insulation. The building’s roof has recently been renewed.\n\nLocated on floor 4 of a 4-storey building.\n\nAsking price: TRY 2,490,000. Contact Ahmet Asal for details and to arrange a viewing.',
    },
    type: 'sale',
    propertyType: 'apartment',
    price: 2490000,
    location: { city: 'Karaman', district: 'Merkez', neighborhood: 'Hamidiye Mahallesi' },
    area: 105,
    areaType: 'net',
    rooms: '2+1',
    floor: '4 / 4',
    images: [
      "/images/listings/hamidiye-2plus1/01-salon.jpg",
      "/images/listings/hamidiye-2plus1/02-mutfak-genel.jpg",
      "/images/listings/hamidiye-2plus1/03-balkon-cevre.jpg",
      "/images/listings/hamidiye-2plus1/04-oda-genel.jpg",
      "/images/listings/hamidiye-2plus1/05-oda-pencere.jpg",
      "/images/listings/hamidiye-2plus1/06-oda-farkli-aci.jpg",
      "/images/listings/hamidiye-2plus1/07-balkon-diger-aci.jpg",
      "/images/listings/hamidiye-2plus1/08-mutfak-detay.jpg",
      "/images/listings/hamidiye-2plus1/09-mutfak-kombi.jpg",
      "/images/listings/hamidiye-2plus1/10-banyo.jpg",
      "/images/listings/hamidiye-2plus1/11-koridor.jpg",
      "/images/listings/hamidiye-2plus1/12-antre.jpg",
      "/images/listings/hamidiye-2plus1/13-giris-kapisi.jpg",
      "/images/listings/hamidiye-2plus1/14-lavabo.jpg",
      "/images/listings/hamidiye-2plus1/15-wc.jpg"
],
    imageCaptions: {
      "tr": [
            "Aydınlık salon",
            "Mutfak genel görünümü",
            "Balkon ve çevre görünümü",
            "Oda genel görünümü",
            "Pencereli oda görünümü",
            "Oda görünümü, farklı açı",
            "Balkon, diğer açı",
            "Mutfak dolapları ve tezgâh",
            "Mutfak, kombi ve balkon kapısı",
            "Banyo ve duş alanı",
            "Koridor genel görünümü",
            "Giriş ve antre",
            "Daire giriş kapısı",
            "Lavabo alanı",
            "Ayrı WC"
      ],
      "en": [
            "Bright living room",
            "Kitchen overview",
            "Balcony and surroundings",
            "Room overview",
            "Room with window",
            "Room from another angle",
            "Balcony from another angle",
            "Kitchen cabinets and countertop",
            "Kitchen, boiler and balcony door",
            "Bathroom and shower",
            "Hallway overview",
            "Entrance and hall",
            "Apartment entrance door",
            "Washbasin area",
            "Separate toilet"
      ]
},
    features: ['southEastFacing', 'renovated', 'exteriorInsulation', 'newRoof', 'naturalGas'],
    featured: true,
    createdAt: '2026-10-21',
  },
];

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
