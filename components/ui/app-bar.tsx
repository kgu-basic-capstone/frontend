import Link from "next/link";

export default function AppBar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="px-4 py-3 flex items-center justify-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          메디펫
        </Link>
      </div>
    </header>
  );
}
