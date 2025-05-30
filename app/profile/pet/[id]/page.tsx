/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

export default function PetDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const petId = params.id;

  // In a real app, you would fetch this data from an API
  const [pet, setPet] = useState({
    id: petId,
    name: "멍멍이",
    breed: "말티즈",
    age: "3세",
    birthdate: "2021년 4월 15일",
    weight: "5.2kg",
    gender: "남아",
    neutered: "완료",
    microchip: "123456789012345",
    image: "/placeholder.svg?height=200&width=200",
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">반려동물 정보</h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mb-3">
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
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center">
            <Edit size={18} className="mr-2" />
            정보 수정
          </button>
          <button className="flex-1 bg-red-100 text-red-600 py-3 rounded-lg flex items-center justify-center">
            <Trash2 size={18} className="mr-2" />
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
