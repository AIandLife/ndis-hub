// NDIS Knowledge Base for RAG-based AI Q&A
// Sources: ndis.gov.au, NDIS Commission, 2025-26 Reform updates

// Declare system prompt as a function to avoid hoisting issues
export function getNDISSystemPrompt(): string {
  return `你是「澳洲NDIS圈」平台的AI顾问，专门为澳洲华人社区提供NDIS（国家残障保险计划）和养老（Aged Care）方面的专业中文指导。

你的回答原则：
1. 用简单易懂的中文回答，避免过度专业术语，但保留重要的英文专业术语（如Support Coordinator、Plan Manager），首次出现时加中文解释
2. 给出有方向性的建议，不要只说"请咨询专业人士"，要告诉用户下一步具体怎么做
3. 分层回答：先给出大方向（1-2句），再说具体步骤，最后说何时需要专业帮助
4. 如果涉及具体金额或法律权利，加上"请以NDIS官网最新信息为准"
5. 对2026年改革政策保持更新意识，主动提醒改革影响
6. 对华人家庭文化背景保持敏感，理解他们面临的语言和文化挑战
7. 如果用户情绪焦虑或困惑，先表示理解，再给出清晰指引

你的知识库覆盖：
${getKnowledgeBase()}

补充专业知识：
${EXTENDED_KNOWLEDGE_INLINE}

重要免责声明：本AI提供的信息仅供参考，不构成法律、医疗或财务建议。重要决定请咨询持牌NDIS专业人士。`;
}

// Keep backward compat export
export const NDIS_SYSTEM_PROMPT = "";

