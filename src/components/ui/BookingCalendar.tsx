"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isDateUnavailable, cn } from "@/lib/utils";
import { mockBookings, villaSettings } from "@/lib/mock-data";

interface BookingCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
}

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function BookingCalendar({ checkIn, checkOut, onChange }: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const prevMonth = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const nextMonth = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayRaw = new Date(year, month, 1).getDay();
  const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1;

  const unavailableRanges = mockBookings.map(b => ({ start: b.start, end: b.end }));

  const handleDayClick = (day: number) => {
    const clicked = new Date(year, month, day);
    clicked.setHours(0, 0, 0, 0);
    if (isDateUnavailable(clicked, unavailableRanges) || clicked < today) return;

    if (!checkIn || (checkIn && checkOut)) {
      onChange(clicked, null);
    } else {
      if (clicked <= checkIn) {
        onChange(clicked, null);
      } else {
        onChange(checkIn, clicked);
      }
    }
  };

  const isInRange = (day: number) => {
    if (!checkIn || !checkOut) return false;
    const d = new Date(year, month, day);
    return d > checkIn && d < checkOut;
  };

  const isSelected = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return checkIn?.getTime() === d.getTime() || checkOut?.getTime() === d.getTime();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-cream rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-olive focus-visible:outline-none"
          aria-label="Vorige maand"
        >
          <ChevronLeft size={18} className="text-muted" />
        </button>
        <span className="font-heading text-xl text-olive" aria-live="polite">{MONTHS[month]} {year}</span>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-cream rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-olive focus-visible:outline-none"
          aria-label="Volgende maand"
        >
          <ChevronRight size={18} className="text-muted" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2" role="row">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs text-muted/60 font-medium tracking-wider py-1" aria-label={d}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1" role="grid" aria-label="Beschikbaarheidskalender">
        {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} aria-hidden="true" />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);
          const unavailable = isDateUnavailable(date, unavailableRanges);
          const past = date < today;
          const disabled = unavailable || past;
          const selected = isSelected(day);
          const inRange = isInRange(day);

          return (
            <button
              key={day}
              onClick={() => !disabled && handleDayClick(day)}
              disabled={disabled}
              className={cn(
                "relative text-sm h-9 w-full rounded-lg transition-all duration-150 font-medium",
                disabled && "text-muted/30 cursor-not-allowed line-through",
                !disabled && !selected && !inRange && "hover:bg-olive/10 text-text",
                selected && "bg-olive text-cream",
                inRange && "bg-olive/10 text-olive rounded-none",
              )}
              aria-label={`${day} ${MONTHS[month]} ${year}${disabled ? " (niet beschikbaar)" : ""}`}
              aria-pressed={selected}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted/60 text-center">
        Minimum {villaSettings.minNights}-night stay
      </p>
    </div>
  );
}
