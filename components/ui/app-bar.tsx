"use client";

import { cn } from "@/lib/utils";
import type { NextFont } from "next/dist/compiled/@next/font";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppBar({ font }: { font: NextFont }) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-20 bg-point",
        pathname === "/" ? "bg-point" : "bg-white",
        pathname === "/" || (pathname === "/profile" ? "" : "hidden"),
        font.className,
      )}
    >
      <div className="flex items-center px-6 py-4">
        <Link
          href="/"
          className={cn(
            "text-xl font-bold",
            pathname === "/" ? "text-white" : "text-point",
          )}
        >
          MediPet
        </Link>
      </div>
    </header>
  );
}
