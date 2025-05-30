import { cn } from "@/lib/utils";
import type { NextFont } from "next/dist/compiled/@next/font";
import Link from "next/link";

export default function AppBar({ font }: { font: NextFont }) {
  return (
    <header className={cn("bg-white sticky top-0 z-20", font.className)}>
      <div className="px-4 py-3 flex items-center ">
        <Link href="/" className="text-xl font-bold text-point">
          MediPet
        </Link>
      </div>
    </header>
  );
}
