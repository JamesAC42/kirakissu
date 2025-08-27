import type { Metadata } from "next";
import "./globals.css";
import { 
  absoluteBeauty, 
  adelia, 
  checkpoint, 
  cuteNotes, 
  missFajardose, 
  nunito, 
  starborn,
  notoSansJP,
  pixelMix
} from "@/styles/fonts";

export const metadata: Metadata = {
  title: "KiraKissu",
  description: "KiraKissu",
};

const fonts = [
  cuteNotes, 
  absoluteBeauty, 
  missFajardose, 
  nunito, 
  adelia, 
  checkpoint, 
  starborn,
  notoSansJP,
  pixelMix
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = fonts.map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fontClasses}>
      <body>
        {children}
      </body>
    </html>
  );
}
