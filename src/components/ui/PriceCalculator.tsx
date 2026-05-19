"use client";

import { motion, AnimatePresence } from "motion/react";
import { calculatePrice, calculateNights, formatPrice } from "@/lib/utils";
import { villaSettings, extraServices } from "@/lib/mock-data";
import { ease, duration } from "@/lib/motion-tokens";

interface PriceCalculatorProps {
  checkIn: Date | null;
  checkOut: Date | null;
  selectedExtras: string[];
}

export default function PriceCalculator({ checkIn, checkOut, selectedExtras }: PriceCalculatorProps) {
  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const baseTotal = checkIn && checkOut
    ? calculatePrice(checkIn, checkOut, villaSettings.basePricePerNight, villaSettings.highSeasonPrice, villaSettings.highSeasonMonths)
    : 0;
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const service = extraServices.find(s => s.id === id);
    return sum + (service ? service.price * (nights || 1) : 0);
  }, 0);
  const grandTotal = baseTotal + extrasTotal;

  if (!checkIn || !checkOut || nights < villaSettings.minNights) {
    return (
      <div className="bg-cream/50 rounded-2xl p-6 border border-border text-center" role="status">
        <p className="text-muted text-sm">Select your dates to see pricing</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${checkIn.toISOString()}-${checkOut.toISOString()}-${selectedExtras.join()}`}
        className="bg-white rounded-2xl p-6 border border-border shadow-sm space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.meso, ease: ease.enter }}
        role="region"
        aria-label="Prijsberekening"
        aria-live="polite"
      >
        <div className="flex justify-between text-sm">
          <span className="text-muted">{nights} {nights === 1 ? "night" : "nights"}</span>
          <span className="text-text font-medium">{formatPrice(baseTotal)}</span>
        </div>

        {extraServices
          .filter(s => selectedExtras.includes(s.id))
          .map(service => (
            <div key={service.id} className="flex justify-between text-sm">
              <span className="text-muted">{service.label}</span>
              <span className="text-text">{formatPrice(service.price * nights)}</span>
            </div>
          ))
        }

        <div className="border-t border-border pt-4 flex justify-between">
          <span className="font-heading text-lg text-olive">Total</span>
          <span className="font-heading text-xl text-olive">{formatPrice(grandTotal)}</span>
        </div>

        <p className="text-xs text-muted/60 text-center">Excluding cleaning fee and security deposit</p>
      </motion.div>
    </AnimatePresence>
  );
}
