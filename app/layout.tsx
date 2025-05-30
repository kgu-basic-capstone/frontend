import type React from "react";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/ui/app-bar";
import BottomNavBar from "@/components/ui/bottom-nav-bar";

export const metadata: Metadata = {
  title: "MediPet",
  description: "반려동물 건강관리를 한번에, 메디펫!",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const sora = Sora({
  weight: "800",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto flex h-screen max-w-md flex-col bg-white">
          <AppBar font={sora} />
          <main className="flex-1 overflow-y-auto pb-[77px]">{children}</main>
          <BottomNavBar />
        </div>
      </body>
    </html>
  );
}
