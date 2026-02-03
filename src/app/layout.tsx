import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "POSSIBLE - Impresión 3D con IA | Toma Tus Ideas En Serio",
  description: "Tomamos tu idea y le damos forma. Servicio de impresión 3D impulsado por IA. Diseño Industrial, Modelado 3D, Prototipado Rápido e Impresión 3D en Guadalajara, México.",
  keywords: ["impresión 3D", "IA", "inteligencia artificial", "prototipado rápido", "Guadalajara", "México", "diseño industrial", "CNC", "corte láser", "modelado 3D"],
  openGraph: {
    title: "POSSIBLE - Toma Tus Ideas En Serio",
    description: "Impresión 3D impulsada por IA. Del concepto a la realidad física. Guadalajara, México.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
