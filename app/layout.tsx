import {ReactNode} from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mandados — Hacemos que suceda",
  description:
    "Mandados: entregas y mandados rápidos, confiables y personalizados en Costa Rica. Pedí ahora, fácil y transparente.",
  openGraph: {
    title: "Mandados — Hacemos que suceda",
    description:
      "Mandados: entregas y mandados rápidos, confiables y personalizados en Costa Rica.",
    images: ["/logos/stacked-with-tagline.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
