import { NextRequest } from "next/server";

// 品牌色
const NAVY = "#0F2942";
const GOLD = "#F5A623";
const ADMIN_URL = "https://ndiscircle.com/admin";

type Row = { label: string; value?: string };

function rowsHtml(rows: Row[]): string {
  return rows
    .filter((r) => r.value != null && String(r.value).trim() !== "")
    .map(
      (r) => `
      <tr>
        <td style="padding:11px 0;border-bottom:1px solid #eef0f3;color:#6b7280;font-size:13px;line-height:1.5;width:96px;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei',sans-serif">${r.label}</td>
        <td style="padding:11px 0;border-bottom:1px solid #eef0f3;color:#111827;font-size:14px;line-height:1.6;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei',sans-serif">${r.value}</td>
      </tr>`
    )
    .join("");
}

function card(opts: {
  badge: string;
  badgeColor?: string;
  title: string;
  subtitle?: string;
  rows: Row[];
  highlight?: { text: string; tone: "gold" | "green" | "amber" };
}): string {
  const now = new Date().toLocaleString("zh-AU", {
    timeZone: "Australia/Sydney",
  });
  const tones = {
    gold: { bg: "#FEF6E7", border: "#F6D9A0", text: "#8a5a00" },
    green: { bg: "#ECFDF3", border: "#A9E5C3", text: "#067647" },
    amber: { bg: "#FFF6E9", border: "#F5C77E", text: "#92500a" },
  };
  const hl = opts.highlight ? tones[opts.highlight.tone] : null;
  const font =
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei',sans-serif";

  return `
  <div style="background:#f4f5f7;padding:28px 12px;font-family:${font}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8eaed;border-radius:16px;overflow:hidden">
      <!-- header -->
      <tr><td style="background:${NAVY};padding:22px 26px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:middle;width:40px">
            <div style="width:34px;height:34px;background:${GOLD};border-radius:9px;text-align:center;line-height:34px;color:${NAVY};font-weight:700;font-size:17px;font-family:${font}">N</div>
          </td>
          <td style="vertical-align:middle;padding-left:12px">
            <div style="color:#ffffff;font-weight:700;font-size:16px;font-family:${font}">澳洲NDIS圈</div>
            <div style="color:${GOLD};font-size:11px;letter-spacing:.5px;font-family:${font}">NDIS CIRCLE · 圈主通知</div>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="height:3px;background:${GOLD};line-height:3px;font-size:0">&nbsp;</td></tr>

      <!-- body -->
      <tr><td style="padding:26px 26px 22px">
        <span style="display:inline-block;background:${NAVY};color:#ffffff;font-size:11px;font-weight:600;letter-spacing:.4px;padding:4px 11px;border-radius:999px;font-family:${font}">${opts.badge}</span>
        <h1 style="margin:14px 0 4px;color:${NAVY};font-size:20px;font-weight:700;font-family:${font}">${opts.title}</h1>
        ${opts.subtitle ? `<p style="margin:0 0 18px;color:#6b7280;font-size:13px;line-height:1.6;font-family:${font}">${opts.subtitle}</p>` : `<div style="height:8px"></div>`}

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml(opts.rows)}</table>

        ${
          hl
            ? `<div style="margin-top:18px;background:${hl.bg};border:1px solid ${hl.border};border-radius:12px;padding:13px 15px;color:${hl.text};font-size:13.5px;line-height:1.6;font-family:${font}">${opts.highlight!.text}</div>`
            : ""
        }

        <div style="margin-top:24px">
          <a href="${ADMIN_URL}" style="display:inline-block;background:${NAVY};color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:11px;font-family:${font}">进后台查看 / 审批 →</a>
        </div>
      </td></tr>

      <!-- footer -->
      <tr><td style="background:#fafbfc;border-top:1px solid #eef0f3;padding:16px 26px">
        <p style="margin:0;color:#9aa1ab;font-size:11.5px;line-height:1.6;font-family:${font}">提交时间 ${now} · 本邮件由 ndiscircle.com 自动发送，数据已存入后台留底。</p>
      </td></tr>
    </table>
  </div>`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, data } = body;

  const notifyEmail = process.env.NOTIFY_EMAIL || "recommendforterry@gmail.com";
  const resendKey = process.env.RESEND_API_KEY;
  const larkWebhook = process.env.NOTIFY_LARK_WEBHOOK;

  let subject = "";
  let html = "";

  if (type === "provider_register") {
    subject = `【澳洲NDIS圈】新入驻申请 · ${data.business || data.name}`;
    html = card({
      badge: "入驻申请 · 待审核",
      title: "新商家入驻申请",
      subtitle: "审核通过后，将自动展示在资源库成员目录。",
      rows: [
        { label: "姓名", value: data.name },
        { label: "公司 / 机构", value: data.business },
        { label: "服务类型", value: data.type },
        { label: "所在城市", value: data.location },
        { label: "服务语言", value: data.language },
        { label: "联系电话", value: data.phone },
        { label: "联系邮箱", value: data.email },
      ],
    });
  } else if (type === "course_inquiry") {
    subject = `【澳洲NDIS圈】新课程咨询 · ${data.name}`;
    html = card({
      badge: "课程咨询",
      title: "新课程报名咨询",
      rows: [
        { label: "姓名", value: data.name },
        { label: "联系电话", value: data.phone },
        { label: "微信号", value: data.wechat },
        { label: "感兴趣课程", value: data.interest },
      ],
    });
  } else if (type === "demand_post") {
    subject = `【澳洲NDIS圈】对接大厅新需求 · ${data.title}`;
    html = card({
      badge: "对接大厅 · 新需求 · 待审核",
      title: "对接大厅收到新需求",
      subtitle: "审核通过后，将公开展示在对接大厅。",
      rows: [
        { label: "在找", value: data.title },
        { label: "详情", value: data.description },
        { label: "分类", value: data.category },
        { label: "城市", value: data.city },
        { label: "发布人", value: data.name },
        { label: "联系方式", value: data.wechat },
        { label: "邮箱", value: data.email },
      ],
    });
  } else if (type === "connect_request") {
    const bridged = data.bridged === "yes";
    subject = `【澳洲NDIS圈】对接请求 · ${data.name} → ${data.targetName}`;
    html = card({
      badge: "对接请求",
      title: "有人发起对接",
      rows: [
        { label: "想对接", value: data.need || "（资源库成员）" },
        { label: "需求方", value: data.targetName },
        { label: "响应人", value: data.name },
        { label: "对方联系方式", value: data.wechat },
        { label: "留言", value: data.message },
      ],
      highlight: bridged
        ? {
            tone: "amber",
            text: "⚠️ 对方未公开联系方式，需要你牵线把双方接上。",
          }
        : {
            tone: "green",
            text: "✓ 已自动互换联系方式，双方可直接跟进。",
          },
    });
  } else {
    return Response.json({ error: "Unknown notification type" }, { status: 400 });
  }

  // 纯文本摘要（飞书/Lark 自定义机器人 webhook 用）。
  const textLines = [subject.replace(/^【澳洲NDIS圈】/, "")];
  for (const [k, v] of Object.entries(data || {})) {
    if (v == null || v === "" || k === "bridged") continue;
    textLines.push(`${k}: ${v}`);
  }
  const text = textLines.join("\n");

  const channels: string[] = [];

  // 1) 飞书 / Lark 自定义机器人 webhook
  if (larkWebhook) {
    try {
      const lr = await fetch(larkWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg_type: "text", content: { text } }),
      });
      if (lr.ok) channels.push("lark");
      else console.error("[notify] Lark error:", await lr.text());
    } catch (e) {
      console.error("[notify] Lark exception:", e);
    }
  }

  // 2) 邮件（Resend）
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // 发件人开关：EMAIL_FROM 没设时回退到已验证的 bosslink.ai。
          from: process.env.EMAIL_FROM || "澳洲NDIS圈 <noreply@bosslink.ai>",
          to: [notifyEmail],
          subject,
          html,
        }),
      });
      if (res.ok) channels.push("email");
      else console.error("[notify] Resend error:", await res.text());
    } catch (e) {
      console.error("[notify] Resend exception:", e);
    }
  }

  if (channels.length === 0) {
    console.log(`[notify] No channel configured. Would send: ${subject}`, data);
    return Response.json({ ok: true, sent: false, reason: "no_channel" });
  }
  return Response.json({ ok: true, sent: true, channels });
}
