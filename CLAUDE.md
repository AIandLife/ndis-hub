# 澳洲NDIS圈 — 项目知识库

> 这个文件是给 Claude Code 看的长期记忆。每次开新对话时必须先读这个文件。
> 所有重要决策、内容原则、待办事项都记录在这里。

---

## 🚨 战略转向进行中（2026-06-02，最高优先级）

本站正从「NDIS 知识平台 + 课程」转向 **「BossLink 打法的行业切片：NDIS 商家资源库（B2B 名录）+ 加我私域」**。
完整方案与分阶段路线见 **`docs/bosslink-model.md`（开发前必读）**。

要点：
- 这台机器和 BossLink / 建房圈 / 房产圈是同一套打法（三层飞轮 + 私域沉淀，"加到 Terry"是终点）。
- 后端：**NDIS 独立建库**，schema 设计成 BossLink 的兼容镜像（`supabase/schema.sql`），之后再写同步脚本打通。
- 定位口径：商家↔商家 B2B 资源库（**正好绕开"参与者↔支持工"的合规红线**）。
- ✅ **Supabase 已建好（2026-06-02，Claude 自动建，不用 Terry 手动）**：本机 `supabase` CLI 早已登录（org `lbwaggpunypmzvuwxpzl`），可直接 `supabase projects create/api-keys`。NDIS 项目 ref=`duyxuvlobtupvcvkfmzl`（悉尼），schema 已 push，key 已写入 `.env.local`（已 gitignore）。⚠️ 本机不支持 IPv6，连库 DDL 必须走 pooler：`postgresql://postgres.<ref>:<pw>@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres`。
- 现有三圈是**三个独立库、schema 各不相同、无任何同步**（孤岛）：BossLink=lhuftwlywgemdjthinwl(最全)、房产圈=bxvisisvkfrmcdcqdkib(professional_* 一套)、建房圈/kdr-guide=nojfkmxcpdqzyrayvujv(很轻)。NDIS 用镜像 schema = 第一个能跟 BossLink 对上的圈。
- 阻塞项：~~新开 Supabase~~ 已完成；尚缺 Terry 的真实微信二维码。下一步=把网站接上库 + 写 BossLink→NDIS 的"扫描搬运"脚本。
- 下方旧的"页面结构/定位原则"是转向前的状态，逐步被新方案取代——以 `docs/bosslink-model.md` 为准。

### 🚫 C 端（参与者/家属）整层已下掉（2026-06-02，合规硬规则）

Terry 决定：**本站不做任何面向参与者/家属个人的表面层**，原因是合规风险——给参与者个人 NDIS 建议、或把"病人客户"摆出来吸引 Provider（=暗示平台撮合参与者↔服务方），正中 NDIS Commission 红线。
- 已删 `/families` 页；删首页"你的客户也能用/参与者指南"链接；删 Footer 家属链接；AI 顾问删"参与者/家属"身份切换。
- AI 顾问（`getNDISSystemPrompt()`）重定位为**面向从业者的"行业/生意/合规/经营"顾问**，带硬护栏：不对参与者个人做资格/诊断/医疗/个人计划建议，遇到个人角度问题转成经营视角或转介官方。
- 知识保留，但**一律从"生意培训/从业者视角"讲**，不站病人角度（resources 文章、journey 流程图均已改成"客户旅程地图/从业者必懂"口径）。
- **以后绝不要再加 C 端内容**：不加参与者答疑、不加"帮病人找服务"、不做参与者↔服务方撮合。

---

## 项目基本信息

- **项目名称**：澳洲NDIS圈 / NDIS Hub AU
- **本地路径**：`/Users/tianyuma/ndis-hub`
- **GitHub**：https://github.com/AIandLife/ndis-hub
- **线上地址**：https://ndis-hub-ten.vercel.app
- **Vercel 项目**：aiandlifes-projects/ndis-hub
- **GitHub 账号**：AIandLife（已通过 gh CLI 登录）
- **Vercel 账号**：aiandlife

## 技术栈

- **框架**：Next.js 14 (App Router) + TypeScript
- **样式**：Tailwind CSS（自定义颜色：navy + gold）
- **AI**：Anthropic API（直接 fetch，不用 SDK）
  - 当前模型：`claude-haiku-4-5-20251001`（成本约 $0.005/次对话）
  - 系统提示：`/lib/ndis-knowledge.ts` → `getNDISSystemPrompt()`
