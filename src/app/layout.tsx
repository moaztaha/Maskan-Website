import type { ReactNode } from "react";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(inter.variable, geist.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
