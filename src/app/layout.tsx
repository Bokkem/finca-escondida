import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Preloader from "@/components/ui/Preloader";

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
  metadataBase: new URL("https://finca-escondida.vercel.app"),
  title: "Finca Escondida | Exclusive Villa Hire in Ibiza",
  description: "Finca Escondida is an extraordinary private estate in the hills of northern Ibiza. Seven bedrooms, a 22-metre infinity pool and a private chef. Available for exclusive hire year-round.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Finca Escondida | Exclusive Villa Hire in Ibiza",
    description: "An extraordinary private estate in the hills of northern Ibiza. Seven bedrooms, infinity pool, private chef. Available for exclusive hire.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Finca Escondida, exclusive luxury villa for hire in the hills of northern Ibiza",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${geist.variable}`}>
      <body>
        <Preloader />
        <CustomCursor />
        <GrainOverlay />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
