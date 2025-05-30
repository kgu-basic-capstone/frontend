import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Camera, Syringe } from "lucide-react";

export default function Home() {
  return (
    <div className="p-4 space-y-6">
      {/* Pet Info Card */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Pet"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">멍멍이</h2>
            <p className="text-gray-600">말티즈 • 3세 • 5.2kg</p>
            <div className="mt-1 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm text-green-600">건강 상태 양호</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis Options */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/ai-diagnosis"
          className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center text-center"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <MessageSquare className="text-blue-600" size={24} />
          </div>
          <h3 className="font-medium">AI 챗봇 진단</h3>
          <p className="text-xs text-gray-500 mt-1">증상을 입력하여 진단받기</p>
        </Link>

        <Link
          href="/image-diagnosis"
          className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center text-center"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <Camera className="text-blue-600" size={24} />
          </div>
          <h3 className="font-medium">이미지 분석 진단</h3>
          <p className="text-xs text-gray-500 mt-1">사진으로 질병 진단하기</p>
        </Link>
      </div>

      {/* Vaccination History */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">백신 접종 내역</h3>
          <Link href="/vaccinations" className="text-sm text-blue-600">
            더보기
          </Link>
        </div>

        <div className="space-y-3">
          {[
            { name: "종합 백신", date: "2023-12-15", next: "2024-06-15" },
            { name: "광견병 백신", date: "2024-01-10", next: "2025-01-10" },
          ].map((vaccine, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Syringe className="text-blue-600" size={16} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{vaccine.name}</h4>
                <p className="text-xs text-gray-500">접종일: {vaccine.date}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">다음 접종</span>
                <p className="text-sm font-medium">{vaccine.next}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
