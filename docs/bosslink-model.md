# NDIS 圈 = BossLink 打法的行业切片（战略 + 路线）

> 定稿 2026-06-02。这份文档说明 NDIS 站为什么改、改成什么、分几步走。
> 开发前连同 `CLAUDE.md` 一起读。

## 一、这台机器是什么（Terry 的统一打法）

BossLink / NDIS 圈 / 建房圈 / 房产圈 **不是四个网站，是同一台机器的四个行业切片**。机器逻辑（出自 Terry 2026-03-20、04-05、05-06 录音）：

- **三层飞轮**：① 向外发射信号（AI 案例 / 线下活动 / "100 个老板共用一张表"）→ ② 网站承接 → ③ 利润引擎（IP 孵化 / 付费采访 / 企业年合作 / 跨行撮合佣金）。变现动作本身又当第一层的对外内容，闭环。
- **护城河是沉淀，不是工具**。竞品抄得走功能，抄不走积累的人脉。
- **真实定位**：以 Terry 为中心的私域人脉圈。**"加到 Terry" 才是终点**，不是做成重型 AI 匹配网络（Terry 本人 05-06 已对"AI 撮合作为核心"存疑——那是大模型该赢的赛道）。

## 二、NDIS 站的新定位（一句话）

从「知识平台 + 课程」改成 **「澳洲 NDIS 商家资源库（B2B 名录）+ 加我私域」**。

落地形态：
1. **冷启动**：① BossLink 圈内 NDIS/养老成员迁入（✅ 2026-06-11 已迁 30 位，仅公开字段不含联系方式）；② 爬澳洲+海外名录灌 `resources`（`is_scraped=true`）。目录自己铺满。
2. **钩子**：资源卡展示每位老板的「供/需」，看中了 →「想对接？进群聊」→ 加 Terry 私域。**⚠️ 认领机制已撤**（Terry 2026-06-11 拍板：不做"这是我的机构？认领"，资源靠我们爬取/迁移铺满，不依赖机构自认领）。入驻保留=「免费入驻」自助填表。
3. **沉淀**：填表 / 想对接 → 扫码进群（首页 `#join`，二维码=Terry 个人微信，对外口径写"同业交流群"）。
4. **撮合**：商家↔商家（supplier↔provider）。复用 BossLink 已有的 `connection_requests` / `member_matches`，不重写。
5. **对接大厅 `/board`**（2026-06-12 上线，Fable 提出的核心定位）：**网站本质=需求收割机**。聚合全行业「在找什么」（成员档案的需 + demands 表自助发布），任何人不入驻也能免费挂需求 → Terry 审核 → 公开展示 → 「我能对接」导进群。每条需求 = Terry 转介佣金的库存。demands 表镜像 BossLink；联系方式只存库不外显，公开读走 /api/demands 服务端过滤。

### 合规对齐（关键）
红线是「不能撮合参与者↔支持工」。本定位做的是 **商家↔商家 B2B**——和红线方向一致，**既服务打法又自动绕开合规**。站点对外口径始终是"NDIS 行业商家资源库"，不是"帮参与者找服务"。

## 三、后端决定（Terry 2026-06-02 拍板）

**NDIS 独立建库，之后再打通同步**（不是直接共用 BossLink 的库）。

为让这条路将来不被坑：**NDIS 的 Supabase schema 设计成 BossLink 的「兼容镜像」**——重叠表（profiles / applications / resources / connection_requests / settings）表名、字段名完全一致，只多一个 `circle` 标签列。
→ 见 `supabase/schema.sql`（已就绪，可直接在 Supabase SQL Editor 运行）。
→ 将来"打通同步" = 按 `email`(applications) / `source_url`(resources) upsert 进 BossLink 同名表的直通脚本，不需要结构对账。

BossLink 库参考：`~/projects/australia-startup-hub/supabase/schema.sql`。

## 四、分阶段路线

| 阶段 | 内容 | 谁做 | 状态 |
|------|------|------|------|
| 0 | 首页清理假数据 + 第一屏改"扫码进群" + `#join` 转化区 | Claude | ✅ 已完成（未 push）|
| 1 | **定位重构**：首页/导航从"知识平台"改成"NDIS 商家资源库 + 加我"，课程降级为次要 | Claude | ✅ 基本完成（C 端整层下掉；AI/知识库/journey/resources 转从业者口径；`/providers` 改成"NDIS 商家资源库"+真实公开机构种子(待认领)+认领钩子；首页加资源库展示区）。种子=无数据库版，写在 `lib/providers-data.ts`，填表走 /api/notify 邮件 |
| 2 | **建 Supabase 项目 + 跑 schema** | Claude（自动） | ✅ 完成。CLI 已登录，Claude 自动建：ref=`duyxuvlobtupvcvkfmzl`(悉尼)，schema+种子已 push，key 进 `.env.local` |
| 3 | 接 Supabase client；自助填表写 `applications`；目录/首页读 `resources` | Claude | ✅ 完成并端到端验证。`lib/supabase/*`、`lib/resources.ts`、`/api/apply`；9 真实种子在 `resources`(approved)；anon 公开可读；表单写 applications(pending) 已验证 |
| 4 | **冷启动填库**：BossLink 圈内成员迁入 + 爬澳洲/海外名录 | Claude | 🔶 大头已完成（2026-06-11 迁入 30 位 BossLink NDIS/养老华人成员，目录 39 条）。海外/华人公开资源爬虫可继续扩充 |
| 5 | 真实微信群/个人二维码进 `settings`，全站二维码数据驱动 | Terry 给码 + Claude 接 | 待办（缺 Terry 的码）|
| 6 | **审批闭环**：后台审批 `applications` → 通过后生成 `resources`(claimed) 上目录；设 admin | Claude | 待办（**当前缺口**：自助填的申请进了 applications，但还没"审批→上目录"这步）|
| 7 | B2B 对接请求（connection_requests）+（可选）复用 BossLink 撮合 | Claude | 待办 |
| 8 | 写 BossLink→NDIS "扫描搬运"脚本（读 BossLink 库挑 NDIS 老板搬进来） | Claude | 待办 |

## 五、现实边界（替 Terry 踩刹车）

- **别重造 AI 撮合引擎**。MVP 只要"目录满 + 能自助填 + 扫码加你"，哪怕撮合永不跑通，IP 背书 + 私域沉淀已到手（Terry 的下限："跑不通也纯赚人脉"）。
- 课程、AI 顾问、流程图 = 第二层增值留着，但不再是首页主角。
- 别在站内做参与者↔支持工的任何匹配/预约/支付（合规红线）。

## 六、阻塞项：需要 Terry 提供

1. **Supabase 项目**（新建一个，独立于 BossLink）→ 给我 `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`。
2. **真实微信二维码**（群码 + 你个人号）→ 命名后进 `public/` 或填进 `settings`。
3. （可选）你的「圈主」一句话定位，决定首页上多少"Terry 本人"。
