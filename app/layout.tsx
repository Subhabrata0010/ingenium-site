import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/NavBar/Navbar";
import FooterIndex from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ingenium 4.O",
  description: "Thoughts, Stories, Ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#9333ea"
          initialPosition={0.08}
          height={6}
          crawl={true}
          showSpinner={false} />


        <Navbar />

        <div className="min-h-screen w-full md:w-11/12 mx-auto px-1 sm:px-4">
          {children}

        </div>

        <FooterIndex />      </body>
    </html>
  );
}
