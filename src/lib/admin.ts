/**
 * Emails allowed into /admin. Users are provisioned with a password via the
 * Supabase Admin API (no self-signup). Enforced in three places: the proxy
 * (src/proxy.ts), the protected admin layout, and Supabase disable_signup —
 * so only these accounts can ever obtain a session.
 */
export const ADMIN_EMAILS = ["info@amox.gr", "info@physiodanali.gr"];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const e = email.toLowerCase();
  return ADMIN_EMAILS.some((allowed) => allowed.toLowerCase() === e);
}
