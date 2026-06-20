import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import TopographicBackground from "@/components/TopographicBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PLAN Bë | Transforming Ideas Into Architecture",
  description: "Contemporary architecture, interiors, and bespoke living experiences crafted with precision, purpose, and timeless design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FAFAFA] text-[#111111]">
        <TopographicBackground />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
