import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/ui/app-bar";
import BottomNavBar from "@/components/ui/bottom-nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "메디펫 - Pet Health Tracker",
  description: "Track and manage your pet's health",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
          <AppBar />
          <main className="flex-1 overflow-y-auto pb-16">{children}</main>
          <BottomNavBar />
        </div>
      </body>
    </html>
  );
}