function getKnowledgeBase(): string {
  return `
## NDIS基础知识

### 什么是NDIS？
NDIS（National Disability Insurance Scheme）是澳大利亚政府的国家残障保险计划，为18岁以下有永久性、显著残障的人士提供资金支持，帮助他们获得所需的服务和支持。注意：65岁以上改为Aged Care体系。

### 谁有资格申请NDIS？
资格要求（需同时满足）：
- 年龄：申请时未满65岁
- 居住：澳大利亚公民、永久居民、或受保护的特殊类别签证持有人
- 残障：有永久性残障，显著影响日常生活活动
- 常见符合条件：自闭症（ASD）、脑瘫、智力残障、视听障碍、精神健康（需严重且持续）

### 申请流程（第一步：资格申请）
1. 准备材料：诊断证明（GP/专科医生报告）、功能评估报告
2. 提交申请：电话1800 800 110，或通过myplace portal在线申请，或联系当地NDIS办公室
3. 等待Access Request决定：通常4-6周
4. 如果批准 → 进入计划制定阶段
5. 如果拒绝 → 可在28天内申请内部审查（Internal Review）

### NDIS计划制定
批准后会有计划制定会议（Planning Meeting），与NDIS规划师（Planner）或LAC（Local Area Coordinator）讨论：
- 你的生活目标和需要
- 所需支持类型和频率
- 计划资金金额

计划资金三大类：
- **Core支持**：日常活动协助、社区参与、交通，最灵活
- **Capacity Building支持**：技能建设、就业、关系、日常生活能力
- **Capital支持**：辅助技术（设备）、家居改造，专款专用

### 计划管理三种方式
1. **NDIA管理（Agency-managed）**：NDIS直接付款给注册Provider，最简单但选择少
2. **计划管理（Plan-managed）**：由Plan Manager管理资金，可选注册和未注册Provider
3. **自管（Self-managed）**：自己管理，灵活性最高，需自己保存发票，可找任何Provider

### Support Coordinator（支持协调员）
SC帮助你：
- 找到合适的Provider
- 协调不同服务
- 解决问题和投诉
- 准备计划审查

注意：SC不是Plan Manager，SC协助协调，PM负责财务管理。

### Plan Manager（计划管理员）
PM帮助你：
- 处理Provider发票付款
- 跟踪预算使用
- 提供财务报告
- 不负责服务协调

### 找到合适的Provider
步骤：
1. 在NDIS Provider Finder（ndis.gov.au）搜索注册Provider
2. 考虑因素：语言（中文服务）、地区、服务类型、评价
3. 与Provider面谈，签署服务协议（Service Agreement）
4. 注意：自管参与者可选未注册Provider

好Provider的标准：
- 有NDIS注册资质（Registration number）
- 有清晰的服务协议
- 透明收费，与NDIS价格指南一致
- 有中文沟通能力（如果需要）

### 计划审查（Plan Review）
- 计划通常每1-3年审查一次
- 你也可以申请Non-Scheduled Review（计划内资金不够用时）
- 审查时记录证据：目标进展、额外需求

### 2026年改革重点（2025-26 Reform）
- **支持需求评估**：从文件审核改为约3小时面试（Support Needs Assessment）
- **新规划框架**：2026年中推出，计划类型和分配方式会有变化
- 建议：现有参与者了解改革动态，与SC提前沟通应对策略

### 如何投诉Provider
1. 先与Provider直接沟通
2. 联系NDIS Quality and Safeguards Commission：1800 035 544
3. 或在线投诉：ndiscommission.gov.au

### 自闭症（ASD）NDIS申请特别指南
- 需要由注册心理学家或儿科医生的正式诊断报告
- 功能评估（OT评估）非常重要，说明日常生活影响
- 早期干预（Early Childhood）0-9岁走Early Childhood通道，不同流程
- 常见支持：语言治疗（SLT）、职业治疗（OT）、ABA行为治疗、社交技能小组

### 养老（Aged Care）衔接
65岁时NDIS参与者转为Aged Care体系：
- My Aged Care：myagedcare.gov.au，1800 200 422
- 需要进行ACAT（Aged Care Assessment Team）评估
- 转换时原有NDIS支持会逐步调整
- 建议：提前6-12个月开始准备

### 成为Provider（如何入行）
1. 注册成为NDIS Provider：需通过NDIS Commission审核
2. 所需资质：根据服务类型不同（如SIL需要更高资质）
3. NDIS Worker Screening Check：所有直接服务人员必须有
4. 质量认证：可能需要NDIS Practice Standards审核
5. 定价：须符合NDIS Price Guide（不能超过价格上限）

### 常见华人NDIS问题

Q：语言不好，申请会更难吗？
A：可以申请翻译服务（TIS National：131 450），NDIS会议可以有翻译陪同。很多华人Provider和SC也提供中文服务。

Q：签证身份对NDIS资格有影响吗？
A：有！必须是公民、永久居民（PR）、或Protected Special Category Visa。持临时签证通常无资格。

Q：NDIS资金用完了怎么办？
A：联系你的SC或Plan Manager，如果是因为合理需求增加，可以申请Non-Scheduled Review。注意区分"真正用完"和"记账错误"。

Q：孩子的NDIS计划可以用来付私立学校费用吗？
A：不可以。NDIS资金不能用于学费、日常食物、住房等"普通生活支出"。

Q：我对NDIS决定不满意怎么办？
A：28天内申请Internal Review → 不满意可申请AAT（Administrative Appeals Tribunal）复审。`;
}

// Questions for practitioners (primary audience)
export const PRACTITIONER_QUESTIONS = [
  "如何注册成为NDIS Provider？需要哪些资质？",
  "2026年NDIS改革对Provider有什么影响？",
  "NDIS价格指南怎么看？我能收多少钱？",
  "Support Coordinator和Specialist SC有什么区别？",
  "NDIS Worker Screening Check怎么申请？",
  "Plan Manager如何处理参与者预算超支问题？",
  "如何应对NDIS Quality and Safeguards Commission的审查？",
  "华人Provider如何开拓第一批客户？",
  "SDA住房投资回报怎么样？如何入行成为SDA Provider？",
  "同时做NDIS和养老服务，需要分开注册吗？",
];

// Questions for families (secondary audience — link to /families page)
export const FAMILY_QUESTIONS = [
  "我的孩子刚被诊断为自闭症，第一步应该怎么做？",
  "NDIS的Core Support和Capacity Building有什么区别？",
  "怎么投诉一个不提供服务的Provider？",
  "NDIS参与者65岁以后怎么办？",
];

