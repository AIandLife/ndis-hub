-- ================================================================
-- 澳洲NDIS圈 · NDIS Hub AU — Supabase Schema
-- ----------------------------------------------------------------
-- 设计原则：这份 schema 是 BossLink(australia-startup-hub)的「兼容镜像」。
-- 重叠的表(profiles / applications / resources / connection_requests /
-- settings)沿用完全相同的表名和字段名，只额外加一个 `circle` 标签列。
-- 这样将来「打通同步」= 一个按 email / source_url upsert 进 BossLink 的
-- 直通脚本，而不是两套结构对不上的灾难。
--
-- 运行方式：Supabase Dashboard → SQL Editor → New Query → 粘贴运行
-- ================================================================

-- ── 0. CIRCLE 约定 ────────────────────────────────────────────────
-- 每条「老板/资源」记录都带 circle 标签。本站默认 'ndis'。
-- 将来一条记录可同时属于多个圈：把 circle 升级为 circles TEXT[] 即可
-- （建房圈='build'、房产圈='property'、NDIS='ndis'、创业总站='startup'）。
-- 现阶段单站单值，保持简单。

-- ── 1. PROFILES ──────────────────────────────────────────────────
-- Supabase Auth 用户注册时由触发器自动创建。
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT,
  full_name   TEXT,
  wechat_id   TEXT,
  phone       TEXT,
  company     TEXT,
  industry    TEXT,
  location    TEXT,
  avatar_url  TEXT,
  circle      TEXT NOT NULL DEFAULT 'ndis',
  role        TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- ── 2. APPLICATIONS ──────────────────────────────────────────────
-- 老板自助填表留资。填表这个动作本身 = 一条线索。
-- resources_offered / needs / *_tags 是 B2B 撮合的原料。
CREATE TABLE IF NOT EXISTS public.applications (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name          TEXT NOT NULL,
  email              TEXT NOT NULL,
  wechat_id          TEXT NOT NULL,
  phone              TEXT,
  company            TEXT,
  abn                TEXT,
  industry           TEXT,
  location           TEXT,
  circle             TEXT NOT NULL DEFAULT 'ndis',
  -- NDIS 角色：Provider / Support Coordinator / Plan Manager / Supplier 等
  ndis_role          TEXT,
  resources_offered  TEXT,
  needs              TEXT,
  resource_tags      TEXT[] DEFAULT '{}',
  need_tags          TEXT[] DEFAULT '{}',
  collab_intent      TEXT[] DEFAULT '{}',
  description        TEXT,
  voice_transcript   TEXT DEFAULT '',
  subscribe_business BOOLEAN NOT NULL DEFAULT true,
  subscribe_events   BOOLEAN NOT NULL DEFAULT true,
  subscribe_updates  BOOLEAN NOT NULL DEFAULT true,
  status             TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes        TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS applications_email_unique ON public.applications (email);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own application" ON public.applications;
CREATE POLICY "Users can read own application"
  ON public.applications FOR SELECT USING (auth.email() = email);
-- 写入与全量读取走 service role(admin client),绕过 RLS。


-- ── 3. RESOURCES ─────────────────────────────────────────────────
-- 公开「商家资源库」。is_scraped=true 的是冷启动爬来的种子(海外/澳洲 NDIS 名录)，
-- 让目录一上线就是满的；老板自助提交的 is_scraped=false。
-- status='approved' 的才公开可见。
CREATE TABLE IF NOT EXISTS public.resources (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  category        TEXT,
  circle          TEXT NOT NULL DEFAULT 'ndis',
  description     TEXT NOT NULL,
  location        TEXT,
  tags            TEXT[] DEFAULT '{}',
  contact_info    JSONB DEFAULT '{}',
  submitter_email TEXT,
  submitter_name  TEXT,
  is_scraped      BOOLEAN NOT NULL DEFAULT false,
  source_url      TEXT,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes     TEXT,
  view_count      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 防爬虫种子重复入库：同一 source_url 只存一条
CREATE UNIQUE INDEX IF NOT EXISTS resources_source_url_unique
  ON public.resources (source_url) WHERE source_url IS NOT NULL;

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Approved resources are public" ON public.resources;
CREATE POLICY "Approved resources are public"
  ON public.resources FOR SELECT USING (status = 'approved');


-- ── 4. CONNECTION REQUESTS ───────────────────────────────────────
-- B2B 对接请求：一个老板想认识资源库里的另一个老板/供应商。
-- 合规：这是「商家↔商家」对接，不是「参与者↔支持工」匹配，安全。
CREATE TABLE IF NOT EXISTS public.connection_requests (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle           TEXT NOT NULL DEFAULT 'ndis',
  requester_email  TEXT NOT NULL,
  requester_name   TEXT,
  target_email     TEXT NOT NULL,
  target_name      TEXT,
  message          TEXT,
  resource_id      UUID REFERENCES public.resources(id) ON DELETE SET NULL,
  status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.connection_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can see own connection requests" ON public.connection_requests;
CREATE POLICY "Users can see own connection requests"
  ON public.connection_requests FOR SELECT
  USING (auth.email() = requester_email OR auth.email() = target_email);


-- ── 5. EMAIL SUBSCRIPTIONS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.email_subscriptions (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email              TEXT NOT NULL,
  name               TEXT,
  circle             TEXT NOT NULL DEFAULT 'ndis',
  subscribe_business BOOLEAN NOT NULL DEFAULT true,
  subscribe_events   BOOLEAN NOT NULL DEFAULT true,
  subscribe_updates  BOOLEAN NOT NULL DEFAULT true,
  source             TEXT DEFAULT 'website',
  is_active          BOOLEAN NOT NULL DEFAULT true,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS email_subscriptions_email_unique ON public.email_subscriptions (email);
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;


-- ── 6. SETTINGS ──────────────────────────────────────────────────
-- 数据驱动的站点开关 & 物料(含微信群/个人二维码 URL),改这里即时生效,不用改代码。
CREATE TABLE IF NOT EXISTS public.settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.settings (key, value) VALUES
  ('resource_library_open',  'true'),
  ('member_count',           '0'),
  ('resource_count',         '0'),
  ('wechat_group_qr_url',    ''),
  ('wechat_personal_qr_url', ''),
  ('homepage_banner',        ''),
  ('homepage_banner_active', 'false')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Settings are publicly readable" ON public.settings;
CREATE POLICY "Settings are publicly readable"
  ON public.settings FOR SELECT TO anon, authenticated USING (true);


-- ================================================================
-- 运行后：
-- 1. 用 Google 登录本站
-- 2. Supabase → Table Editor → profiles → 找到你的行 → role 改成 'admin'
-- 3. 即可访问后台审批资源/申请
--
-- 与 BossLink 同步(将来)：
-- 重叠表字段名一致,同步脚本按 email(applications)/source_url(resources)
-- upsert 进 BossLink 同名表,circle 标签随行即可。
-- ================================================================
