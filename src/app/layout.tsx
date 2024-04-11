import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight:['400','700'],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "MP3JUICEZZZ",
  description: "a place to download your fav mp3 and mp4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
