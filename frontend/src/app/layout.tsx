import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
// import AnnouncementModal from "@/components/AnnouncementModal";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  title: {
    default: "Qlokam | Learn Quantum Computing Interactively",
    template: "%s | Qlokam"
  },
  description: "Master quantum computing through interactive visualizations, circuit playgrounds, and competitive arenas. Free tutorials on qubits, superposition, quantum gates, and entanglement.",
  keywords: ["quantum computing", "learn quantum computing", "quantum gates", "qubits", "interactive quantum", "Qlokam", "quantum playground", "bloch sphere", "quantum circuit simulator"],
  authors: [{ name: "Qlokam" }],
  creator: "Qlokam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qlokam.vercel.app",
    title: "Qlokam | Learn Quantum Computing Interactively",
    description: "Master quantum computing through interactive visualizations, circuit playgrounds, and competitive arenas.",
    siteName: "Qlokam"
  },
  twitter: {
    card: "summary_large_image",
    title: "Qlokam | Learn Quantum Computing Interactively",
    description: "Master quantum computing through interactive visualizations, circuit playgrounds, and competitive arenas."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'EsyWjyCuJG8jncU03UJatjGGDAkqYFah9YVlr9h__FI',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7454305472547947"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Navigation />
        {/* <AnnouncementModal /> */}
        <main>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
