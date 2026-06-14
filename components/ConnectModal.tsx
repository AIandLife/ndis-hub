"use client";

import { useState } from "react";
import Link from "next/link";
import { X, CheckCircle, MessageCircle, Copy } from "lucide-react";
import { useI18n } from "@/lib/i18n";

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
  const { t, lang } = useI18n();
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
            <h2 className="text-lg font-bold text-navy-900">{t("connect.title")}{target.name}</h2>
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
                  {t("connect.directTitle")}
                </h3>
                {result.wechat && (
                  <div className="bg-gray-50 rounded-xl px-4 py-3 mb-2 flex items-center justify-between gap-2">
                    <div className="text-left">
                      <div className="text-xs text-gray-400">{t("connect.theirContact")}</div>
                      <div className="font-mono font-bold text-navy-900">
                        {result.wechat}
                      </div>
                    </div>
                    <button
                      onClick={() => copyWechat(result.wechat!)}
                      className="flex items-center gap-1 text-xs font-semibold text-navy-900 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-navy-900 transition-colors"
                    >
                      <Copy size={12} />
                      {copied ? t("connect.copied") : t("connect.copy")}
                    </button>
                  </div>
                )}
                {result.email && (
                  <div className="bg-gray-50 rounded-xl px-4 py-3 mb-2 text-left">
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="font-mono font-bold text-navy-900 text-sm">
                      {result.email}
                    </div>
                  </div>
                )}
                <p className="text-gray-500 text-xs mt-3">
                  {t("connect.note")}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  {t("connect.bridgedTitle")}
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  {t("connect.bridgedSub")}
                </p>
                <Link
                  href="/#join"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
                >
                  <MessageCircle size={14} />
                  {t("connect.joinGroup")}
                </Link>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-navy-50 rounded-xl p-3 text-xs text-navy-800">
              {t("connect.lead")}
              {target.type === "demand"
                ? t("connect.intro.demand")
                : t("connect.intro.member")}
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                {t("connect.yourName")} *
              </label>
              <input
                required
                type="text"
                maxLength={40}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={lang === "en" ? "Name / company" : "姓名 / 公司"}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                {t("connect.yourContact")} *
              </label>
              <input
                required
                type="text"
                maxLength={60}
                value={form.wechat}
                onChange={(e) => setForm({ ...form, wechat: e.target.value })}
                placeholder={lang === "en" ? "e.g. wx_id / +61 4xx xxx xxx" : "例：wx_id / +61 4xx xxx xxx"}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                {t("connect.msg")}
              </label>
              <textarea
                rows={2}
                maxLength={300}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t("connect.msgPlaceholder")}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-navy-900 text-white font-bold py-3 rounded-xl hover:bg-navy-800 disabled:bg-gray-400 transition-colors"
            >
              {submitting ? t("post.submitting") : t("connect.submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
