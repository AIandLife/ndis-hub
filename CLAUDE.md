# 澳洲NDIS圈 — 项目知识库

> 这个文件是给 Claude Code 看的长期记忆。每次开新对话时必须先读这个文件。
> 所有重要决策、内容原则、待办事项都记录在这里。

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

本地开发：复制 `.env.local.example` 为 `.env.local`，填入 key。

### Resend 一次性配置（表单通知邮件）
1. 注册 https://resend.com（免费，100封/天）
2. Dashboard → API Keys → 创建 key
3. Vercel → Settings → Environment Variables → 添加 `RESEND_API_KEY`
4. 本地 `.env.local` 同步添加
5. 表单提交后自动发邮件到 `NOTIFY_EMAIL`（默认 hello@ndishub.com.au）

> 未配置 `RESEND_API_KEY` 时表单仍正常提交，只是不发邮件通知（静默降级）

## 当前页面结构

| 路径 | 功能 | 状态 |
|------|------|------|
| `/` | 首页（从业者优先定位） | ✅ |
| `/ai-advisor` | AI 中文问答（从业者/家属切换） | ✅ |
| `/journey` | NDIS 全流程图（6步交互） | ✅ |
| `/providers` | Provider 目录 + 需求雷达 + 入驻表单 | ✅ |
| `/providers/[id]` | Provider 详情页 | ✅ |
| `/courses` | 生意辅导课程（3门，含报名表单） | ✅ |
| `/resources` | 知识库 + 活动日历 | ✅ |
| `/families` | 参与者/家属专属页（辅助功能） | ✅ |
| `/about` | 关于页面 | ✅ |
| `/not-found` | 404 页面 | ✅ |
| `/sitemap.xml` | SEO sitemap | ✅ |
| `/robots.txt` | SEO robots | ✅ |

---

## 核心定位原则（每次写内容前必须确认）

### 网站核心受众（主）
**NDIS 行业从业者**：Provider、Support Coordinator、Plan Manager、入行创业者、养老机构

### 辅助受众（次）
**参与者/家属**：有需要的 NDIS 参与者及其家庭——他们是从业者的客户，内容放在 `/families`，不是主线

### 变现逻辑
1. 从业者有预算 → 他们才是付费用户
2. 平台为从业者提供：客户线索、课程、圈子、合规知识
3. `/families` 页面是给从业者展示的"你的客户可以用这个" — 增加从业者对平台的信任感

---

## 语言与内容策略（极其重要）

### 中文版（当前）
- **受众**：生活在澳洲的华人社区
- **可以说**："专为华人从业者打造"、"我们是华人社区"、"中文服务"
- **语气**：亲切、社群感、华人圈子氛围

### 英文版（待做，第二阶段）
- **受众**：所有澳洲居民，不限族裔
- **禁止说**："专为华人"、"华人社区"、"Chinese community"
- **改说**："for CALD communities in Australia"、"multicultural"
- **语气**：专业、包容、中性

### 越南文版（待做，第二阶段）
- **受众**：澳洲越南裔社区
- **禁止说**：任何中文/华人相关表达
- **内容重点**：越南裔 NDIS 参与者和从业者的具体痛点（与华人痛点不同）
- **语气**：体现越南社区文化，不是中文内容的直接翻译

### 阿拉伯文版（待做，第二阶段）
- **技术注意**：RTL（从右到左）排版，需要单独处理
- **受众**：澳洲阿拉伯裔、穆斯林社区
- **内容重点**：难民背景、家庭式照护文化、宗教节日对服务安排的影响
- **禁止说**：任何华人相关表达

### 印地文版（待做，第二阶段）
- **受众**：澳洲印度裔社区（增长最快的移民群体）
- **内容重点**：印度家庭对残障的文化态度、签证与 NDIS 资格的关系

### 核心原则
> **每种语言版本 = 重新为该文化写内容，不是翻译**
> 内容框架（导航、功能）可以共用，但文案、案例、语气必须针对该语言的受众重新写

---

## 多语言实施计划

### 当前阶段：中文版打磨期
**在开始任何多语言工作之前，中文版必须完成以下所有项目：**

#### 功能层面（待完成）
- [x] 表单实际发送通知（/api/notify 已实现，接 Resend；Terry 需在 Vercel 添加 RESEND_API_KEY）
- [ ] Provider 需求雷达数字改为可管理的真实数据（或至少可配置）
- [ ] 移动端全面测试（375px 不变形）
- [ ] 真实 Provider 数据替换 mock 数据（需 Terry 提供）
- [ ] 课程实际购买/支付流程（或明确只做询价不做在线支付）

#### 内容层面（待完成）
- [ ] 联系电话替换为真实电话（Footer、Courses 页面）
- [ ] 活动日期更新为真实活动
- [ ] 课程价格/内容与合作方对齐

#### SEO/增长（待完成）
- [ ] Google Analytics 或 Vercel Analytics 接入
- [ ] 自定义域名（目前是 ndis-hub-ten.vercel.app）

### 第二阶段：多语言（中文版定型后）
**技术方案**：`next-intl` 框架
**顺序**：英文 → 越南文 → 阿拉伯文 → 印地文
**每种语言**：需要针对该受众重写文案，不是机器翻译

---

## 生态系统关系

```
澳洲创业圈（auscircle.com）← 总平台
    ├── 澳洲NDIS圈（ndis-hub-ten.vercel.app）← 当前项目
    └── 澳洲房产AI（aussie-property.vercel.app）
```

- NDIS圈 → 创业圈：NDIS Provider 想找更大商业资源时
- 创业圈 → NDIS圈：创业者想进入 NDIS 行业时
- Footer 有互链，首页有生态展示区

---

## NDIS 知识库维护

**文件**：`/lib/ndis-knowledge.ts`
- `getNDISSystemPrompt()`：AI 系统提示，包含完整知识库
- `PRACTITIONER_QUESTIONS`：从业者示例问题（AI顾问页面主问题）
- `FAMILY_QUESTIONS`：家属示例问题（切换后显示）

**更新原则**：
- NDIS 政策每年更新，每次大改革后需要更新知识库
- 2026 年新规划框架上线后需要重大更新
- 所有内容来源必须是 ndis.gov.au 或 ndiscommission.gov.au

---

## Provider 数据

**文件**：`/lib/providers-data.ts`
- 当前：6 个 mock Provider（用于演示）
- 待替换：需要 Terry 提供真实华人 Provider 联系方式
- 需求雷达数字（`WEEKLY_DEMAND`）：当前为硬编码，待改为可配置

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

---

*最后更新：2026-03-23*
*维护者：Terry（通过 Claude Code）*
