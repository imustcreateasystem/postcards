import type { Metadata } from "next";
import "@/ui/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants/brand";
import { ReactNode } from "react";
import { sansSerifFont } from "@/ui/styles/fonts/fonts";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${sansSerifFont.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
