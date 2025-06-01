"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Camera, Stethoscope } from "lucide-react";

export default function ImageDiagnosis() {
  const router = useRouter();

  const diagnosisOptions = [
    {
      title: "눈 건강 진단",
      description: "반려동물의 눈 사진을 업로드하여 건강 상태를 확인하세요",
      icon: Eye,
      href: "/ai-image-diagnosis",
      color: "blue",
    },
    {
      title: "피부 진단",
      description: "피부 트러블이나 이상 증상을 사진으로 진단해보세요",
      icon: Camera,
      href: "/skin-diagnosis",
      color: "green",
      comingSoon: true,
    },
    {
      title: "전체 건강 체크",
      description: "반려동물의 전체적인 모습을 통해 건강 상태를 확인하세요",
      icon: Stethoscope,
      href: "/general-diagnosis",
      color: "purple",
      comingSoon: true,
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center border-b bg-white p-4">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">이미지 분석 진단</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="mb-6 rounded-xl bg-blue-50 p-4">
            <h3 className="mb-2 font-bold text-blue-800">
              AI 이미지 분석 진단
            </h3>
            <p className="text-sm text-blue-700">
              최신 AI 기술을 활용하여 반려동물의 건강 상태를 빠르고 정확하게
              분석합니다. 진단하고 싶은 부위를 선택해주세요.
            </p>
          </div>

          {diagnosisOptions.map((option, index) => {
            const IconComponent = option.icon;
            const colorClasses = {
              blue: "bg-blue-100 text-blue-600",
              green: "bg-green-100 text-green-600",
              purple: "bg-purple-100 text-purple-600",
            };

            if (option.comingSoon) {
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-4 opacity-60 shadow"
                >
                  <div className="flex items-center">
                    <div
                      className={`h-12 w-12 rounded-full ${colorClasses[option.color as keyof typeof colorClasses]} mr-4 flex items-center justify-center`}
                    >
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-bold">{option.title}</h3>
                        <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600">
                          준비중
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={option.href}
                className="block rounded-xl bg-white p-4 shadow transition-shadow hover:shadow-md"
              >
                <div className="flex items-center">
                  <div
                    className={`h-12 w-12 rounded-full ${colorClasses[option.color as keyof typeof colorClasses]} mr-4 flex items-center justify-center`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{option.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
