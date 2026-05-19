import type { BookingRange, VillaSettings, GalleryImage, BentoFeature, Amenity } from "@/types";

export const villaSettings: VillaSettings = {
  basePricePerNight: 1850,
  highSeasonPrice: 2950,
  highSeasonMonths: [6, 7, 8, 9],
  minNights: 7,
};

export const mockBookings: BookingRange[] = [
  { start: new Date(2026, 5, 1), end: new Date(2026, 5, 14), status: "confirmed" },
  { start: new Date(2026, 6, 10), end: new Date(2026, 6, 24), status: "confirmed" },
  { start: new Date(2026, 7, 5), end: new Date(2026, 7, 19), status: "confirmed" },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/pool.webp", alt: "Infinity pool overlooking Ibiza coastline", width: 1200, height: 800 },
  { src: "/images/living.webp", alt: "Open-plan living area with sea views", width: 1200, height: 800 },
  { src: "/images/bedroom.webp", alt: "Master bedroom with terrace", width: 1200, height: 800 },
  { src: "/images/kitchen.webp", alt: "Professional chef's kitchen", width: 1200, height: 800 },
  { src: "/images/terrace.webp", alt: "Sunset terrace with outdoor dining", width: 1200, height: 800 },
  { src: "/images/spa.webp", alt: "Private wellness and spa area", width: 1200, height: 800 },
  { src: "/images/exterior.webp", alt: "Villa exterior at golden hour", width: 1200, height: 800 },
  { src: "/images/cellar.webp", alt: "Private wine cellar", width: 1200, height: 800 },
];

export const bentoFeatures: BentoFeature[] = [
  { id: "pool", title: "Infinity Pool", description: "A 22-metre infinity pool suspended above the Mediterranean. Swim toward the horizon.", image: "/images/pool.webp", size: "large" },
  { id: "chef", title: "Private Chef", description: "Your personal chef crafts bespoke menus from Ibiza's finest local produce.", image: "/images/kitchen.webp", size: "medium" },
  { id: "spa", title: "Wellness Retreat", description: "A private spa with hammam, sauna and massage studio.", image: "/images/spa.webp", size: "medium" },
  { id: "terrace", title: "Al Fresco Dining", description: "Two terraces, one for sunset cocktails, one for long candlelit dinners under the stars.", image: "/images/terrace.webp", size: "small" },
  { id: "cellar", title: "Wine Cellar", description: "Curated selection of 400+ bottles. The sommelier is one call away.", image: "/images/cellar.webp", size: "small" },
  { id: "location", title: "Ibiza's North", description: "Nestled in the secluded hills of San Carlos. Total privacy. 8 minutes to the sea.", image: "/images/exterior.webp", size: "medium" },
];

export const amenities: Amenity[] = [
  { icon: "wifi", title: "High-speed Wifi", description: "Fibre throughout the property" },
  { icon: "car", title: "Chauffeur Service", description: "Airport transfers and daily excursions" },
  { icon: "boat", title: "Boat Charter", description: "Private yacht available on request" },
  { icon: "shield", title: "24/7 Security", description: "Discreet round-the-clock protection" },
  { icon: "sun", title: "Concierge", description: "Whatever you need, whenever you need it" },
  { icon: "music", title: "Entertainment", description: "Cinema room, sound system throughout" },
];

export const extraServices = [
  { id: "chef", label: "Private Chef", price: 450 },
  { id: "chauffeur", label: "Daily Chauffeur", price: 350 },
  { id: "yacht", label: "Yacht Charter (half day)", price: 1200 },
  { id: "spa", label: "In-villa Spa Treatment", price: 180 },
  { id: "florist", label: "Welcome Flowers & Champagne", price: 280 },
];
