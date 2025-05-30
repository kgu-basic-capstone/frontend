"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GrowthDiary() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sample data for calendar events
  const events = [
    { date: "2024-04-05", type: "vaccine", title: "종합 백신 접종" },
    { date: "2024-04-12", type: "sick", title: "피부 알레르기" },
    { date: "2024-04-20", type: "checkup", title: "정기 검진" },
  ];

  // Sample growth records
  const growthRecords = [
    {
      id: 1,
      date: "2024-04-20",
      weight: "5.2kg",
      note: "정기 검진 결과 건강 상태 양호. 피부 상태 호전됨.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      date: "2024-04-12",
      weight: "5.1kg",
      note: "피부에 붉은 반점이 생겨 병원 방문. 알레르기 약 처방받음.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      date: "2024-04-05",
      weight: "5.0kg",
      note: "종합 백신 접종 완료. 특이사항 없음.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      date: "2024-03-28",
      weight: "4.9kg",
      note: "식욕 좋음. 활동량 증가.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = generateCalendarDays();
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="p-4 space-y-6">
      {/* Pet Age Info */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Pet"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold">멍멍이</h2>
          <p className="text-gray-600">3년 2개월 (37개월)</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-1">
            <ChevronLeft size={20} />
          </button>
          <h3 className="font-bold">
            {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
          </h3>
          <button onClick={nextMonth} className="p-1">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            // Check if this day has an event
            const dateStr = day
              ? `${currentMonth.getFullYear()}-${String(
                  currentMonth.getMonth() + 1
                ).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              : "";
            const dayEvent = events.find((event) => event.date === dateStr);

            return (
              <div
                key={index}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm
                  ${day ? "hover:bg-gray-100" : ""}
                  ${dayEvent ? "relative" : ""}
                `}
              >
                {day && (
                  <>
                    <span>{day}</span>
                    {dayEvent && (
                      <div
                        className={`w-6 h-1 mt-1 rounded-full
                          ${
                            dayEvent.type === "vaccine"
                              ? "bg-blue-500"
                              : dayEvent.type === "sick"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }
                        `}
                      ></div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-3 space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span>백신 접종</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span>질병</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>검진</span>
          </div>
        </div>
      </div>

      {/* Growth Records */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">최근 성장 기록</h3>
          <Link href="/growth-diary/all" className="text-sm text-blue-600">
            전체보기
          </Link>
        </div>

        <div className="space-y-3">
          {growthRecords.map((record) => (
            <div
              key={record.id}
              className="flex border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <Image
                src={record.image || "/placeholder.svg"}
                alt="Growth record"
                width={60}
                height={60}
                className="rounded-lg mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{record.date}</span>
                  <span className="text-blue-600 font-medium">
                    {record.weight}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{record.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Record Button */}
      <Link
        href="/growth-diary/add"
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
      >
        <Plus size={24} className="text-white" />
      </Link>
    </div>
  );
}
