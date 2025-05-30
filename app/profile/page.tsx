"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  LogOut,
  Shield,
  Plus,
  Settings,
  Bell,
  HelpCircle,
  Heart,
} from "lucide-react";

export default function Profile() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "또리",
      breed: "시바견",
      age: "3세",
      image: "/dog-profile.jpeg",
    },
  ]);

  return (
    <div className="space-y-6 p-6 pt-2">
      {/* User Profile */}
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="flex items-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-blue-100">
            <Image
              src="/placeholder-user.jpg"
              alt="User"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">김메디</h2>
            <p className="text-gray-600">kimmedipet@example.com</p>
            <Link
              href="/profile/edit"
              className="mt-1 flex items-center text-sm text-point"
            >
              프로필 수정
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* My Pets */}
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">내 반려동물</h3>
          <button
            className="flex items-center text-sm text-point"
            onClick={() => {
              // In a real app, this would open a form to add a new pet
              const newPet = {
                id: pets.length + 1,
                name: `새 반려동물 ${pets.length + 1}`,
                breed: "품종을 입력하세요",
                age: "나이를 입력하세요",
                image: "/placeholder.svg?height=60&width=60",
              };
              setPets([...pets, newPet]);
            }}
          >
            <Plus size={16} className="mr-1" />
            반려동물 추가
          </button>
        </div>

        <div className="space-y-3">
          {pets.map((pet) => (
            <Link
              href={`/profile/pet/${pet.id}`}
              key={pet.id}
              className="flex items-center rounded-lg border border-gray-100 p-3 hover:bg-gray-50"
            >
              <Image
                src={pet.image || "/placeholder.svg"}
                alt={pet.name}
                width={60}
                height={60}
                className="mr-3 rounded-full border border-gray-200"
              />
              <div className="flex-1">
                <h4 className="font-medium">{pet.name}</h4>
                <p className="text-sm text-gray-600">
                  {pet.breed} • {pet.age}
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Settings & Options */}
      <div className="rounded-xl bg-white shadow">
        <div className="border-b p-4">
          <h3 className="font-bold">설정 및 정보</h3>
        </div>

        <div className="divide-y">
          <Link
            href="/profile/notifications"
            className="flex items-center p-4 hover:bg-gray-50"
          >
            <Bell size={20} className="mr-3 text-gray-600" />
            <span className="flex-1">알림 설정</span>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link
            href="/profile/settings"
            className="flex items-center p-4 hover:bg-gray-50"
          >
            <Settings size={20} className="mr-3 text-gray-600" />
            <span className="flex-1">앱 설정</span>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link
            href="/profile/favorites"
            className="flex items-center p-4 hover:bg-gray-50"
          >
            <Heart size={20} className="mr-3 text-gray-600" />
            <span className="flex-1">즐겨찾기</span>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link href="/help" className="flex items-center p-4 hover:bg-gray-50">
            <HelpCircle size={20} className="mr-3 text-gray-600" />
            <span className="flex-1">도움말</span>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link
            href="/terms"
            className="flex items-center p-4 hover:bg-gray-50"
          >
            <Shield size={20} className="mr-3 text-gray-600" />
            <span className="flex-1">이용정책</span>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <button className="flex w-full items-center p-4 text-left text-red-600 hover:bg-gray-50">
            <LogOut size={20} className="mr-3" />
            <span className="flex-1">로그아웃</span>
          </button>
        </div>
      </div>

      {/* App Version */}
      <div className="text-center text-sm text-gray-500">
        <p>메디펫 v1.0.0</p>
      </div>
    </div>
  );
}
