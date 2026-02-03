import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POSSIBLE - AI 3D Printing | Impresión 3D con IA",
  description: "Toma tu idea y dale forma. AI-powered 3D printing service. Diseño, Modelado, Prototipado Rápido y Impresión 3D en Guadalajara, México.",
  keywords: ["3D printing", "AI", "impresión 3D", "prototipado rápido", "Guadalajara", "México", "diseño industrial", "CNC", "láser"],
  openGraph: {
    title: "POSSIBLE - Take Your IDEAS Seriously",
    description: "AI-powered 3D printing. From concept to physical reality. Guadalajara, México.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