// Default shown in AI advisor (practitioner-first)
export const SAMPLE_QUESTIONS = PRACTITIONER_QUESTIONS;

// Used inline in system prompt
const EXTENDED_KNOWLEDGE_INLINE = `
## NDIS价格指南（Price Guide）

Provider收费不能超过NDIS价格指南上限。常见服务类别上限（2024-25）：
- 日常活动协助（周一至周五白天）：约 $67.56/小时
- 日常活动协助（周末）：约 $94.48/小时
- Support Coordination：约 $100.14/小时
- Specialist Support Coordination：约 $190.54/小时
- 职业治疗（OT）：约 $193.99/小时
- 言语治疗（SLT）：约 $193.99/小时
注意：价格每年更新，请以NDIS官网最新价格指南为准。

## Early Childhood通道（0-9岁）

0-9岁有发育迟缓或残障的儿童可走Early Childhood通道，由Early Childhood Partner（ECP）提供支持：
- 不需要正式NDIS申请和诊断即可获得初步支持
- ECP评估后决定是否转入完整NDIS计划
- 9岁以上需要转入正式NDIS流程
- 常见机构：由NDIA在各地区指定，可拨打NDIS 1800 800 110查询当地ECP

## 住宿支持（SIL/SDA）

Supported Independent Living (SIL)：
- 帮助参与者在共享住宅或独立住宅中生活
- 支持日常活动、个人护理、家务等
- 由注册Provider提供，需要特别的SIL申请流程

Specialist Disability Accommodation (SDA)：
- 专为有严重功能障碍人士设计的住房
- 房屋本身由SDA注册Provider提供
- 并非所有NDIS参与者都符合SDA资格

## NDIS申请被拒后怎么办

1. **内部审查（Internal Review）**：28天内提出，NDIS重新评估决定
2. **AAT（行政上诉法庭）**：如不满足内部审查结果，可进一步上诉
3. **证据质量很关键**：更多、更详细的功能评估报告往往能改变结果
4. **Law Access等法律援助机构**可提供免费法律建议

## 关于CALD（文化和语言多元化）参与者

华人参与者的特殊权利：
- 有权申请专业翻译（TIS National 131 450，NDIS会议免费）
- 书面资料可申请中文翻译
- NDIS规划师应考虑文化因素
- 如果感觉文化因素没有被考虑，可以在申诉中提出

## 心理健康与NDIS

心理社交残障（Psychosocial Disability）可申请NDIS，但需满足：
- 诊断来自精神科医生或心理学家
- 残障是严重且持续的（permanent）
- 残障显著影响日常生活参与
常见支持：心理社区支持、支持协调、日常活动支持

注意：焦虑/抑郁本身不自动满足资格，需要证明功能影响程度。

## Roster of Care（护理时间表）

对于需要大量日常护理支持的参与者，NDIS会要求提交"Roster of Care"，
详细说明每天/每周需要什么支持。
这通常由Support Coordinator或OT协助准备。

## 如何选择Plan Manager（计划管理员）

好的Plan Manager应该：
- 7天内处理发票（NDIS规定的服务标准）
- 提供在线预算查看工具
- 主动提醒预算即将耗尽
- 中文沟通能力（如果需要）
- 不强迫你用特定Provider
避免：同时也是你的Provider（利益冲突风险）

## 紧急情况和危机支持

如果参与者处于危机状况且NDIS支持中断：
- 联系NDIS早期干预：1800 800 110（紧急）
- 若涉及安全风险，联系当地危机支持或000
- NDIS有Short Term Accommodation (STA，短期住宿）和Crisis Support选项
- SC有责任协助处理紧急情况

## Provider取消政策

NDIS规定Provider取消政策：
- 取消通知 < 2个工作日：Provider可收取短期通知费（通常50%）
- 具体取消条款在服务协议中明确
- 参与者有权了解Provider的取消政策，并签署前确认接受

## NDIS Worker Screening Check

所有NDIS注册Provider的直接支持工作人员必须持有NDIS Worker Screening Check：
- 在各州/领地申请
- 检查内容：犯罪记录、性犯罪、虐待儿童等
- 有效期5年（全国互认）
- 参与者有权查询为其提供服务的工作人员是否持有有效的Worker Screening

## SDA住房（Specialist Disability Accommodation）— 投资与入行指南

### 什么是SDA？
SDA是专为有严重功能障碍的NDIS参与者设计的特殊住房，由NDIS资金支付房租（而非普通市场租金）。开发商/投资人建造并注册SDA房产，NDIS参与者入住后NDIS直接向SDA Provider支付租金。

### SDA的四种设计类别（Design Categories）
1. **Improved Liveability**：改善采光、空间布局，适合认知或感官障碍
2. **Fully Accessible**：完全无障碍，适合轮椅用户
3. **High Physical Support**：最高规格，需配备辅助技术预留位、紧急呼叫系统等
4. **Robust**：加固材料，适合有破坏性行为的参与者

### SDA投资回报概览（2024-25）
- SDA房产年收益率通常远高于普通住宅（8%-15%不等，视类别和地区）
- NDIS按参与者人数和设计类别支付SDA费用，最高单套可达约$50,000+/年
- 需求缺口大：全澳SDA房源严重不足，尤其High Physical Support类别
- 参考数据请以NDIS官网SDA Payment Amounts为准

### 如何成为SDA Provider（入行步骤）
1. **注册NDIS Provider**：先完成标准NDIS Provider注册
2. **SDA专项注册**：在NDIS Commission申请SDA注册类别
3. **设计合规**：房产必须符合NDIS SDA Design Standard（2021版）
4. **建筑认证**：需获得认可的SDA Assessor出具合规证书
5. **登记房源**：在NDIS SDA登记册上登记，参与者和支持协调员可查找

### SDA与普通投资房的关键区别
- 租客：NDIS参与者（通常长期稳定入住）
- 付租方：NDIS（政府背书，收款稳定）
- 要求：建筑必须符合SDA Design Standard，改建成本高但补贴也高
- 退出：将来可转为NDIS注册住房或出售给其他SDA Provider

### 华人投资者/开发商常见问题

Q：普通住宅可以改建成SDA吗？
A：可以，但改建成本较高（通常需要专业无障碍改造），且必须通过SDA Assessor认证。新建项目更容易做到设计达标。

Q：SDA参与者的入住从哪里来？
A：NDIS参与者通过Support Coordinator或NDIA寻找SDA房源，SDA Provider也可主动联系NDIS和SC网络。维持满租是运营关键。

Q：投资SDA有没有政府补贴？
A：SDA本身不是政府补贴项目，而是NDIS资金定向支付体系。部分州有针对无障碍住房的额外激励，需查询各州住房部门。

Q：最值得投资的SDA类别是哪个？
A：High Physical Support需求最大、单价最高，但建造要求最严格。Improved Liveability入门门槛相对低，适合第一个SDA项目。建议先咨询SDA专业顾问和NDIS注册规划师。

## 养老服务（Aged Care）与NDIS的衔接

### 65岁转养老流程
NDIS参与者在65岁生日后转入My Aged Care体系：
1. 提前6-12个月联系My Aged Care：myagedcare.gov.au，1800 200 422
2. 申请ACAT（Aged Care Assessment Team）评估
3. 根据评估结果进入Home Care Package或Residential Care
4. NDIS计划逐步关闭，Aged Care资金接替

### 同时做NDIS和养老服务的Provider
很多华人机构同时提供NDIS支持和Home Care Package服务：
- 需分别注册：NDIS Provider注册 + My Aged Care Approved Provider注册
- 资金完全独立，不能混用
- 优势：同一套团队和系统，服务同一批客户群体，效率高
- 华人养老服务需求大，语言匹配是核心竞争力

## 辅助技术（Assistive Technology/AT）

AT属于Capital支持类别，专款专用：
- 低成本AT（< $1500）：可直接购买
- 高成本AT（> $1500）：需要专业人士（通常OT）的评估报告
- 常见AT：轮椅、助听器、特殊通讯设备、家居改造
- AT购买后属于参与者，Provider不能拿回
`;

