"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, Phone, Star, Check } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface VisitType {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: string;
}

export default function VetReservation() {
  const router = useRouter();

  // Mock clinic data - in real app, this would be fetched based on clinicId
  const clinic = {
    id: 1,
    name: "행복한 동물병원",
    address: "서울시 강남구 테헤란로 123",
    rating: 4.8,
    hours: "09:00 - 18:00",
    phone: "02-1234-5678",
    image: "/hospital-1.jpeg",
  };

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedVisitType, setSelectedVisitType] = useState<string>("");
  const [petName, setPetName] = useState("또리");
  const [ownerName, setOwnerName] = useState("김메디");
  const [ownerPhone, setOwnerPhone] = useState("010-1234-5678");
  const [notes, setNotes] = useState("");

  const visitTypes: VisitType[] = [
    {
      id: "checkup",
      name: "정기 검진",
      description: "건강 상태 전반적인 체크",
      duration: "30분",
      icon: "🩺",
    },
    {
      id: "vaccination",
      name: "백신 접종",
      description: "예방 접종 및 백신 관리",
      duration: "20분",
      icon: "💉",
    },
    {
      id: "sick",
      name: "질병 치료",
      description: "증상 진단 및 치료",
      duration: "45분",
      icon: "🏥",
    },
  ];

  // Generate available dates (next 14 days, excluding Sundays)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split("T")[0],
          display: date.toLocaleDateString("ko-KR", {
            month: "short",
            day: "numeric",
            weekday: "short",
          }),
          dayOfWeek: date.getDay(),
        });
      }
    }

    return dates;
  };

  // Generate time slots based on selected date
  const generateTimeSlots = (date: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const selectedDateObj = new Date(date);
    const dayOfWeek = selectedDateObj.getDay();

    // Different hours for different days
    const startHour = 9;
    const endHour = dayOfWeek === 6 ? 17 : 18; // Saturday ends at 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

        // Randomly make some slots unavailable
        const available = Math.random() > 0.3;

        slots.push({
          time: timeString,
          available,
        });
      }
    }

    return slots;
  };

  const availableDates = generateAvailableDates();
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const handleReservation = () => {
    if (!selectedDate || !selectedTime || !selectedVisitType) {
      alert("날짜, 시간, 진료 유형을 모두 선택해주세요.");
      return;
    }

    // In a real app, this would send data to the server
    const reservationData = {
      id: 1,
      date: selectedDate,
      time: selectedTime,
      visitType: selectedVisitType,
      petName,
      ownerName,
      ownerPhone,
      notes,
    };

    console.log("Reservation data:", reservationData);
    alert("예약이 완료되었습니다!");
    router.push("/");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center border-b bg-white p-4">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">예약하기</h1>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {/* Clinic Info */}
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="flex items-center">
            <Image
              src={clinic.image || "/placeholder.svg"}
              alt={clinic.name}
              width={60}
              height={60}
              className="mr-3 rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-bold">{clinic.name}</h3>
              <div className="mt-1 flex items-center">
                <MapPin size={14} className="mr-1 text-gray-500" />
                <span className="text-sm text-gray-600">{clinic.address}</span>
              </div>
              <div className="mt-1 flex items-center">
                <Phone size={14} className="mr-1 text-gray-500" />
                <span className="text-sm text-gray-600">{clinic.phone}</span>
              </div>
              <div className="mt-1 flex items-center">
                <Star size={14} className="mr-1 text-yellow-500" />
                <span className="text-sm">{clinic.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Type Selection */}
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-3 font-bold">진료 유형 선택</h3>
          <div className="space-y-3">
            {visitTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedVisitType(type.id)}
                className={`w-full rounded-lg border-2 p-3 text-left ${
                  selectedVisitType === type.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">{type.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                    <p className="text-xs text-gray-500">
                      소요시간: {type.duration}
                    </p>
                  </div>
                  {selectedVisitType === type.id && (
                    <Check size={20} className="text-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-3 font-bold">날짜 선택</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableDates.map((dateInfo) => (
              <button
                key={dateInfo.date}
                onClick={() => setSelectedDate(dateInfo.date)}
                className={`rounded-lg border p-3 text-center ${
                  selectedDate === dateInfo.date
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="text-sm font-medium">{dateInfo.display}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="mb-3 font-bold">시간 선택</h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`rounded-lg border p-2 text-sm ${
                    selectedTime === slot.time
                      ? "border-blue-500 bg-blue-50"
                      : slot.available
                        ? "border-gray-200 hover:border-gray-300"
                        : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pet and Owner Info */}
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-3 font-bold">예약자 정보</h3>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                반려동물 이름
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                보호자 이름
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                연락처
              </label>
              <input
                type="tel"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                특이사항 (선택)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="증상이나 요청사항을 입력해주세요"
              />
            </div>
          </div>
        </div>

        {/* Reservation Summary */}
        {selectedDate && selectedTime && selectedVisitType && (
          <div className="rounded-xl bg-blue-50 p-4">
            <h3 className="mb-2 font-bold text-blue-800">예약 정보 확인</h3>
            <div className="space-y-1 text-sm text-blue-700">
              <p>
                <strong>진료 유형:</strong>{" "}
                {visitTypes.find((t) => t.id === selectedVisitType)?.name}
              </p>
              <p>
                <strong>날짜:</strong>{" "}
                {new Date(selectedDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </p>
              <p>
                <strong>시간:</strong> {selectedTime}
              </p>
              <p>
                <strong>반려동물:</strong> {petName}
              </p>
            </div>
          </div>
        )}

        {/* Reserve Button */}
        <button
          onClick={handleReservation}
          disabled={!selectedDate || !selectedTime || !selectedVisitType}
          className="w-full rounded-lg bg-blue-600 py-4 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          예약 완료하기
        </button>
      </div>
    </div>
  );
}
