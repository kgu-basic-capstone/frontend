"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, ArrowLeft, Save } from "lucide-react";

export default function AddGrowthRecord() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const statusOptions = [
    "식욕 좋음",
    "식욕 부진",
    "활발함",
    "무기력함",
    "구토",
    "설사",
    "피부 문제",
    "눈 문제",
    "귀 문제",
    "기침",
  ];

  const toggleStatus = (status: string) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save the data
    console.log({ weight, note, selectedStatus });
    router.push("/growth-diary");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">성장 기록 추가</h1>
      </div>

      {/* Form */}
      <div className="flex-1 p-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              날짜
            </label>
            <div className="bg-gray-100 p-3 rounded-lg">
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Weight */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              몸무게 (kg)
            </label>
            <input
              type="number"
              id="weight"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="5.2"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상태 (해당되는 항목 모두 선택)
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => toggleStatus(status)}
                  className={`py-2 px-3 rounded-full text-sm ${
                    selectedStatus.includes(status)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사진 추가 (선택사항)
            </label>
            <button
              type="button"
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center"
            >
              <Camera size={32} className="text-gray-400 mb-2" />
              <span className="text-gray-500">
                사진 촬영 또는 갤러리에서 선택
              </span>
            </button>
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              특이사항
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="오늘의 특이사항을 기록해주세요."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <Save size={18} className="mr-2" />
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
}
