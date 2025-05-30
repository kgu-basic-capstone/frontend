import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Camera, Syringe } from "lucide-react";
import { PET } from "@/mock/user";

export default function Home() {
  const { name, breed, age, weight, image } = PET;

  return (
    <div className="flex flex-col gap-2 overflow-scroll pb-4">
      <div className="flex flex-col justify-start gap-3 bg-point p-6 pt-2">
        <p className="text-xl font-medium text-white">
          오늘, <span className="font-bold">{name}</span>의 상태는 어떤가요?
        </p>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="flex items-center space-x-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={image}
                alt="Pet"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-gray-600">
                {breed} • {age} • {weight}
              </p>
              <div className="mt-1 flex items-center">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-green-600">건강 상태 양호</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/ai-diagnosis"
            className="z-10 flex flex-col items-center justify-center rounded-xl bg-white p-4 text-center shadow"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <MessageSquare className="text-point" size={24} />
            </div>
            <p className="font-semibold">AI 챗봇 진단</p>
            <p className="mt-1 text-xs text-gray-500">
              증상을 입력하여 진단받기
            </p>
          </Link>
          <Link
            href="/image-diagnosis"
            className="z-10 flex flex-col items-center justify-center rounded-xl bg-white p-4 text-center shadow"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Camera className="text-point" size={24} />
            </div>
            <p className="font-semibold">이미지 분석 진단</p>
            <p className="mt-1 text-xs text-gray-500">사진으로 질병 진단하기</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium">
            <span className="font-bold">{name}</span>의 백신 접종 내역
          </div>
          <Link href="/vaccinations" className="text-sm text-point">
            더보기
          </Link>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="space-y-3">
            {[
              { name: "종합 백신", date: "2023-12-15", next: "2024-06-15" },
              { name: "광견병 백신", date: "2024-01-10", next: "2025-01-10" },
              { name: "켄넬코프 백신", date: "2024-02-05", next: "2024-08-05" },
              {
                name: "코로나 장염 백신",
                date: "2023-11-20",
                next: "2024-05-20",
              },
            ].map((vaccine, index) => (
              <div
                key={index}
                className="flex items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0"
              >
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Syringe className="text-point" size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{vaccine.name}</h4>
                  <p className="text-xs text-gray-500">
                    접종일: {vaccine.date}
                  </p>
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
    </div>
  );
}
