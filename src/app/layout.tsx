import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import { BackToTop } from "../components/BackToTop";
import { LoadingScreen } from "../components/LoadingScreen";
import { Cursor } from "../components/Cursor";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meeeet.dev"),
  title: "Meet Thakur | Software Developer Portfolio",
  description:
    "Meet Thakur — software engineer and competitive programmer building LLM-powered systems, data pipelines and full-stack products.",
  openGraph: {
    title: "Meet Thakur | Software Developer",
    description: "LLM-powered systems, data pipelines and full-stack products. Projects, experience and contact.",
    url: "https://meeeet.dev",
    siteName: "Meet Thakur Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Thakur | Software Developer",
    description: "LLM-powered systems, data pipelines and full-stack products. Projects, experience and contact.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a09" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="grain font-sans min-h-screen bg-bg text-fg">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[210] focus:px-4 focus:py-2 focus:rounded-full focus:bg-fg focus:text-bg font-medium"
          >
            Skip to content
          </a>
          <LoadingScreen />
          <Cursor />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
