import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";

import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["400", "700", "800"], variable: '--font-syne' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Bhavya Rathore | Layoutory",
  description: "Helping detailers grow with high-converting websites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable} bg-brand-dark text-white antialiased`}>
        {/* Wrap everything here so the smooth scroll applies to the whole body */}

          {children}

      </body>
    </html>
  );
}