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
  pixelMix,
  chalktastic,
  chewy,
  sourGummy
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
  pixelMix,
  chalktastic,
  chewy,
  sourGummy
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
        <script defer src="https://umami.ovel.sh/script.js" data-website-id="2ee8b458-39d7-4cc4-ae04-a92b42124cbb"></script>
        {children}
      </body>
    </html>
  );
}
