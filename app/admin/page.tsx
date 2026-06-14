"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle, X, RefreshCw, Lock } from "lucide-react";

interface AppRow {
  id: string;
  full_name: string;
  company: string;
  email: string;
  wechat_id: string;
  phone: string;
  location: string;
  ndis_role: string;
  description: string;
  created_at: string;
}
interface DemandRow {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  submitter_name: string;
  contact_wechat: string;
  contact_email: string;
  created_at: string;
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [apps, setApps] = useState<AppRow[]>([]);
  const [demands, setDemands] = useState<DemandRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const s = localStorage.getItem("ndis-admin-secret");
    if (s) {
      setSecret(s);
      setAuthed(true);
    }
  }, []);

  const load = useCallback(
    async (sec: string) => {
      setLoading(true);
      setErr("");
      try {
        const r = await fetch("/api/admin", { headers: { "x-admin-secret": sec } });
        if (r.status === 401) {
          setErr("密码错误");
          setAuthed(false);
          localStorage.removeItem("ndis-admin-secret");
          setLoading(false);
          return;
        }
        const d = await r.json();
        setApps(d.applications || []);
        setDemands(d.demands || []);
        setAuthed(true);
        localStorage.setItem("ndis-admin-secret", sec);
      } catch {
        setErr("加载失败");
      }
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    if (authed && secret) load(secret);
  }, [authed, secret, load]);

  const act = async (kind: string, id: string, action: string) => {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": secret },
      body: JSON.stringify({ kind, id, action }),
    });
    if (kind === "application") setApps((p) => p.filter((x) => x.id !== id));
    else setDemands((p) => p.filter((x) => x.id !== id));
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-5">
            <Lock size={24} className="text-gold-400" />
          </div>
          <h1 className="text-xl font-bold text-navy-900 mb-1">圈主后台</h1>
          <p className="text-gray-500 text-sm mb-5">输入管理密码</p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(secret)}
            placeholder="管理密码"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors mb-3"
          />
          {err && <p className="text-red-500 text-xs mb-3">{err}</p>}
          <button
            onClick={() => load(secret)}
            className="w-full bg-navy-900 text-white font-bold py-2.5 rounded-xl hover:bg-navy-800 transition-colors"
          >
            进入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">圈主后台 · 审批</h1>
            <p className="text-blue-300 text-sm mt-1">
              待审入驻 {apps.length} · 待审需求 {demands.length}
            </p>
          </div>
          <button
            onClick={() => load(secret)}
            className="flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> 刷新
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Applications */}
        <section>
          <h2 className="text-lg font-bold text-navy-900 mb-4">
            入驻申请（通过后上资源库）
          </h2>
          {apps.length === 0 ? (
            <p className="text-gray-400 text-sm">暂无待审申请</p>
          ) : (
            <div className="space-y-3">
              {apps.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1 text-sm">
                    <div className="font-bold text-navy-900">
                      {a.company || a.full_name}
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        {a.ndis_role} · {a.location}
                      </span>
                    </div>
                    <div className="text-gray-500 mt-1">
                      {a.full_name} · 📞 {a.phone || "—"} · ✉️ {a.email}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => act("application", a.id, "approve")}
                      className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      <CheckCircle size={14} /> 通过
                    </button>
                    <button
                      onClick={() => act("application", a.id, "reject")}
                      className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      <X size={14} /> 拒绝
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Demands */}
        <section>
          <h2 className="text-lg font-bold text-navy-900 mb-4">
            发布的需求（通过后上对接大厅）
          </h2>
          {demands.length === 0 ? (
            <p className="text-gray-400 text-sm">暂无待审需求</p>
          ) : (
            <div className="space-y-3">
              {demands.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <div className="flex-1 text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-navy-50 text-navy-700 px-2 py-0.5 rounded-full">
                        {d.category}
                      </span>
                      <span className="text-xs text-gray-400">{d.city}</span>
                    </div>
                    <div className="font-bold text-navy-900">{d.title}</div>
                    <div className="text-gray-500 mt-1 line-clamp-2">{d.description}</div>
                    <div className="text-gray-400 text-xs mt-2">
                      {d.submitter_name} · 微信/联系：{d.contact_wechat || d.contact_email || "—"}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => act("demand", d.id, "approve")}
                      className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      <CheckCircle size={14} /> 通过
                    </button>
                    <button
                      onClick={() => act("demand", d.id, "reject")}
                      className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      <X size={14} /> 拒绝
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
