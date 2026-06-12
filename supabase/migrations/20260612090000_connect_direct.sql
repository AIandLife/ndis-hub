-- 对接直连：connection_requests 支持微信流（原表按 email 设计）
-- 响应人留微信 → 系统当场把需求方微信给他（需求方自己挂需求时留过）→ 双方直接对接。
-- 每条对接记录都留底 + 邮件通知 Terry（人脉资产与转介线索）。
alter table public.connection_requests
  alter column requester_email drop not null,
  alter column target_email drop not null;

alter table public.connection_requests
  add column if not exists requester_wechat text,
  add column if not exists demand_id uuid references public.demands(id) on delete set null;
