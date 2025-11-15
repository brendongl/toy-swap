import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ToySwap - Swap Toys Locally",
  description: "Swipe. Match. Swap. The app that helps parents exchange toys locally, for free.",
  keywords: ["toy swap", "toy exchange", "parent community", "kids toys", "District 2", "HCMC"],
  authors: [{ name: "ToySwap Team" }],
  openGraph: {
    title: "ToySwap - Swap Toys Locally",
    description: "Swipe. Match. Swap. Exchange toys with parents in your neighborhood.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
