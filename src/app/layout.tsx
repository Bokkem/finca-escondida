import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finca Escondida — Exclusive Villa Ibiza",
  description: "An extraordinary private estate in the hills of northern Ibiza. Seven bedrooms, infinity pool, private chef. Available for exclusive hire.",
  openGraph: {
    title: "Finca Escondida — Exclusive Villa Ibiza",
    description: "An extraordinary private estate in the hills of northern Ibiza.",
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${geist.variable}`}>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
