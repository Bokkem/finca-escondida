export interface BookingRange {
  start: Date;
  end: Date;
  guestName?: string;
  status: "confirmed" | "pending";
}

export interface VillaSettings {
  basePricePerNight: number;
  highSeasonPrice: number;
  highSeasonMonths: number[];
  minNights: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface BentoFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  size: "large" | "medium" | "small";
}

export interface BookingFormData {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  extras: string[];
}
