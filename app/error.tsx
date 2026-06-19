"use client";

// 页面级错误兜底：单个页面崩了，导航/页脚还在，给可重试的提示，不白屏。
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div className="max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 font-bold text-xl flex items-center justify-center mx-auto mb-4">
          !
        </div>
        <h1 className="text-lg font-bold text-navy-900 mb-2">这个页面没加载出来</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          可能是网络波动。点下面重试；微信里打不开可点右上角「···」→「在浏览器打开」。
        </p>
        <button
          onClick={() => reset()}
          className="bg-navy-900 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-navy-800 transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  );
}
