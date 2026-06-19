"use client";

// 根级错误兜底：连根布局都崩了（含 I18nProvider）也不白屏，给个可重试的页面。
// 必须自带 <html>/<body>，用内联样式（此时 Tailwind/全局样式可能未生效）。
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F2942",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif",
          color: "#fff",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 360 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#F5A623",
              color: "#0F2942",
              fontWeight: 700,
              fontSize: 22,
              lineHeight: "48px",
              margin: "0 auto 18px",
            }}
          >
            N
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            页面加载出错了
          </div>
          <div style={{ fontSize: 13, color: "#9fb3cc", lineHeight: 1.6, marginBottom: 22 }}>
            网络或浏览器原因没加载出来。点下面重试；微信里打不开可点右上角「···」→「在浏览器打开」。
          </div>
          <button
            onClick={() => reset()}
            style={{
              background: "#F5A623",
              color: "#0F2942",
              border: "none",
              fontWeight: 700,
              fontSize: 15,
              padding: "11px 26px",
              borderRadius: 11,
            }}
          >
            重新加载
          </button>
        </div>
      </body>
    </html>
  );
}
