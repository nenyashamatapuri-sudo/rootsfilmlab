import type { Metadata } from "next";
import { Anton, Libre_Caslon_Text, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const sans = Libre_Caslon_Text({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const serifItalic = Instrument_Serif({
  variable: "--font-serif-italic",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Griot — Film Lab, Amsterdam",
  description:
    "Griot is a mail-in film lab based in Amsterdam. Develop, scan, and print 35mm, 120 and large format film — order online, track every roll.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serifItalic.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-stage">{children}</body>
    </html>
  );
}
