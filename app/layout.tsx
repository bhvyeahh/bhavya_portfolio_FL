import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";

import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["400", "700", "800"], variable: '--font-syne' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  // 1. ADD THIS LINE BELOW 👇
  // Replace 'https://layoutory.com' with your actual deployed domain.
  // If you are on localhost, this warning is harmless, but you need this for production.
  metadataBase: new URL("https://layoutory.in"), 

  title: "Bhavya Rathore | Layoutory",
  description: "Helping detailers grow with high-converting websites.",
  
  openGraph: {
    title: "Bhavya Rathore | Layoutory",
    description: "Helping detailers grow with high-converting websites.",
    siteName: "Layoutory",
    images: [
      {
        url: "/logo.png", // Next.js will now combine metadataBase + this path
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Bhavya Rathore | Layoutory",
    description: "Helping detailers grow with high-converting websites.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable} bg-brand-dark text-white antialiased`}>
          {children}
      </body>
    </html>
  );
}