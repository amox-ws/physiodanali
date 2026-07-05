-- Replace the 6 placeholder services with the 8 real homepage services.
-- Duration is now a patient choice (30′ = 50€ / 60′ = 100€), so duration_min
-- here is just a default; the chosen duration + price ride on the appointment.
-- service_id on appointments is ON DELETE SET NULL and service_name is a
-- snapshot, so clearing the table does not orphan existing bookings.

delete from booking_services;

insert into booking_services (slug, name, duration_min, sort) values
  ('home-care',        'Φυσικοθεραπεία κατ'' οίκον',      60, 1),
  ('chiropractic',     'Χειροπρακτική',                   60, 2),
  ('kyphosis',         'Κύφωση',                          60, 3),
  ('lymphatic',        'Brazilian lymphatic drainage',    60, 4),
  ('clinical-pilates', 'Clinical Pilates',                60, 5),
  ('neck-pain',        'Αυχεναλγία',                      60, 6),
  ('low-back-pain',    'Οσφυαλγία',                       60, 7),
  ('hip-pain',         'Ισχιαλγία',                       60, 8);

-- Price snapshot per appointment (50 for 30′, 100 for 60′).
alter table booking_appointments
  add column if not exists price_eur integer;