- **部署**：Vercel（自动 CI/CD，push main 即部署）
- **数据库**：暂无（v1 全部静态数据）

## 环境变量

| 变量 | 用途 | 设置位置 |
|------|------|---------|
| `ANTHROPIC_API_KEY` | AI 问答接口 | Vercel Production + `.env.local` |
| `RESEND_API_KEY` | 表单提交邮件通知 | Vercel Production + `.env.local` |
| `NOTIFY_EMAIL` | 通知收件邮箱（默认 hello@ndishub.com.au） | Vercel Production + `.env.local` |

### Resend 一次性配置（表单通知邮件）
1. 注册 https://resend.com（免费，100封/天）
2. Dashboard → API Keys → 创建 key
3. Vercel → Settings → Environment Variables → 添加 `RESEND_API_KEY`
4. 本地 `.env.local` 同步添加
5. 表单提交后自动发邮件到 `NOTIFY_EMAIL`（默认 hello@ndishub.com.au）

> 未配置 `RESEND_API_KEY` 时表单仍正常提交，只是不发邮件通知（静默降级）

## 当前页面结构

## 最近改动记录（2026-03-25 本轮开发）

- 导航"找 Provider"→ **"圈内成员"**，定位从参与者找服务改为B2B行业目录
- 全站删除所有"客户线索"、"免费入驻接收线索"等措辞，改为圈子/社群语言
- 首页CTA：→"申请加入，加入行业圈子"
- Provider目录：清空假数据，改为空状态+申请入驻引导
- 删除需求雷达（假数据，定位错误）
- 生态域名更新：澳洲创业圈→澳洲商业联盟，加入澳洲建房圈
- SDA住房和养老服务内容加入AI知识库
- /api/notify 表单邮件通知上线（待Terry配置RESEND_API_KEY）
- favicon：深蓝底金色N（/public/favicon.png）
- 过度免责声明已精简：只保留Footer和About页，删除页面顶部橙色警告框

## 当前页面结构

| 路径 | 功能 | 状态 |
|------|------|------|
| `/` | 首页（从业者优先定位） | ✅ |
| `/ai-advisor` | AI 中文问答（从业者/家属切换） | ✅ |
| `/journey` | NDIS 全流程图（6步交互） | ✅ |
| `/providers` | 行业成员目录 + 申请入驻表单 | ✅ |
| `/providers/[id]` | Provider 详情页 | ✅ |
| `/courses` | 生意辅导课程（3门，含报名表单） | ✅ |
| `/resources` | 知识库 + 活动日历 | ✅ |
| `/families` | 参与者/家属专属页（辅助功能） | ✅ |
| `/about` | 关于页面 | ✅ |
| `/not-found` | 404 页面 | ✅ |
| `/sitemap.xml` | SEO sitemap | ✅ |
| `/robots.txt` | SEO robots | ✅ |

---

## ⚠️ 核心定位原则（每次开发前必须确认）

### 商业模式（已定型，2026-03-25）

**本质：NDIS行业B2B社群 + 知识平台**

- **主要变现**：课程销售 + 会员费（向从业者收）
- **次要变现**：从业者之间的生意撮合（B2B转介绍）
- **绝对不做**：参与者找Provider的撮合/匹配/交易

**受众优先级**：
1. **主**：NDIS从业者（Provider、SC、PM、创业者、SDA投资人、养老机构）
2. **次**：参与者/家属（内容参考，不做撮合，放在 /families）

### 合规红线（极重要，2026-03-25确认）

**2026年7月起**，通过平台让参与者**直接找到并雇佣支持工**的平台，需向NDIS Commission强制注册。

**当前网站安全**：Provider目录 + 信息平台，不触发此规定。

**必须避免的功能**：
- 参与者在平台上直接对接个人支持工
- 平台内置预约/排班/支付
- "实时客户线索"推送给Provider（已删除）

**安全的功能**：
- Provider目录（机构列表，联系方式，用户自行联系）
- 行业资讯、AI问答、课程
- 从业者之间的B2B转介绍

### 关于"华人"定位

- **中文版**：可以说"华人从业者"、"中文服务"，但不要求入驻者必须是华人
- **Provider目录**：已改为"行业成员目录"，不限华人，任何NDIS从业者可申请
- **其他语言版本**（待做）：英文版禁止说"华人"，改说"CALD communities"

---

## Provider 数据（重要）

