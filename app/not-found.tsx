import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-gray-100 mb-4">404</div>
        <h1 className="text-2xl font-bold text-navy-900 mb-3">
          页面找不到了
        </h1>
        <p className="text-gray-500 mb-8">
          这个页面不存在，或者已经移动到其他地方。
          你可以回到首页，或者用AI顾问查询你需要的NDIS信息。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors"
          >
            <Home size={15} />
            回到首页
          </Link>
          <Link
            href="/ai-advisor"
            className="inline-flex items-center justify-center gap-2 border-2 border-navy-900 text-navy-900 font-semibold px-6 py-3 rounded-xl hover:bg-navy-900 hover:text-white transition-colors"
          >
            问AI顾问 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
