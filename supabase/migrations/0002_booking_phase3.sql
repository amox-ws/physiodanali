-- Phase 3: optional Viva deposit + Google Calendar sync.

alter table booking_appointments
  add column if not exists deposit_status text not null default 'none', -- none | pending | paid
  add column if not exists deposit_amount numeric,
  add column if not exists viva_order_code text,
  add column if not exists gcal_event_id text;

alter table booking_settings
  add column if not exists deposit_enabled boolean not null default false,
  add column if not exists deposit_amount numeric not null default 15;
