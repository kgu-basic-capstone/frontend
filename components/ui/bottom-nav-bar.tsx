"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Map, Calendar, Users, User } from "lucide-react";

export default function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "동물병원", href: "/vet-clinics", icon: Map },
    { name: "성장수첩", href: "/growth-diary", icon: Calendar },
    { name: "홈", href: "/", icon: Home },
    { name: "커뮤니티", href: "/community", icon: Users },
    { name: "내 정보", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="max-w-md mx-auto bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-2 flex-1 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <IconComponent
                  size={24}
                  className={isActive ? "text-blue-600" : "text-gray-600"}
                />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
