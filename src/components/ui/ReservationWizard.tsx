"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import PriceCalculator from "./PriceCalculator";
import { villaSettings, extraServices } from "@/lib/mock-data";
import { calculateNights, formatPrice, cn } from "@/lib/utils";
import type { BookingFormData } from "@/types";
import { ease, duration } from "@/lib/motion-tokens";

const STEPS = ["Dates", "Extras", "Details"];

const initialForm: BookingFormData = {
  checkIn: null,
  checkOut: null,
  guests: 2,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  specialRequests: "",
  extras: [],
};

export default function ReservationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const nights = form.checkIn && form.checkOut ? calculateNights(form.checkIn, form.checkOut) : 0;
  const canAdvanceStep0 = Boolean(form.checkIn && form.checkOut && nights >= villaSettings.minNights);
  const canAdvanceStep2 = Boolean(form.firstName && form.lastName && form.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: duration.meso, ease: ease.enter }}
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-6" aria-hidden="true">
          <Check size={28} className="text-olive" />
        </div>
        <h3 className="font-heading text-3xl text-olive mb-3">Enquiry Received</h3>
        <p className="text-muted max-w-sm mx-auto leading-relaxed">
          Thank you, {form.firstName}. Our team will contact you within 24 hours to confirm your reservation at Finca Escondida.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <nav className="flex items-center gap-0 mb-10" aria-label="Reserveringsstappen">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <button
              onClick={() => i < step && setStep(i)}
              className={cn(
                "flex items-center gap-2.5 text-sm",
                i === step && "text-olive font-medium",
                i < step && "text-olive/60 cursor-pointer hover:text-olive",
                i > step && "text-muted/40 cursor-default",
              )}
              disabled={i >= step}
              aria-current={i === step ? "step" : undefined}
            >
              <span className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-all",
                i === step && "bg-olive text-cream border-olive",
                i < step && "bg-olive/20 text-olive border-olive/30",
                i > step && "border-border text-muted/40",
              )}>
                {i < step ? <Check size={12} aria-hidden="true" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={cn("w-8 md:w-16 h-px mx-3 transition-colors", i < step ? "bg-olive/30" : "bg-border")} aria-hidden="true" />
            )}
          </div>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl text-olive">Select your dates</h3>
            <BookingCalendar
              checkIn={form.checkIn}
              checkOut={form.checkOut}
              onChange={(ci, co) => setForm(f => ({ ...f, checkIn: ci, checkOut: co }))}
            />
            <PriceCalculator checkIn={form.checkIn} checkOut={form.checkOut} selectedExtras={[]} />
            <div>
              <label htmlFor="guests" className="block text-sm text-muted mb-2">Number of guests</label>
              <select
                id="guests"
                value={form.guests}
                onChange={(e) => setForm(f => ({ ...f, guests: parseInt(e.target.value) }))}
                className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
              >
                {Array.from({ length: 14 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"} (max 14)</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={!canAdvanceStep0}
              className="w-full py-4 bg-olive text-cream text-sm tracking-widest uppercase rounded-xl hover:bg-olive-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl text-olive">Enhance your stay</h3>
            <div className="space-y-3" role="group" aria-label="Optionele diensten">
              {extraServices.map((service) => {
                const selected = form.extras.includes(service.id);
                const inputId = `extra-${service.id}`;
                return (
                  <label
                    key={service.id}
                    htmlFor={inputId}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                      selected ? "border-olive bg-olive/5" : "border-border bg-white hover:border-olive/40",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded flex items-center justify-center border transition-all",
                        selected ? "bg-olive border-olive" : "border-border",
                      )} aria-hidden="true">
                        {selected && <Check size={11} className="text-cream" />}
                      </div>
                      <span className="text-sm text-text">{service.label}</span>
                    </div>
                    <span className="text-sm text-muted">{formatPrice(service.price)}/night</span>
                    <input
                      id={inputId}
                      type="checkbox"
                      className="sr-only"
                      checked={selected}
                      onChange={(e) => setForm(f => ({
                        ...f,
                        extras: e.target.checked
                          ? [...f.extras, service.id]
                          : f.extras.filter(x => x !== service.id)
                      }))}
                      aria-label={`${service.label} — ${formatPrice(service.price)} per nacht`}
                    />
                  </label>
                );
              })}
            </div>
            <PriceCalculator checkIn={form.checkIn} checkOut={form.checkOut} selectedExtras={form.extras} />
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 py-4 border border-border text-muted text-sm tracking-widest uppercase rounded-xl hover:border-olive/40 transition-colors focus-visible:ring-2 focus-visible:ring-olive">
                Back
              </button>
              <button onClick={() => setStep(2)} className="flex-1 py-4 bg-olive text-cream text-sm tracking-widest uppercase rounded-xl hover:bg-olive-light transition-colors focus-visible:ring-2 focus-visible:ring-olive">
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form
            key="step-2"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            className="space-y-5"
            noValidate
          >
            <h3 className="font-heading text-2xl text-olive">Your details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { field: "firstName" as const, label: "First name", type: "text", autocomplete: "given-name" },
                { field: "lastName" as const, label: "Last name", type: "text", autocomplete: "family-name" },
              ].map(({ field, label, type, autocomplete }) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm text-muted mb-1.5">{label} <span aria-hidden="true">*</span></label>
                  <input
                    id={field}
                    type={type}
                    required
                    autoComplete={autocomplete}
                    value={form[field] as string}
                    onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
                    aria-required="true"
                  />
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-1.5">Email address <span aria-hidden="true">*</span></label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-muted mb-1.5">Phone number</label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
              />
            </div>
            <div>
              <label htmlFor="specialRequests" className="block text-sm text-muted mb-1.5">Special requests</label>
              <textarea
                id="specialRequests"
                rows={3}
                value={form.specialRequests}
                onChange={(e) => setForm(f => ({ ...f, specialRequests: e.target.value }))}
                className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 resize-none"
                placeholder="Dietary requirements, special occasions, specific needs..."
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border border-border text-muted text-sm tracking-widest uppercase rounded-xl hover:border-olive/40 transition-colors">
                Back
              </button>
              <button
                type="submit"
                disabled={!canAdvanceStep2}
                className="flex-1 py-4 bg-olive text-cream text-sm tracking-widest uppercase rounded-xl hover:bg-olive-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-olive"
              >
                Send Enquiry
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
