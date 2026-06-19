"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "zh" | "en";

// 全站文案字典。新增页面时往里加 key。t(key) 取当前语言；缺失回退中文再回退 key。
const DICT: Record<string, { zh: string; en: string }> = {
  // ── Navigation ──
  "nav.board": { zh: "对接大厅", en: "Marketplace" },
  "nav.providers": { zh: "资源库", en: "Directory" },
  "nav.aiAdvisor": { zh: "AI 顾问", en: "AI Advisor" },
  "nav.insights": { zh: "行业情报", en: "Insights" },
  "nav.about": { zh: "关于", en: "About" },
  "nav.joinGroup": { zh: "进群", en: "Join" },
  "nav.freeListing": { zh: "免费入驻", en: "List Free" },

  // ── Hero ──
  "hero.badge": {
    zh: "华人 NDIS 从业者的 B2B 资源圈 · 2026改革实时更新",
    en: "B2B network for NDIS professionals · 2026 reform updates",
  },
  "hero.tagline": { zh: "专为澳洲 NDIS 行业从业者打造", en: "Built for Australia's NDIS professionals" },
  "hero.headlineSuffix": { zh: "都在澳洲 NDIS 圈", en: "are all in the NDIS Circle" },
  "hero.sub": {
    zh: "行业知识、合规工具、圈内人脉、上下游合作——用中文，帮NDIS从业者做对、做好、做大。",
    en: "Industry know-how, compliance, peer network and B2B deals — helping NDIS operators do it right and grow.",
  },
  "hero.ctaJoin": { zh: "扫码进 NDIS 行业交流群", en: "Join the NDIS community group" },
  "hero.ctaJoinMobile": { zh: "加入 NDIS 行业交流群", en: "Join the NDIS community" },
  "hero.ctaAi": { zh: "AI 行业顾问", en: "AI Advisor" },
  "hero.ctaBoard": { zh: "逛对接大厅", en: "Browse Marketplace" },
  "hero.posLine": { zh: "面向 NDIS 行业从业者的 B2B 资源与人脉平台", en: "A B2B resource & network platform for NDIS professionals" },

  // ── Stats ──
  "stat.participants": { zh: "澳洲NDIS参与者（2025）", en: "NDIS participants (2025)" },
  "stat.marketSize": { zh: "年度行业规模", en: "Annual scheme size" },
  "stat.growth": { zh: "年增长，行业仍在扩张", en: "annual growth, still expanding" },
  "stat.reformYear": { zh: "改革落地年 · 评估改3小时面谈", en: "Reform year · 3-hour assessments" },

  // ── Value props ──
  "vp.why": { zh: "为什么来这里？", en: "Why join?" },
  "vp.whySub": {
    zh: "做 NDIS 生意，信息散、资源散、同行难找——这里把人、资源和机会聚到一起。",
    en: "Running an NDIS business means scattered info and hard-to-find peers — we bring people, resources and opportunities together.",
  },
  "vp.ai.t": { zh: "AI 中文顾问", en: "AI Advisor" },
  "vp.ai.d": { zh: "用中文提问，获得有方向性的NDIS专业回答。不是百科，是导航。", en: "Ask in plain language and get directional, professional NDIS answers — guidance, not an encyclopedia." },
  "vp.community.t": { zh: "从业者社群", en: "Practitioner community" },
  "vp.community.d": { zh: "进群和悉尼/墨尔本/布里斯班的 Provider、SC、PM 在一个圈子里，不再单打独斗。", en: "Connect with Providers, SCs and PMs across Sydney, Melbourne and Brisbane — never go it alone." },
  "vp.board.t": { zh: "对接大厅", en: "Marketplace" },
  "vp.board.d": { zh: "全行业的「在找什么」都在这——找员工、找客户、找供应商。挂上你的需求，圈子帮你找。", en: "Everyone's needs in one place — staff, clients, suppliers. Post yours and let the network find it." },
  "common.learnMore": { zh: "了解更多", en: "Learn more" },
  "common.home": { zh: "首页", en: "Home" },

  // ── Homepage marketplace preview ──
  "mp.tag": { zh: "对接大厅 · 实时", en: "Marketplace · live" },
  "mp.title": { zh: "圈里现在有人在找这些", en: "What the circle is looking for right now" },
  "mp.sub": { zh: "全行业的「在找什么」都在对接大厅——看到你能满足的，直接对接；你有需求，免费发一条。", en: "Every “looking for” in one place. See one you can fill — connect. Got a need — post it free." },
  "mp.lookingFor": { zh: "在找", en: "Looking for" },
  "mp.browse": { zh: "进对接大厅", en: "Open Marketplace" },
  "mp.post": { zh: "免费发布需求", en: "Post a need" },
  "mp.split": { zh: "在找东西？逛对接大厅。能提供？免费入驻资源库。", en: "Looking for something? Browse the Marketplace. Offering something? List free in the Directory." },

  // ── Resource library showcase / page ──
  "lib.tag": { zh: "NDIS 商家资源库", en: "NDIS Business Directory" },
  "lib.title": { zh: "找同行、找供应商、找合作", en: "Find peers, suppliers and partners" },
  "lib.showcaseSub": {
    zh: "全澳做 NDIS 的华人圈内成员 + 行业公开资源。每张卡都写着对方在供什么、在找什么——看中了就直接对接。",
    en: "NDIS members across Australia plus public industry listings. Each card shows what they offer and what they're looking for — connect directly.",
  },
  "lib.enter": { zh: "进入资源库", en: "Open directory" },
  "lib.pageSub": {
    zh: "全澳做 NDIS 的圈内成员 + 持续收录的行业公开资源。每张卡都写着对方在供什么、在找什么——看中了就直接对接。",
    en: "NDIS members across Australia plus continually-added public listings. Each card shows what they offer and seek — connect directly.",
  },
  "lib.listFree": { zh: "免费入驻，让圈子找到你", en: "List free — get found" },
  "lib.count": { zh: "个机构 / 资源", en: "businesses / resources" },
  "lib.searchPlaceholder": { zh: "搜索机构 / 供应商名称或服务内容...", en: "Search business name or service..." },
  "lib.member": { zh: "圈内成员", en: "Member" },
  "lib.public": { zh: "公开收录", en: "Public listing" },
  "lib.provider": { zh: "服务机构", en: "Provider" },
  "lib.supplier": { zh: "上游供应商", en: "Supplier" },
  "lib.ndisReg": { zh: "NDIS注册", en: "NDIS registered" },
  "lib.lookingFor": { zh: "在找：", en: "Looking for: " },
  "lib.website": { zh: "官网", en: "Website" },
  "lib.connect": { zh: "联系 TA", en: "Contact" },
  "lib.clearFilters": { zh: "清除筛选", en: "Clear filters" },
  "lib.emptyTitle": { zh: "这个筛选下还没有人", en: "No one under this filter yet" },
  "lib.emptySub": {
    zh: "这正是空位——你做这块生意？免费入驻，做这个分类下圈子里的第一个。",
    en: "That's an open spot — do you work in this space? List free and be the first in this category.",
  },
  "lib.emptyCta": { zh: "申请加入成员目录", en: "Apply to join the directory" },
  "lib.benefit1.t": { zh: "认证展示", en: "Verified listing" },
  "lib.benefit1.d": { zh: "入驻后在资源库中优先展示", en: "Priority placement in the directory once listed" },
  "lib.benefit2.t": { zh: "上下游对接", en: "B2B connections" },
  "lib.benefit2.d": { zh: "供应商与服务机构互相找到、对接合作", en: "Suppliers and providers find and connect with each other" },
  "lib.benefit3.t": { zh: "圈内转介绍", en: "Peer referrals" },
  "lib.benefit3.d": { zh: "加入从业者社群，获得同行转介绍", en: "Join the community and get referrals from peers" },
  "lib.ctaTitle": { zh: "你也在NDIS行业？", en: "Also in the NDIS industry?" },
  "lib.ctaSub": {
    zh: "提交申请，审核通过后加入成员目录，让同行和客户找到你",
    en: "Apply, and once approved you'll be in the directory so peers and clients can find you.",
  },
  "lib.ctaBtn": { zh: "申请加入", en: "Apply to join" },

  // ── Join banner (shared bottom CTA) ──
  "jb.title": { zh: "做 NDIS 生意？同行都在群里", en: "In the NDIS business? Your peers are in the group" },
  "jb.sub": {
    zh: "政策解读 · 上下游对接 · 踩坑互助 — 免费加入 NDIS 行业交流群",
    en: "Policy updates · B2B deals · shared lessons — join the free NDIS community group",
  },

  // ── Join section ──
  "join.badge": { zh: "免费 · 华人 NDIS 从业者专属", en: "Free · for NDIS professionals" },
  "join.title": { zh: "扫码进群，加入澳洲华人 NDIS 从业者圈", en: "Join the NDIS professionals community" },
  "join.coverage": { zh: "免费 · 成员覆盖全澳六大城市", en: "Free · members across 6 major cities" },
  "join.cardTitle": { zh: "加入 NDIS 行业交流群", en: "Join the NDIS community group" },
  "join.scanMobile": { zh: "长按上方二维码，识别进群", en: "Long-press the QR code to join" },
  "join.scanDesktop": { zh: "微信扫一扫，进群和同行交流", en: "Scan with WeChat to join" },
  "join.step1": { zh: "识别二维码", en: "Scan code" },
  "join.step2": { zh: "备注「NDIS」", en: "Note 'NDIS'" },
  "join.step3": { zh: "进群对接", en: "Connect" },
  "join.h": { zh: "扫码进群，加入澳洲华人 NDIS 从业者圈", en: "Scan to join the NDIS professionals community" },
  "join.intro": {
    zh: "这里聚集着全澳做 NDIS 的 Provider、Support Coordinator、Plan Manager 和正在入行的人。进群你能：",
    en: "Providers, Support Coordinators, Plan Managers and newcomers across Australia. In the group you can:",
  },
  "join.b1": { zh: "第一时间拿到 2026 改革政策解读，不再靠猜", en: "Get 2026 reform updates first — no more guessing" },
  "join.b2": { zh: "找上下游合作、转介客户、对接供应商和合伙人", en: "Find partners, referrals, suppliers and collaborators" },
  "join.b3": { zh: "遇到合规/定价/注册的坑，群里有人踩过帮你绕开", en: "Dodge compliance/pricing/registration pitfalls others hit" },
  "join.b4": { zh: "免费用站内 AI 顾问 + NDIS 全流程工具", en: "Free AI advisor + NDIS journey tools" },
  "join.photoCaption": { zh: "NDIS 生意线下交流会 · 悉尼", en: "NDIS business meetup · Sydney" },
  "join.photoNote": { zh: "线上进群 · 线下见面", en: "Online group · in-person events" },
  "join.applyDirectory": { zh: "想进官方成员目录？申请入驻", en: "Want a directory listing? Apply" },
  "join.applyNote": { zh: "✓ 审核制 ✓ 圈内认证展示 ✓ 优先转介", en: "✓ Reviewed ✓ Verified badge ✓ Priority referrals" },

  // ── Footer ──
  "footer.tagline": { zh: "华人 NDIS 从业者的 B2B 资源与人脉平台。找同行、找供应商、找合作。", en: "A B2B resource & network platform for NDIS professionals. Find peers, suppliers and partners." },
  "footer.disclaimer": { zh: "本平台内容仅供参考，不构成专业法律或医疗建议。", en: "Content is for reference only and is not professional, legal or medical advice." },
  "footer.platform": { zh: "平台功能", en: "Platform" },
  "footer.business": { zh: "商业合作", en: "For business" },
  "footer.ecosystem": { zh: "生态伙伴", en: "Ecosystem" },

  // ── Homepage journey teaser ──
  "jt.title": { zh: "NDIS 全流程图", en: "The NDIS journey" },
  "jt.sub": { zh: "从申请到服务，每一步都有指引", en: "From access to service — guidance at every step" },
  "jt.full": { zh: "查看完整流程图", en: "See full journey" },

  // ── Homepage AI preview ──
  "aip.badge": { zh: "AI 驱动 · 行业视角", en: "AI-powered · operator view" },
  "aip.title": { zh: "做 NDIS 生意的行业顾问", en: "An AI advisor for NDIS operators" },
  "aip.sub": {
    zh: "面向 NDIS 从业者与生意人——入行注册、合规运营、定价、开拓客户、上下游对接。给你有方向、能落地的经营答案。",
    en: "For NDIS operators — registration, compliance, pricing, client acquisition and B2B deals. Directional, actionable business answers.",
  },
  "aip.b1": { zh: "入行/注册/合规：做这行你必须知道的", en: "Entry / registration / compliance essentials" },
  "aip.b2": { zh: "定价与经营：怎么收费、怎么开拓第一批客户", en: "Pricing & operations: how to charge and win first clients" },
  "aip.b3": { zh: "2026年改革对从业者的影响，实时跟踪", en: "2026 reform impact on operators, tracked live" },
  "aip.b4": { zh: "只讲生意，不针对参与者个人做指导（合规）", en: "Business-only — no individual participant advice (compliant)" },
  "aip.start": { zh: "开始提问", en: "Ask now" },
  "aip.online": { zh: "在线", en: "Online" },
  "aip.userMsg": { zh: "我想注册成为 NDIS Provider，第一步该做什么？成本大概多少？", en: "I want to become an NDIS Provider — what's the first step and the cost?" },
  "aip.continueRead": { zh: " 继续阅读", en: " Read more" },
  "aip.typing": { zh: "AI正在回答...", en: "AI is typing..." },
  "aip.continueChat": { zh: "点击继续对话", en: "Continue the chat" },

  // ── Ecosystem ──
  "eco.title": { zh: "澳洲商业联盟生态矩阵", en: "Australia Business Alliance ecosystem" },

  // ── Courses CTA ──
  "courses.ctaTitle": { zh: "想进入 NDIS 行业？先学对再入场", en: "Entering NDIS? Learn it right first" },
  "courses.ctaSub": { zh: "从注册入行到合规运营，全中文课程。避开华人 Provider 最常见的坑。", en: "From registration to compliant operations — courses that help you avoid the common pitfalls." },
  "courses.viewAll": { zh: "查看所有课程", en: "View courses" },
  "courses.askPlan": { zh: "问AI帮我规划路径", en: "Ask AI to plan my path" },
  "courses.tag": { zh: "华人NDIS从业者专属", en: "For NDIS professionals" },

  // ── Final CTA ──
  "final.title": { zh: "你在 NDIS 行业做生意？", en: "Running an NDIS business?" },
  "final.sub": { zh: "进 NDIS 行业交流群，建立人脉、拓展上下游合作，共同把生意做大。", en: "Join the NDIS community group, build connections and grow your business together." },
  "final.join": { zh: "进群", en: "Join the group" },
  "final.tryAi": { zh: "先试试 AI 顾问", en: "Try the AI Advisor" },

  // ── Board (Marketplace) ──
  "board.title": { zh: "对接大厅", en: "Marketplace" },
  "board.sub": {
    zh: "全行业的「在找什么」都在这一页——找员工、找客户、找供应商、找合伙人。挂上你的需求，圈子帮你找；看中谁的需求，直接对接。",
    en: "Every 'looking for' in one place — staff, clients, suppliers, partners. Post yours and let the network find it; see one you can fill, connect directly.",
  },
  "board.post": { zh: "免费发布需求", en: "Post a need (free)" },
  "board.count": { zh: "条需求", en: "needs" },
  "board.member": { zh: "圈内成员", en: "Member" },
  "board.canHelp": { zh: "我能满足", en: "I can help" },
  "board.emptyTitle": { zh: "这个分类下还没有需求", en: "No needs in this category yet" },
  "board.emptySub": { zh: "你来发第一条——免费，审核后全行业可见。", en: "Post the first one — free, visible to the whole industry after review." },
  "board.cat.all": { zh: "全部", en: "All" },
  "board.cat.staff": { zh: "找员工/招聘", en: "Hiring / staff" },
  "board.cat.clients": { zh: "找客户/转介", en: "Clients / referrals" },
  "board.cat.suppliers": { zh: "找供应商", en: "Suppliers" },
  "board.cat.partners": { zh: "找合作伙伴", en: "Partners" },
  "board.cat.trade": { zh: "买卖生意", en: "Buy / sell business" },
  "board.cat.space": { zh: "找房源/场地", en: "Property / venue" },
  "board.cat.other": { zh: "其他", en: "Other" },

  // ── Post demand modal ──
  "post.title": { zh: "发布需求 · 免费", en: "Post a need · free" },
  "post.sub": { zh: "审核通过后公开展示，圈子帮你找", en: "Shown publicly after review — the network helps you find it" },
  "post.done": { zh: "需求已提交！", en: "Submitted!" },
  "post.doneSub": { zh: "审核通过后会展示在对接大厅。想更快对接？直接进群，群里随时有人接得住。", en: "It'll appear on the Marketplace after review. Want faster? Join the group — someone there can help anytime." },
  "post.qTitle": { zh: "你在找什么？（一句话）", en: "What are you looking for? (one line)" },
  "post.qDetail": { zh: "补充细节", en: "More detail" },
  "post.qCategory": { zh: "分类", en: "Category" },
  "post.qCity": { zh: "城市", en: "City" },
  "post.qName": { zh: "你的称呼", en: "Your name" },
  "post.qContact": { zh: "联系方式（不公开）", en: "Contact (private)" },
  "post.contactHint": { zh: "联系方式（微信 / WhatsApp / 电话）不会公开展示，只用于对接时联系你。", en: "Your contact (WeChat / WhatsApp / phone) is never shown publicly — used only to reach you for connections." },
  "post.submit": { zh: "免费发布", en: "Post for free" },
  "post.submitting": { zh: "提交中...", en: "Submitting..." },

  // ── Connect modal ──
  "connect.title": { zh: "对接：", en: "Connect with " },
  "connect.intro.demand": { zh: "提交后直接显示对方联系方式，你们自行对接。", en: "Submit to see their contact and connect directly." },
  "connect.intro.member": { zh: "圈主会把你推给对方，完成牵线。", en: "The host will pass your details to them." },
  "connect.lead": { zh: "留下你的联系方式，", en: "Leave your contact — " },
  "connect.yourName": { zh: "你的称呼", en: "Your name" },
  "connect.yourContact": { zh: "你的联系方式（微信 / WhatsApp / 电话，任填一种）", en: "Your contact (WeChat / WhatsApp / phone — any one)" },
  "connect.msg": { zh: "想说的话（选填）", en: "Message (optional)" },
  "connect.msgPlaceholder": { zh: "一句话介绍你能提供什么", en: "One line on what you can offer" },
  "connect.submit": { zh: "提交，开始对接", en: "Submit & connect" },
  "connect.directTitle": { zh: "直接联系对方", en: "Contact them directly" },
  "connect.theirContact": { zh: "对方联系方式", en: "Their contact" },
  "connect.copy": { zh: "复制", en: "Copy" },
  "connect.copied": { zh: "已复制", en: "Copied" },
  "connect.note": { zh: "联系时备注「澳洲NDIS圈对接」，对方会更快回复", en: "Mention 'NDIS Circle' when you reach out — you'll get a faster reply" },
  "connect.bridgedTitle": { zh: "已转交圈主牵线", en: "Passed to the host" },
  "connect.bridgedSub": { zh: "对方未公开联系方式。圈主已收到你的联系方式，会尽快把你推给对方。想更快？进群直接@圈主。", en: "They haven't shared public contact. The host has your details and will introduce you soon. Faster? Join the group and message the host." },
  "connect.joinGroup": { zh: "进行业交流群", en: "Join community group" },

  // ── Insights (merged: reform + guides + journey + courses) ──
  "ins.title": { zh: "行业情报", en: "Industry Insights" },
  "ins.sub": { zh: "做 NDIS 生意要知道的：改革速递、入行与合规、客户全流程、生意课程", en: "What NDIS operators need to know: reform updates, entry & compliance, the client journey, and courses" },
  "ins.tab.reform": { zh: "改革速递", en: "Reform updates" },
  "ins.tab.guides": { zh: "入行 & 合规", en: "Entry & compliance" },
  "ins.tab.journey": { zh: "客户全流程", en: "Client journey" },
  "ins.tab.courses": { zh: "课程", en: "Courses" },
  "ins.readMins": { zh: "分钟", en: "min read" },
  "ins.askAi": { zh: "AI 深入解读", en: "Ask AI to explain" },
  "ins.courses.soon": { zh: "课程即将推出", en: "Courses coming soon" },
  "ins.courses.soonSub": { zh: "入行注册、合规运营、定价、Support Coordinator 实战——全中文课程正在筹备。想第一时间知道，进群。", en: "Registration, compliance, pricing and SC skills — courses in the works. Join the group to hear first." },
  "ins.journeyNote": { zh: "你的客户会经历的 NDIS 全流程。做这行的人吃透每一步，才能在每个环节专业地承接客户。", en: "The NDIS journey your clients go through. Master every step to professionally support clients at each stage." },

  // ── Language switch ──
  "lang.switch": { zh: "EN", en: "中文" },
};

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "zh",
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    // 微信/隐私模式内核读 localStorage 可能抛异常——必须 try/catch，
    // 否则这个包裹全站的 Provider 一崩，整页白屏。
    try {
      const saved = window.localStorage.getItem("ndis-lang") as Lang | null;
      if (saved === "en" || saved === "zh") setLangState(saved);
    } catch {
      /* localStorage 不可用：用默认中文，不影响渲染 */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("ndis-lang", l);
      document.documentElement.lang = l === "en" ? "en" : "zh-CN";
    } catch {
      /* ignore */
    }
  };

  return (
    <I18nContext.Provider value={{ lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const { lang, setLang } = useContext(I18nContext);
  const t = (key: string) => {
    const entry = DICT[key];
    if (!entry) return key;
    return lang === "en" ? entry.en || entry.zh : entry.zh;
  };
  return { lang, setLang, t };
}
