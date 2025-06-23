import { FavoritesProvider } from "@/components/favorites-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { RegisterWorker } from "./register-worker";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "101webtools",
  description: "101webtools - Free Online Tools for Developers and Designers",
  keywords: [
    "101webtools",
    "free online tools",
    "developer tools",
    "web development",
    "programming tools",
    "online utilities",
    "web tools",
    "productivity tools",
    "code generators",
    "data formatters",
    "text utilities",
    "image tools",
  ],
  authors: [
    {
      name: "101webtools",
    },
  ],
  creator: "101webtools",
  publisher: "101webtools",
  metadataBase: new URL("https://101webtools.com"),
  // openGraph: {
  //   title: "101webtools",
  //   description: "Free Online Tools for Developers and Designers",
  //   url: "https://101webtools.com",
  //   siteName: "101webtools",
  //   images: [
  //     {
  //       url: "/og-image.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "101webtools - Free Online Tools for Developers and Designers",
  //     },
  //   ],
  // },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-website-id="89b094a6-cb58-4888-9200-9969a7e1095f"
    >
      {!isDev ? (
        <Script
          async
          src="https://cloud.umami.is/script.js"
          data-website-id="89b094a6-cb58-4888-9200-9969a7e1095f"
        />
      ) : null}
      <RegisterWorker />
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased`}
        data-vaul-drawer-wrapper=""
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FavoritesProvider>{children}</FavoritesProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
