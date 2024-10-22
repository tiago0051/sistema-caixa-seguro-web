import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Contexts } from "./contexts";
import Head from "next/head";

setDefaultOptions({ locale: ptBR });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Contexts>{children}</Contexts>
      </body>
    </html>
  );
}
