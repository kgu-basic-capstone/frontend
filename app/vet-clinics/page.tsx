"use client";

import { useState } from "react";
import { Map, List, Star, Clock, Calendar } from "lucide-react";
import Image from "next/image";

export default function VetClinics() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const clinics = [
    {
      id: 1,
      name: "행복한 동물병원",
      address: "서울시 강남구 테헤란로 123",
      rating: 4.8,
      hours: "09:00 - 18:00",
      distance: "0.5km",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "사랑동물병원",
      address: "서울시 강남구 역삼로 456",
      rating: 4.5,
      hours: "10:00 - 19:00",
      distance: "1.2km",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "건강한 펫 클리닉",
      address: "서울시 강남구 선릉로 789",
      rating: 4.7,
      hours: "09:30 - 20:00",
      distance: "1.8km",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-bold">주변 동물병원</h1>

        <div className="flex mt-4 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 rounded-md flex justify-center items-center ${
              viewMode === "map" ? "bg-white shadow" : ""
            }`}
            onClick={() => setViewMode("map")}
          >
            <Map size={18} className="mr-1" />
            <span>지도</span>
          </button>
          <button
            className={`flex-1 py-2 rounded-md flex justify-center items-center ${
              viewMode === "list" ? "bg-white shadow" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <List size={18} className="mr-1" />
            <span>목록</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {viewMode === "map" ? (
          <div className="h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center p-4">
              <Map size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">
                지도에서 주변 동물병원을 확인하세요
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {clinics.map((clinic) => (
              <div key={clinic.id} className="bg-white rounded-xl shadow p-4">
                <div className="flex">
                  <Image
                    src={clinic.image || "/placeholder.svg"}
                    alt={clinic.name}
                    width={60}
                    height={60}
                    className="rounded-lg mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{clinic.name}</h3>
                      <span className="text-sm text-gray-500">
                        {clinic.distance}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {clinic.address}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span className="text-sm">{clinic.rating}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock size={14} className="text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {clinic.hours}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center">
                  <Calendar size={16} className="mr-1" />
                  예약하기
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
