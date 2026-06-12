import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, data } = body;

  const notifyEmail = process.env.NOTIFY_EMAIL || "recommendforterry@gmail.com";
  const resendKey = process.env.RESEND_API_KEY;

  // Build email content based on form type
  let subject = "";
  let html = "";

  if (type === "provider_register") {
    subject = `【澳洲NDIS圈】新Provider入驻申请 - ${data.business}`;
    html = `
      <h2>新Provider入驻申请</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">姓名</td><td style="padding:8px;border:1px solid #eee">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">公司/机构</td><td style="padding:8px;border:1px solid #eee">${data.business}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">服务类型</td><td style="padding:8px;border:1px solid #eee">${data.type}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">所在城市</td><td style="padding:8px;border:1px solid #eee">${data.location}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">服务语言</td><td style="padding:8px;border:1px solid #eee">${data.language}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">联系电话</td><td style="padding:8px;border:1px solid #eee">${data.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">联系邮箱</td><td style="padding:8px;border:1px solid #eee">${data.email}</td></tr>
      </table>
      <p style="color:#666;margin-top:16px">提交时间：${new Date().toLocaleString("zh-AU", { timeZone: "Australia/Sydney" })}</p>
    `;
  } else if (type === "course_inquiry") {
    subject = `【澳洲NDIS圈】新课程报名咨询 - ${data.name}`;
    html = `
      <h2>新课程报名咨询</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">姓名</td><td style="padding:8px;border:1px solid #eee">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">联系电话</td><td style="padding:8px;border:1px solid #eee">${data.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">微信号</td><td style="padding:8px;border:1px solid #eee">${data.wechat || "未提供"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">感兴趣课程</td><td style="padding:8px;border:1px solid #eee">${data.interest || "未选择"}</td></tr>
      </table>
      <p style="color:#666;margin-top:16px">提交时间：${new Date().toLocaleString("zh-AU", { timeZone: "Australia/Sydney" })}</p>
    `;
  } else if (type === "demand_post") {
    subject = `【澳洲NDIS圈】对接大厅新需求 - ${data.title}`;
    html = `
      <h2>对接大厅收到新需求（待审核）</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">在找</td><td style="padding:8px;border:1px solid #eee">${data.title}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">详情</td><td style="padding:8px;border:1px solid #eee">${data.description}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">分类 / 城市</td><td style="padding:8px;border:1px solid #eee">${data.category} / ${data.city}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">发布人</td><td style="padding:8px;border:1px solid #eee">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">微信</td><td style="padding:8px;border:1px solid #eee">${data.wechat || "未提供"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">邮箱</td><td style="padding:8px;border:1px solid #eee">${data.email || "未提供"}</td></tr>
      </table>
      <p style="color:#666;margin-top:16px">提交时间：${new Date().toLocaleString("zh-AU", { timeZone: "Australia/Sydney" })}</p>
    `;
  } else {
    return Response.json({ error: "Unknown notification type" }, { status: 400 });
  }

  // If no Resend key configured, log and return success (graceful degradation)
  if (!resendKey) {
    console.log(`[notify] No RESEND_API_KEY. Would send: ${subject}`, data);
    return Response.json({ ok: true, sent: false, reason: "no_api_key" });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "澳洲NDIS圈 <onboarding@resend.dev>",
      to: [notifyEmail],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[notify] Resend error:", err);
    // Still return 200 so the user-facing form doesn't show an error
    return Response.json({ ok: true, sent: false, reason: "resend_error" });
  }

  return Response.json({ ok: true, sent: true });
}
