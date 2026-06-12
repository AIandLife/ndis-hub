"use client";

import { useState } from "react";
import Link from "next/link";
import { X, CheckCircle, MessageCircle, Copy } from "lucide-react";

// 「我能对接」直连弹窗（对接大厅 + 资源库共用）。
// 留下称呼+微信 → 对方有联系方式就当场互换直连；没有就由圈主牵线。
export interface ConnectTarget {
  type: "demand" | "member";
  id: string;
  name: string; // 需求方/成员显示名
  need?: string; // 对接的需求摘要
}

export default function ConnectModal({
  target,
  onClose,
}: {
  target: ConnectTarget;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | {
    bridged: boolean;
    wechat?: string | null;
    email?: string | null;
  }>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", wechat: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    let res: { bridged: boolean; wechat?: string | null; email?: string | null } = {
      bridged: true,
    };
    try {
      const r = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType: target.type,
          targetId: target.id,
          targetName: target.name,
          need: target.need || "",
          ...form,
        }),
      });
      const d = await r.json();
      res = { bridged: d.bridged !== false, ...(d.contact || {}) };
      // 通知圈主（不阻塞用户）
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "connect_request",
          data: {
            ...form,
            targetName: target.name,
            need: target.need || "",
            bridged: res.bridged ? "yes" : "no",
          },
        }),
      }).catch(() => {});
    } catch {
      /* 静默，仍显示牵线结果 */
    }
    setSubmitting(false);
    setResult(res);
  };

  const copyWechat = async (w: string) => {
    try {
      await navigator.clipboard.writeText(w);
      setCopied(true);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-navy-900">对接：{target.name}</h2>
            {target.need && (
              <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                {target.need}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {result ? (
          <div className="p-7 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={26} className="text-green-600" />
            </div>
            {!result.bridged && (result.wechat || result.email) ? (
              <>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  直接联系对方
                </h3>
                {result.wechat && (
                  <div className="bg-gray-50 rounded-xl px-4 py-3 mb-2 flex items-center justify-between gap-2">
                    <div className="text-left">
                      <div className="text-xs text-gray-400">对方微信</div>
                      <div className="font-mono font-bold text-navy-900">
                        {result.wechat}
                      </div>
                    </div>
                    <button
                      onClick={() => copyWechat(result.wechat!)}
                      className="flex items-center gap-1 text-xs font-semibold text-navy-900 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-navy-900 transition-colors"
                    >
                      <Copy size={12} />
                      {copied ? "已复制" : "复制"}
                    </button>
                  </div>
                )}
                {result.email && (
                  <div className="bg-gray-50 rounded-xl px-4 py-3 mb-2 text-left">
                    <div className="text-xs text-gray-400">对方邮箱</div>
                    <div className="font-mono font-bold text-navy-900 text-sm">
                      {result.email}
                    </div>
                  </div>
                )}
                <p className="text-gray-500 text-xs mt-3">
                  加好友时备注「澳洲NDIS圈对接」，对方会更快通过
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  已转交圈主牵线
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  对方未公开联系方式。圈主已收到你的微信，
                  会尽快把你推给对方。想更快？进群直接@圈主。
                </p>
                <Link
                  href="/#join"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
                >
                  <MessageCircle size={14} />
                  进同业交流群
                </Link>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-navy-50 rounded-xl p-3 text-xs text-navy-800">
              留下你的微信，{target.type === "demand"
                ? "提交后直接显示对方联系方式，你们自行对接。"
                : "圈主会把你推给对方，完成牵线。"}
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                你的称呼 *
              </label>
              <input
                required
                type="text"
                maxLength={40}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="姓名 / 公司"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                你的微信号 *
              </label>
              <input
                required
                type="text"
                maxLength={40}
                value={form.wechat}
                onChange={(e) => setForm({ ...form, wechat: e.target.value })}
                placeholder="对方/圈主通过它联系你"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                想说的话（选填）
              </label>
              <textarea
                rows={2}
                maxLength={300}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="一句话介绍你能提供什么"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-navy-900 text-white font-bold py-3 rounded-xl hover:bg-navy-800 disabled:bg-gray-400 transition-colors"
            >
              {submitting ? "提交中..." : "提交，开始对接"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
