import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function calculatePrice(
  checkIn: Date,
  checkOut: Date,
  basePricePerNight: number,
  highSeasonPrice: number,
  highSeasonMonths: number[]
): number {
  const nights = calculateNights(checkIn, checkOut);
  if (nights <= 0) return 0;
  const month = checkIn.getMonth() + 1;
  const isHighSeason = highSeasonMonths.includes(month);
  return nights * (isHighSeason ? highSeasonPrice : basePricePerNight);
}

export function isDateUnavailable(date: Date, unavailableRanges: { start: Date; end: Date }[]): boolean {
  return unavailableRanges.some(
    (range) => date >= range.start && date <= range.end
  );
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
