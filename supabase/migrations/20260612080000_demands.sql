-- 需求对接表（镜像 BossLink demands + circle 标签）
-- 任何人不入驻也能挂需求 → Terry 审核 → 公开展示 → 想对接的人进群找 Terry。
-- 每条需求 = Terry 转介业务的库存。
create table if not exists public.demands (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  description      text not null,
  category         text not null,
  circle           text not null default 'ndis',
  city             text not null default '全澳洲',
  budget           text,
  contact_email    text,
  contact_wechat   text,
  submitter_name   text not null,
  submitter_id     uuid,
  status           text not null default 'pending',   -- pending | approved | closed
  admin_notes      text,
  ai_tags          text[],
  view_count       int not null default 0,
  created_at       timestamptz default now()
);

-- RLS：不开放任何匿名读取（联系方式是隐私）。
-- 公开读取一律走 /api/demands 服务端路由（service role），只返回过滤后的安全字段。
alter table public.demands enable row level security;
