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
      image: "/icon-report.webp",
    },
    {
      id: 2,
      date: "2024-04-12",
      weight: "5.1kg",
      note: "피부에 붉은 반점이 생겨 병원 방문. 알레르기 약 처방받음.",
      image: "/icon-vaccine.webp",
    },
    {
      id: 3,
      date: "2024-04-05",
      weight: "5.0kg",
      note: "종합 백신 접종 완료. 특이사항 없음.",
      image: "/icon-vaccine.webp",
    },
    {
      id: 4,
      date: "2024-03-28",
      weight: "4.9kg",
      note: "식욕 좋음. 활동량 증가.",
      image: "/icon-report.webp",
    },
  ];

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
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
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 border-b-[1px] bg-white p-4 px-6">
        <h1 className="text-xl font-bold">성장수첩</h1>
      </div>
      <div className="space-y-6 p-6">
        <div className="flex items-center rounded-xl bg-white p-4 shadow">
          <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full">
            <Image
              src="/dog-profile.jpeg"
              alt="Pet"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">또리</h2>
            <p className="text-gray-600">3년 2개월 (37개월)</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <button onClick={prevMonth} className="p-1">
              <ChevronLeft size={20} />
            </button>
            <h3 className="font-bold">
              {currentMonth.getFullYear()}년{" "}
              {monthNames[currentMonth.getMonth()]}
            </h3>
            <button onClick={nextMonth} className="p-1">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
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
                    currentMonth.getMonth() + 1,
                  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                : "";
              const dayEvent = events.find((event) => event.date === dateStr);

              return (
                <div
                  key={index}
                  className={`flex aspect-square flex-col items-center justify-center rounded-lg text-sm ${day ? "hover:bg-gray-100" : ""} ${dayEvent ? "relative" : ""} `}
                >
                  {day && (
                    <>
                      <span>{day}</span>
                      {dayEvent && (
                        <div
                          className={`mt-1 h-1 w-6 rounded-full ${
                            dayEvent.type === "vaccine"
                              ? "bg-blue-500"
                              : dayEvent.type === "sick"
                                ? "bg-red-500"
                                : "bg-green-500"
                          } `}
                        ></div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex justify-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-blue-500"></div>
              <span>백신 접종</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-red-500"></div>
              <span>질병</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-green-500"></div>
              <span>검진</span>
            </div>
          </div>
        </div>

        {/* Growth Records */}
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
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
                  className="mr-3 rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{record.date}</span>
                    <span className="font-medium text-blue-600">
                      {record.weight}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{record.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Record Button */}
        <Link
          href="/growth-diary/add"
          className="fixed bottom-20 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg"
        >
          <Plus size={24} className="text-white" />
        </Link>
      </div>
      {/* Pet Age Info */}
    </div>
  );
}
