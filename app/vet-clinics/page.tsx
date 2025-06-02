"use client";

import { useState } from "react";
import { Map, List, Star, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import MapView from "@/components/ui/map";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
      image: "/hospital-1.jpeg",
    },
    {
      id: 2,
      name: "사랑동물병원",
      address: "서울시 강남구 역삼로 456",
      rating: 4.5,
      hours: "10:00 - 19:00",
      distance: "1.2km",
      image: "/hospital-2.jpeg",
    },
    {
      id: 3,
      name: "건강한 펫 클리닉",
      address: "서울시 강남구 선릉로 789",
      rating: 4.7,
      hours: "09:30 - 20:00",
      distance: "1.8km",
      image: "/hospital-3.jpeg",
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b-[1px] bg-white p-4 px-6">
        <h1 className="text-xl font-bold">주변 동물병원</h1>
      </div>
      <div className="border-b bg-white p-6">
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            className={`flex flex-1 items-center justify-center rounded-md py-2 ${
              viewMode === "map" ? "bg-white shadow" : ""
            }`}
            onClick={() => setViewMode("map")}
          >
            <Map size={18} className="mr-1" />
            <span>지도</span>
          </button>
          <button
            className={`flex flex-1 items-center justify-center rounded-md py-2 ${
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
          <MapView />
        ) : (
          <div className="space-y-4 p-4">
            {clinics.map((clinic, index) => (
              <div
                key={clinic.id}
                className={cn(
                  index === clinics.length - 1 && "mb-4",
                  "rounded-xl bg-white p-4 shadow",
                )}
              >
                <div className="flex">
                  <Image
                    src={clinic.image || "/placeholder.svg"}
                    alt={clinic.name}
                    width={90}
                    height={60}
                    className="mr-3 rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{clinic.name}</h3>
                      <span className="text-sm text-gray-500">
                        {clinic.distance}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {clinic.address}
                    </p>
                    <div className="mt-1 flex items-center">
                      <Star size={14} className="mr-1 text-yellow-500" />
                      <span className="text-sm">{clinic.rating}</span>
                    </div>
                    <div className="mt-1 flex items-center">
                      <Clock size={14} className="mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {clinic.hours}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/vet-clinics/${clinic.id}/reservation`}
                  className="mt-3 flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 text-white"
                >
                  <Calendar size={16} className="mr-1" />
                  예약하기
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
