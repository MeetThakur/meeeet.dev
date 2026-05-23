import type { Metadata } from "next";
import { Inter, Caveat, Patrick_Hand, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import { BackToTop } from "../components/BackToTop";
import { LoadingScreen } from "../components/LoadingScreen";
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
  title: "Meet Thakur | Software Developer Portfolio",
  description: "Interactive handcrafted notebook portfolio of Meet Thakur, a Software Developer and Competitive Programmer.",
  openGraph: {
    title: "Meet Thakur | Software Developer",
    description: "Explore my handcrafted notebook portfolio, projects, and skills.",
    url: "https://meetthakur.dev",
    siteName: "Meet Thakur Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Meet Thakur Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Thakur | Software Developer",
    description: "Explore my handcrafted notebook portfolio, projects, and skills.",
    images: ["/og-image.png"],
  },
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
      suppressHydrationWarning
    >
      <body className="font-sans min-h-screen text-ink-dark dark:text-ink-light selection:bg-highlighter-yellow/30 dark:selection:bg-neon-pink/30 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingScreen />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
