"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Camera,
  Upload,
  Eye,
  AlertCircle,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

interface DiagnosisResult {
  status: "sick" | "healthy";
  confidence: number;
  details: string;
  recommendations: string[];
}

export default function AIDiagnosis() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] =
    useState<DiagnosisResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDiagnosisResult(null); // Reset previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    // Simulate AI analysis with a delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate random diagnosis result
    const isHealthy = Math.random() > 0.3; // 70% chance of being healthy

    const result: DiagnosisResult = isHealthy
      ? {
          status: "healthy",
          confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
          details:
            "반려동물의 눈 상태가 정상적으로 보입니다. 눈의 투명도와 색상이 건강한 상태를 나타내고 있습니다.",
          recommendations: [
            "정기적인 눈 청소를 계속해주세요",
            "깨끗한 물과 균형잡힌 식단을 유지해주세요",
            "6개월마다 정기 검진을 받아보세요",
          ],
        }
      : {
          status: "sick",
          confidence: Math.floor(Math.random() * 20) + 75, // 75-94%
          details:
            "반려동물의 눈에 이상 징후가 감지되었습니다. 염증, 분비물, 또는 기타 문제의 가능성이 있습니다.",
          recommendations: [
            "가까운 동물병원에서 정확한 진단을 받아보세요",
            "눈을 만지거나 비비지 않도록 주의해주세요",
            "깨끗한 거즈로 눈 주변을 부드럽게 닦아주세요",
            "증상이 악화되면 즉시 병원에 방문하세요",
          ],
        };

    setDiagnosisResult(result);
    setIsAnalyzing(false);
  };

  const resetDiagnosis = () => {
    setSelectedImage(null);
    setDiagnosisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center border-b bg-white p-4">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">AI 눈 건강 진단</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {!selectedImage && !diagnosisResult && (
          <div className="space-y-6">
            {/* Instructions */}
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="mb-2 flex items-center">
                <Eye className="mr-2 text-blue-600" size={20} />
                <h3 className="font-bold text-blue-800">진단 안내</h3>
              </div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 반려동물의 눈을 정면에서 촬영해주세요</li>
                <li>• 밝은 곳에서 선명하게 찍어주세요</li>
                <li>• 눈 전체가 잘 보이도록 촬영해주세요</li>
                <li>• 플래시는 사용하지 마세요</li>
              </ul>
            </div>

            {/* Upload Area */}
            <div className="rounded-xl bg-white p-6 shadow">
              <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
                <div className="flex flex-col items-center">
                  <Camera size={48} className="mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium">
                    반려동물 눈 사진 업로드
                  </h3>
                  <p className="mb-4 text-gray-500">
                    카메라로 촬영하거나 갤러리에서 선택하세요
                  </p>

                  <label className="flex cursor-pointer items-center rounded-lg bg-blue-600 px-6 py-3 text-white">
                    <Upload size={18} className="mr-2" />
                    사진 선택하기
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl bg-yellow-50 p-4">
              <div className="flex items-start">
                <AlertCircle
                  className="mr-2 mt-0.5 text-yellow-600"
                  size={16}
                />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>주의사항:</strong> 이 AI 진단은 참고용이며, 정확한
                    진단을 위해서는 반드시 수의사의 진료를 받으시기 바랍니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedImage && !diagnosisResult && !isAnalyzing && (
          <div className="space-y-6">
            {/* Uploaded Image */}
            <div className="rounded-xl bg-white p-4 shadow">
              <h3 className="mb-3 font-bold">업로드된 이미지</h3>
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Pet eye"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={analyzeImage}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-4 font-medium text-white"
              >
                <Eye size={20} className="mr-2" />
                AI 진단 시작하기
              </button>

              <button
                onClick={resetDiagnosis}
                className="flex w-full items-center justify-center rounded-lg bg-gray-100 py-3 font-medium text-gray-700"
              >
                <RotateCcw size={18} className="mr-2" />
                다시 촬영하기
              </button>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <h3 className="text-lg font-medium">
              AI가 이미지를 분석하고 있습니다...
            </h3>
            <p className="text-center text-gray-500">
              잠시만 기다려주세요. 분석이 완료되면 결과를 보여드립니다.
            </p>
          </div>
        )}

        {diagnosisResult && (
          <div className="space-y-6">
            {/* Uploaded Image */}
            <div className="rounded-xl bg-white p-4 shadow">
              <h3 className="mb-3 font-bold">분석된 이미지</h3>
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedImage! || "/placeholder.svg"}
                  alt="Pet eye"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Diagnosis Result */}
            <div
              className={`rounded-xl p-4 shadow ${diagnosisResult.status === "healthy" ? "bg-green-50" : "bg-red-50"}`}
            >
              <div className="mb-3 flex items-center">
                {diagnosisResult.status === "healthy" ? (
                  <CheckCircle className="mr-2 text-green-600" size={24} />
                ) : (
                  <AlertCircle className="mr-2 text-red-600" size={24} />
                )}
                <h3
                  className={`text-xl font-bold ${
                    diagnosisResult.status === "healthy"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {diagnosisResult.status === "healthy"
                    ? "건강한 상태입니다"
                    : "이상 징후가 감지되었습니다"}
                </h3>
              </div>

              <div className="mb-3">
                <span
                  className={`text-sm ${diagnosisResult.status === "healthy" ? "text-green-700" : "text-red-700"}`}
                >
                  신뢰도: {diagnosisResult.confidence}%
                </span>
              </div>

              <p
                className={`mb-4 ${diagnosisResult.status === "healthy" ? "text-green-800" : "text-red-800"}`}
              >
                {diagnosisResult.details}
              </p>

              <div>
                <h4
                  className={`mb-2 font-medium ${
                    diagnosisResult.status === "healthy"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  권장사항:
                </h4>
                <ul
                  className={`space-y-1 ${diagnosisResult.status === "healthy" ? "text-green-700" : "text-red-700"}`}
                >
                  {diagnosisResult.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {diagnosisResult.status === "sick" && (
                <button
                  onClick={() => router.push("/vet-clinics")}
                  className="w-full rounded-lg bg-red-600 py-4 font-medium text-white"
                >
                  주변 동물병원 찾기
                </button>
              )}

              <button
                onClick={resetDiagnosis}
                className="flex w-full items-center justify-center rounded-lg bg-gray-100 py-3 font-medium text-gray-700"
              >
                <RotateCcw size={18} className="mr-2" />
                새로운 진단하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
