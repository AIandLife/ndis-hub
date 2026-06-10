-- NDIS 商家资源库冷启动种子：澳洲公开可查的知名 NDIS 机构与行业供应商。
-- 全部 is_scraped=true（公开信息整理·待认领）、status='approved'（公开可见）。
-- 结构化字段塞在 contact_info(jsonb)，以保持与 BossLink resources 表兼容。
-- 幂等：按 source_url 去重。

INSERT INTO public.resources (title, category, circle, description, location, tags, contact_info, is_scraped, source_url, status)
VALUES
(
  'Life Without Barriers', 'provider', 'ndis',
  '澳洲规模最大的 NDIS 服务机构之一，覆盖全澳，提供支持性独立生活（SIL）、社区支持、心理健康与就业支持等。',
  '全澳 National',
  ARRAY['Support Coordination','Core Supports','SIL/SDA住房'],
  '{"languages":["英文"],"website":"https://www.lwb.org.au","specialties":["SIL","心理健康","就业支持"],"ndisRegistered":true,"state":"National"}'::jsonb,
  true, 'https://www.lwb.org.au', 'approved'
),
(
  'Aruma', 'provider', 'ndis',
  '由 House with No Steps 与 The Tipping Foundation 合并而成的大型残障服务机构，覆盖 NSW、QLD、VIC、ACT，提供住宿、就业、治疗与社区参与。',
  '悉尼 Sydney',
  ARRAY['Core Supports','SIL/SDA住房','Therapeutic Supports'],
  '{"languages":["英文"],"website":"https://www.aruma.com.au","specialties":["住宿支持","社区参与"],"ndisRegistered":true,"state":"NSW/QLD/VIC/ACT"}'::jsonb,
  true, 'https://www.aruma.com.au', 'approved'
),
(
  'Achieve Australia', 'provider', 'ndis',
  '深耕残障服务 65 年以上的 NSW 机构，专注个性化支持计划，提供住宿、社区参与与就业支持。',
  '悉尼 Sydney',
  ARRAY['Core Supports','Community Access','SIL/SDA住房'],
  '{"languages":["英文"],"website":"https://www.achieveaustralia.org.au","specialties":["个性化支持","社区融合"],"ndisRegistered":true,"state":"NSW"}'::jsonb,
  true, 'https://www.achieveaustralia.org.au', 'approved'
),
(
  'Scope Australia', 'provider', 'ndis',
  '治疗服务、沟通支持与辅助技术领域的 VIC 领先机构，提供日间项目、喘息照护与就业支持。',
  '墨尔本 Melbourne',
  ARRAY['Therapeutic Supports','辅助技术 AT','Community Access'],
  '{"languages":["英文"],"website":"https://www.scopeaust.org.au","specialties":["治疗服务","沟通支持","辅助技术"],"ndisRegistered":true,"state":"VIC"}'::jsonb,
  true, 'https://www.scopeaust.org.au', 'approved'
),
(
  'Cerebral Palsy Alliance', 'provider', 'ndis',
  '脑瘫及相关残障领域的知名机构，提供治疗、早期干预、辅助技术与研究。',
  '悉尼 Sydney',
  ARRAY['Therapeutic Supports','Early Childhood','辅助技术 AT'],
  '{"languages":["英文"],"website":"https://www.cerebralpalsy.org.au","specialties":["脑瘫","早期干预"],"ndisRegistered":true,"state":"NSW"}'::jsonb,
  true, 'https://www.cerebralpalsy.org.au', 'approved'
),
(
  'Endeavour Foundation', 'provider', 'ndis',
  '澳洲历史悠久的大型残障服务机构之一，主营 QLD，提供学习与就业、社区参与与住宿支持。',
  '布里斯班 Brisbane',
  ARRAY['Core Supports','Community Access','就业支持'],
  '{"languages":["英文"],"website":"https://www.endeavour.com.au","specialties":["就业支持","技能培训"],"ndisRegistered":true,"state":"QLD"}'::jsonb,
  true, 'https://www.endeavour.com.au', 'approved'
),
(
  'Yooralla', 'provider', 'ndis',
  '维州历史最悠久的残障服务机构之一，提供住宿、个人护理、治疗与社区支持。',
  '墨尔本 Melbourne',
  ARRAY['Core Supports','SIL/SDA住房','Therapeutic Supports'],
  '{"languages":["英文"],"website":"https://www.yooralla.com.au","specialties":["住宿支持","个人护理"],"ndisRegistered":true,"state":"VIC"}'::jsonb,
  true, 'https://www.yooralla.com.au', 'approved'
),
(
  'ShiftCare', 'supplier', 'ndis',
  '面向 NDIS / 居家照护机构的排班、客户管理与发票软件，供应商类资源（服务于 Provider）。',
  '线上 Online',
  ARRAY['排班/CRM 软件'],
  '{"languages":["英文"],"website":"https://www.shiftcare.com","specialties":["排班","发票","员工管理"],"ndisRegistered":false,"state":"National"}'::jsonb,
  true, 'https://www.shiftcare.com', 'approved'
),
(
  'Lumary', 'supplier', 'ndis',
  '澳洲本土的残障与养老服务管理平台（CRM），服务于 NDIS Provider 的运营与合规，供应商类资源。',
  '阿德莱德 Adelaide',
  ARRAY['管理软件/CRM'],
  '{"languages":["英文"],"website":"https://www.lumary.com","specialties":["运营管理","合规"],"ndisRegistered":false,"state":"SA"}'::jsonb,
  true, 'https://www.lumary.com', 'approved'
)
ON CONFLICT (source_url) WHERE source_url IS NOT NULL DO NOTHING;
