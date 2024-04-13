import type { Metadata } from "next";
import Head from 'next/head';
import "./globals.css";
import { Poppins } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

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
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
