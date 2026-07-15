import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MDB",
  description: "Secure Decryption Protocol. Verification required.",
  openGraph: {
    title: "MDB",
    description: "Secure Decryption Protocol. Verification required.",
    type: "website",
    images: [
      {
        url: "/share_card.jpg",
        width: 1200,
        height: 630,
        alt: "MDB Secure Protocol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MDB",
    description: "Secure Decryption Protocol. Verification required.",
    images: ["/share_card.jpg"],
  },
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
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-white text-black font-sans selection:bg-accent selection:text-black">
        {children}
      </body>
    </html>
  );
}
