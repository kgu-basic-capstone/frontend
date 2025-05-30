import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare, Share2, Plus } from "lucide-react";

export default function Community() {
  const posts = [
    {
      id: 1,
      user: {
        name: "강아지맘",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "2시간 전",
      content:
        "오늘 멍멍이가 새 장난감을 너무 좋아해요! 다른 분들은 어떤 장난감을 주시나요?",
      image: "/placeholder.svg?height=200&width=400",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      user: {
        name: "고양이아빠",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "4시간 전",
      content:
        "우리 냥이가 요즘 밥을 잘 안 먹어서 걱정이에요. 혹시 비슷한 경험 있으신 분 조언 부탁드려요.",
      image: null,
      likes: 15,
      comments: 12,
    },
    {
      id: 3,
      user: {
        name: "동물사랑",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "어제",
      content:
        "주말에 반려동물 친구들과 함께하는 공원 산책 모임이 있어요! 관심 있으신 분들은 댓글 남겨주세요.",
      image: "/placeholder.svg?height=200&width=400",
      likes: 42,
      comments: 18,
    },
  ];

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <h1 className="text-xl font-bold">커뮤니티</h1>
      </div>

      {/* Posts */}
      <div className="space-y-4 mt-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4">
            {/* Post Header */}
            <div className="flex items-center mb-3">
              <Image
                src={post.user.avatar || "/placeholder.svg"}
                alt={post.user.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">{post.user.name}</h3>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="mb-3">{post.content}</p>

            {/* Post Image (if any) */}
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="Post image"
                  width={400}
                  height={200}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="flex border-t border-b border-gray-100 py-2 my-2">
              <button className="flex items-center justify-center flex-1 text-gray-600">
                <Heart size={18} className="mr-1" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center justify-center flex-1 text-gray-600">
                <MessageSquare size={18} className="mr-1" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center justify-center flex-1 text-gray-600">
                <Share2 size={18} />
              </button>
            </div>

            {/* Comments Preview */}
            <Link
              href={`/community/post/${post.id}`}
              className="text-sm text-gray-600"
            >
              댓글 {post.comments}개 모두 보기
            </Link>
          </div>
        ))}
      </div>

      {/* Add Post Button */}
      <Link
        href="/community/create"
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
      >
        <Plus size={24} className="text-white" />
      </Link>
    </div>
  );
}
