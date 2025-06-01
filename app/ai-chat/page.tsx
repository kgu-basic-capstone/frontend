"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AIChatDiagnosis() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! 저는 메디펫 AI 수의사 어시스턴트입니다. 🐕🐱\n\n반려동물의 증상이나 건강 상태에 대해 궁금한 점이 있으시면 언제든 말씀해 주세요. 최대한 도움을 드리겠습니다.\n\n어떤 증상이 걱정되시나요?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Symptom-based responses
    if (lowerMessage.includes("구토") || lowerMessage.includes("토")) {
      return "구토 증상이 있으시군요. 몇 가지 질문을 드릴게요:\n\n• 언제부터 구토를 시작했나요?\n• 하루에 몇 번 정도 구토하나요?\n• 구토물에 혈액이나 이상한 색깔이 보이나요?\n• 평소와 다르게 먹지 않거나 물을 마시지 않나요?\n\n구토가 지속되거나 혈액이 섞여 있다면 즉시 병원 방문을 권합니다.";
    }

    if (lowerMessage.includes("설사") || lowerMessage.includes("변")) {
      return "설사 증상에 대해 알려주셨네요. 다음 사항들을 확인해 주세요:\n\n• 설사가 시작된 시기는 언제인가요?\n• 변의 색깔이나 냄새에 특이사항이 있나요?\n• 혈액이나 점액이 섞여 있나요?\n• 최근에 새로운 음식을 먹였나요?\n\n탈수 방지를 위해 충분한 수분 공급이 중요하며, 증상이 2일 이상 지속되면 병원 진료를 받으시기 바랍니다.";
    }

    if (lowerMessage.includes("기침") || lowerMessage.includes("켁켁")) {
      return "기침 증상이 있으시군요. 기침의 원인을 파악하기 위해 몇 가지 확인해 주세요:\n\n• 마른 기침인가요, 가래가 있는 기침인가요?\n• 기침할 때 '켁켁' 소리가 나나요?\n• 운동 후에 더 심해지나요?\n• 목에 무언가 걸린 것처럼 행동하나요?\n\n지속적인 기침은 심장 질환이나 호흡기 감염의 신호일 수 있으니 수의사 진료를 권합니다.";
    }

    if (
      lowerMessage.includes("눈") ||
      lowerMessage.includes("눈물") ||
      lowerMessage.includes("충혈")
    ) {
      return "눈 관련 증상이 있으시군요. 다음 사항들을 체크해 주세요:\n\n• 눈물이 평소보다 많이 나나요?\n• 눈이 빨갛게 충혈되어 있나요?\n• 눈곱이나 분비물이 있나요?\n• 눈을 자주 비비거나 깜빡이나요?\n\n눈 주변을 깨끗한 거즈로 부드럽게 닦아주시고, 증상이 지속되면 안과 검진을 받아보세요.";
    }

    if (
      lowerMessage.includes("귀") ||
      lowerMessage.includes("냄새") ||
      lowerMessage.includes("긁")
    ) {
      return "귀 관련 문제가 있으시군요. 다음을 확인해 주세요:\n\n• 귀에서 냄새가 나나요?\n• 귀를 자주 긁거나 머리를 흔드나요?\n• 귀 안쪽이 빨갛거나 부어있나요?\n• 분비물이나 귀지가 많이 나오나요?\n\n귀 감염은 빠른 치료가 중요하니 증상이 있다면 병원 방문을 권합니다.";
    }

    if (
      lowerMessage.includes("식욕") ||
      lowerMessage.includes("안 먹") ||
      lowerMessage.includes("밥")
    ) {
      return "식욕 부진이 걱정되시는군요. 다음 사항들을 확인해 주세요:\n\n• 언제부터 식욕이 떨어졌나요?\n• 물은 평소처럼 마시나요?\n• 좋아하는 간식도 거부하나요?\n• 다른 증상(구토, 설사 등)은 없나요?\n\n2일 이상 식욕 부진이 지속되면 탈수나 저혈당 위험이 있으니 병원 진료를 받으시기 바랍니다.";
    }

    if (
      lowerMessage.includes("피부") ||
      lowerMessage.includes("가려") ||
      lowerMessage.includes("털")
    ) {
      return "피부 문제가 있으시군요. 다음을 체크해 주세요:\n\n• 특정 부위를 자주 긁거나 핥나요?\n• 피부에 발진이나 상처가 있나요?\n• 털이 빠지는 부위가 있나요?\n• ��부가 빨갛게 되거나 부어있나요?\n\n알레르기나 피부염 가능성이 있으니 증상 부위 사진을 찍어두시고 피부과 진료를 받아보세요.";
    }

    if (
      lowerMessage.includes("열") ||
      lowerMessage.includes("뜨거") ||
      lowerMessage.includes("체온")
    ) {
      return "발열 증상이 의심되시는군요. 즉시 확인해야 할 사항들입니다:\n\n• 코가 평소보다 뜨겁고 건조한가요?\n• 평소보다 많이 헥헥거리나요?\n• 기력이 없고 축 늘어져 있나요?\n• 식욕이 떨어졌나요?\n\n발열은 감염이나 염증의 신호일 수 있으니 가능한 빨리 병원에서 체온 측정과 진료를 받으시기 바랍니다.";
    }

    // Age-related responses
    if (lowerMessage.includes("강아지") || lowerMessage.includes("개")) {
      return "강아지에 대해 문의해 주셨네요! 강아지의 나이와 품종을 알려주시면 더 정확한 조언을 드릴 수 있습니다.\n\n어떤 증상이나 걱정되는 점이 있으신가요? 구체적으로 설명해 주시면 도움을 드리겠습니다.";
    }

    if (lowerMessage.includes("고양이") || lowerMessage.includes("냥")) {
      return "고양이에 대해 문의해 주셨네요! 고양이는 아픔을 잘 숨기는 특성이 있어 더욱 세심한 관찰이 필요합니다.\n\n고양이의 나이와 어떤 증상이 걱정되시는지 자세히 알려주세요.";
    }

    // Emergency keywords
    if (
      lowerMessage.includes("응급") ||
      lowerMessage.includes("위험") ||
      lowerMessage.includes("심각")
    ) {
      return "⚠️ 응급 상황으로 보입니다!\n\n다음과 같은 증상이 있다면 즉시 응급 동물병원에 방문하세요:\n\n• 의식 잃음\n• 심한 호흡곤란\n• 지속적인 구토/설사\n• 경련\n• 심한 출혈\n• 중독 의심\n\n지금 즉시 가까운 응급 동물병원에 연락하시기 바랍니다!";
    }

    // General responses
    if (lowerMessage.includes("안녕") || lowerMessage.includes("처음")) {
      return "안녕하세요! 반려동물의 건강이 걱정되어 찾아주셨군요.\n\n어떤 증상이나 행동 변화가 있는지 자세히 말씀해 주세요. 최대한 도움을 드리겠습니다!";
    }

    if (lowerMessage.includes("감사") || lowerMessage.includes("고마")) {
      return "도움이 되었다니 다행입니다! 😊\n\n반려동물의 건강은 지속적인 관찰과 관리가 중요합니다. 다른 궁금한 점이 있으시면 언제든 말씀해 주세요.\n\n건강한 하루 되세요!";
    }

    // Default response
    return "말씀해 주신 내용을 잘 들었습니다. 더 정확한 진단을 위해 몇 가지 추가 정보가 필요합니다:\n\n• 반려동물의 종류와 나이\n• 증상이 시작된 시기\n• 증상의 정도와 빈도\n• 최근 변화된 환경이나 음식\n\n이런 정보들을 알려주시면 더 구체적인 조언을 드릴 수 있습니다. 하지만 정확한 진단을 위해서는 수의사의 직접 진료를 받으시는 것을 권합니다.";
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAIResponse(inputText),
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1500 + Math.random() * 1000,
    ); // 1.5-2.5 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center border-b bg-white p-4">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <Bot size={18} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AI 수의사</h1>
            <p className="text-xs text-green-600">온라인</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  message.sender === "user"
                    ? "ml-2 bg-blue-600"
                    : "mr-2 bg-gray-200"
                }`}
              >
                {message.sender === "user" ? (
                  <User size={16} className="text-white" />
                ) : (
                  <Bot size={16} className="text-gray-600" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "rounded-br-md bg-blue-600 text-white"
                    : "rounded-bl-md bg-gray-100 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-line text-sm">{message.text}</p>
                <p
                  className={`mt-1 text-xs ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                >
                  {message.timestamp.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <Bot size={16} className="text-gray-600" />
              </div>
              <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="증상이나 궁금한 점을 입력하세요..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isTyping}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "구토를 해요",
            "설사를 해요",
            "기침을 해요",
            "밥을 안 먹어요",
            "눈이 이상해요",
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputText(suggestion)}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
              disabled={isTyping}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
