import type { Metadata } from "next";
import Script from "next/script";
import { Anton, Libre_Caslon_Text, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { META_PIXEL_ID } from "../lib/metaPixel";
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
  title: "Roots — Film Lab, Amsterdam",
  description:
    "Roots is a mail-in film lab based in Amsterdam. Develop, scan, and print 35mm, 120 and large format film — order online, drop off, or post it in.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serifItalic.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-stage">
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
