-- 需求双语：发布时把 title/description 翻成中/英存一份，按访客界面语言显示。
-- tr = {"zh":{"title":"..","description":".."}, "en":{...}}
alter table public.demands
  add column if not exists tr jsonb default '{}';
