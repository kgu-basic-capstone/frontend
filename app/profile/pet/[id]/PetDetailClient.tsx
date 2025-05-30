"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

interface PetDetailClientProps {
  id: string;
}

export default function PetDetailClient({ id }: PetDetailClientProps) {
  const router = useRouter();

  // In a real app, you would fetch this data from an API
  const pet = {
    id: id,
    name: "또리",
    breed: "시바견",
    age: "3세",
    birthdate: "2021년 4월 15일",
    weight: "5.2kg",
    gender: "남아",
    neutered: "완료",
    microchip: "123456789012345",
    image: "/dog-profile.jpeg",
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white p-6">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">반려동물 정보</h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6 rounded-xl bg-white p-4 shadow">
          <div className="mb-4 flex flex-col items-center">
            <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100">
              <Image
                src={pet.image || "/placeholder.svg"}
                alt={pet.name}
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold">{pet.name}</h2>
            <p className="text-gray-600">{pet.breed}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">나이</span>
              <span className="font-medium">{pet.age}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">생년월일</span>
              <span className="font-medium">{pet.birthdate}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">몸무게</span>
              <span className="font-medium">{pet.weight}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">성별</span>
              <span className="font-medium">{pet.gender}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">중성화</span>
              <span className="font-medium">{pet.neutered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">마이크로칩</span>
              <span className="font-medium">{pet.microchip}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 py-3 text-white">
            <Edit size={18} className="mr-2" />
            정보 수정
          </button>
          <button className="flex flex-1 items-center justify-center rounded-lg bg-red-100 py-3 text-red-600">
            <Trash2 size={18} className="mr-2" />
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
