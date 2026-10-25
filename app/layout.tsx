import type { Metadata } from "next";
import { Montserrat, Boldonse, Indie_Flower } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

const boldonse = Boldonse({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-boldonse",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-indie-flower",
});

const title = "UNION Tormannschule Weinviertel";
const description =
  "Professionelles Tormanntraining für Kinder, Jugendliche und Erwachsene im Weinviertel. Individuelles Training und Tormanncamps – in Form fürs Leben.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tormannschuleweinviertel.at"),

  title: {
    default: title,
    template: "%s | UNION Tormannschule Weinviertel",
  },

  description,

  openGraph: {
    title,
    description,
    siteName: title,
    locale: "de_AT",
    type: "website",
    // Изображение подключается из app/opengraph-image.png.
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased scroll-smooth">
      <body
        className={`${montserrat.variable} ${boldonse.variable} ${indieFlower.variable} min-h-full flex flex-col`}
      >
        {children}
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}