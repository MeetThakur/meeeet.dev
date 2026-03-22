import type { Metadata } from "next";
import { Inter, Caveat, Patrick_Hand, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick-hand",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Meet Thakur | Portfolio",
  description: "Interactive handcrafted notebook portfolio of Meet Thakur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${patrickHand.variable} ${playfair.variable} antialiased`}
    >
      <body className="font-sans min-h-screen text-slate-800 bg-notebook-paper selection:bg-highlighter-yellow/30 dark:selection:bg-neon-pink/30 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