**文件**：`/lib/providers-data.ts`
- **当前状态**：PROVIDERS 数组为空，等待真实成员审批后手动添加
- **已删除**：6个假华人mock数据、WEEKLY_DEMAND需求雷达（硬编码假数据）
- **入驻流程**：用户填写申请表单 → `/api/notify` 发邮件给Terry → Terry审批 → 手动加入数组
- **下一步**：接Supabase实现真正的数据库驱动审批系统（下一阶段）

> 添加真实Provider时：在 PROVIDERS 数组中加入对象，字段参考 Provider interface

---

## 生态系统关系（已更新，2026-03-25）

```
澳洲商业联盟（www.australiabusinessalliance.com）← 总平台
    ├── 澳洲NDIS圈（ndis-hub-ten.vercel.app）← 当前项目
    ├── 澳洲房产圈（auspropertycircle.com）
    └── 澳洲建房圈（ausbuildcircle.com）
```

> 注意：原"澳洲创业圈"已改名为"澳洲商业联盟"，原"澳洲房产AI"已改名为"澳洲房产圈"

---

## NDIS 知识库维护

**文件**：`/lib/ndis-knowledge.ts`
- `getNDISSystemPrompt()`：AI 系统提示，包含完整知识库
- `PRACTITIONER_QUESTIONS`：从业者示例问题（10条，含SDA和养老）
- `FAMILY_QUESTIONS`：家属示例问题（切换后显示）

**知识库已覆盖**：
- NDIS基础、申请流程、计划管理
- Support Coordinator、Plan Manager
- 2026年改革政策
- SDA住房（投资/入行指南）←新增
- 养老服务与NDIS衔接 ←新增
- 早期干预、心理健康、辅助技术
- 华人NDIS常见问题
- NDIS价格指南

**更新原则**：
- NDIS 政策每年更新，每次大改革后需要更新知识库
- 所有内容来源必须是 ndis.gov.au 或 ndiscommission.gov.au

---

## 表单与通知系统

**文件**：`/app/api/notify/route.ts`

已实现的通知类型：
- `provider_register`：Provider申请加入成员目录
- `course_inquiry`：课程报名咨询

表单提交 → POST `/api/notify` → Resend API → 邮件到 `NOTIFY_EMAIL`

---

## 当前待完成清单

### 功能层面
- [x] 表单发送邮件通知（/api/notify + Resend，Terry需配置RESEND_API_KEY）
- [ ] **Supabase接入**：Provider申请 → 数据库 → Terry后台审批 → 自动上线（下阶段重点）
- [ ] 移动端全面测试（375px不变形）
- [ ] 课程询价流程确认（只做询价，不做在线支付）

### 内容层面
- [ ] 联系电话替换为真实电话（Footer、Courses页面）
- [ ] 活动日期更新为真实活动
- [ ] 课程价格/内容与合作方对齐

### SEO/增长
- [ ] Google Analytics 或 Vercel Analytics 接入
- [ ] 自定义域名（目前是 ndis-hub-ten.vercel.app）

### 下一阶段（会员系统）
- [ ] Supabase + 用户注册/登录
- [ ] Provider申请 → 审批流程（Terry后台）
- [ ] 会员收费（Stripe）
- [ ] 会员专属内容/功能

---

## 部署流程

```bash
# 本地开发
npx next dev -p 3005

# 构建验证
npx next build

# 部署上线
git add -A && git commit -m "描述" && git push
vercel --prod
```

每次 push 到 main，Vercel 会自动部署（CI/CD 已配置）。

---

## 注意事项 & 避坑

1. **API Key**：ANTHROPIC_API_KEY 在 Vercel 环境变量中，本地需要 `.env.local`
2. **模型选择**：用 `claude-haiku-4-5-20251001`，不要换成 opus（费用高20倍）
3. **AI 接口**：用直接 fetch 而非 Anthropic SDK（SDK 在 Vercel 上有连接问题）
4. **图片**：目前无图片，避免使用外部图片域名（next.config.mjs 需要配置）
5. **Provider 详情页**：`/providers/[id]` 是 dynamic route，Next.js 14 用 `params.id`（不是 `use(params)`）
6. **Tailwind 颜色**：navy 和 gold 是自定义色，在 `tailwind.config.ts` 中定义
7. **PROVIDERS 数组为空**：正常，等待真实审批成员，不是bug

---

*最后更新：2026-03-25*
*维护者：Terry（通过 Claude Code）*
