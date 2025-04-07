import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RegisterWorker } from "./register-worker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "101webtools",
  description: "101webtools - Free Online Tools for Developers",
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

  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RegisterWorker />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-vaul-drawer-wrapper=""
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>{children}</>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
