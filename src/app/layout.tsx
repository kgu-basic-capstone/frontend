import type { Metadata } from "next";
import "./globals.css";
import "./font.css";

export const metadata: Metadata = {
  title: "MediPet",
  description: "반려동물 건강 관리를 간편하게!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-gray-50">{children}</body>
    </html>
  );
}
