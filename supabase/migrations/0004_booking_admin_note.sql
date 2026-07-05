-- Admin comment on an appointment (reason for a reschedule, internal note).
-- Included in the "your appointment changed" email to the patient.
-- Status gains a 'rescheduled' value (no CHECK constraint exists, so no change
-- needed beyond the app treating it as a known status).

alter table booking_appointments
  add column if not exists admin_note text;
