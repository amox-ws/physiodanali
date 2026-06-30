-- ─────────────────────────────────────────────────────────────────────
-- Booking system schema (custom, home-visit physiotherapy).
-- All tables are SERVER-ONLY: RLS is enabled with NO anon policies, so the
-- anon key has zero access. The public booking page + admin reach these via
-- the Supabase SERVICE-ROLE client (server-side only). This keeps patient
-- data private and prevents direct public DB writes (bookings go through a
-- validated server route).
-- ─────────────────────────────────────────────────────────────────────

-- Services offered (with duration). Seeded from the site's services.
create table if not exists booking_services (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  duration_min int  not null default 60,
  description text,
  sort        int  not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Weekly working hours. weekday: 0=Sunday .. 6=Saturday. `area` optional:
-- when set, that block only serves that area (area-day rule); null = all areas.
create table if not exists booking_availability (
  id         uuid primary key default gen_random_uuid(),
  weekday    int  not null check (weekday between 0 and 6),
  start_time time not null,
  end_time   time not null,
  area       text,
  active     boolean not null default true
);

-- Time off / blackout ranges (holidays, personal blocks).
create table if not exists booking_time_off (
  id        uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at   timestamptz not null,
  reason    text
);

-- Appointments. status: pending | confirmed | cancelled | done.
create table if not exists booking_appointments (
  id            uuid primary key default gen_random_uuid(),
  service_id    uuid references booking_services(id) on delete set null,
  service_name  text not null,         -- snapshot (survives service edits)
  patient_name  text not null,
  patient_phone text not null,
  patient_email text,
  area          text not null,
  address       text,
  notes         text,
  first_visit   boolean default true,
  starts_at     timestamptz not null,
  duration_min  int  not null,
  status        text not null default 'pending',
  created_at    timestamptz not null default now()
);
create index if not exists booking_appointments_starts_at_idx
  on booking_appointments (starts_at);
create index if not exists booking_appointments_status_idx
  on booking_appointments (status);

-- Single-row settings (travel buffer, notice, horizon, flow mode).
create table if not exists booking_settings (
  id                  int  primary key default 1,
  travel_buffer_min   int  not null default 30,   -- gap between home visits
  min_notice_hours    int  not null default 4,    -- earliest bookable from now
  booking_horizon_days int not null default 30,   -- how far ahead patients can book
  mode                text not null default 'request', -- request | instant
  constraint booking_settings_singleton check (id = 1)
);

-- Enable RLS, deny anon (service-role only — see header).
alter table booking_services      enable row level security;
alter table booking_availability  enable row level security;
alter table booking_time_off      enable row level security;
alter table booking_appointments  enable row level security;
alter table booking_settings      enable row level security;

-- Seed: default settings.
insert into booking_settings (id) values (1) on conflict (id) do nothing;

-- Seed: services (durations are sensible defaults — client confirms).
insert into booking_services (slug, name, duration_min, sort) values
  ('assessment',       'Αρχική αξιολόγηση',                 60, 1),
  ('physiotherapy',    'Φυσικοθεραπεία κατ'' οίκον',         60, 2),
  ('chiropractic',     'Χειροπρακτική',                     45, 3),
  ('lymphatic',        'Brazilian lymphatic drainage',      75, 4),
  ('kyphosis',         'Διόρθωση κύφωσης / στάσης',          45, 5),
  ('clinical-pilates', 'Clinical Pilates',                  60, 6)
on conflict (slug) do nothing;

-- Seed: default weekly hours (every day 09:00–22:00 — CLIENT CONFIRMS;
-- old site said 10:00–22:00, new site "until 23:00"). area=null (all areas).
insert into booking_availability (weekday, start_time, end_time)
select d, time '09:00', time '22:00'
from generate_series(0, 6) as d
on conflict do nothing;
