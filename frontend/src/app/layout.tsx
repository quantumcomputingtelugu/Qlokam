import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AnnouncementModal from "@/components/AnnouncementModal";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  title: "Qlokam | Quantum Computing Arena",
  description: "Learn, compete, and execute quantum circuits.",
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
        <AnnouncementModal />
        <main>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
