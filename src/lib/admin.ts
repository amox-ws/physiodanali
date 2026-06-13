/**
 * Emails allowed into /admin. Add the client's email here when ready.
 * Enforced in three places: the proxy (src/proxy.ts), the protected admin
 * layout, and signInWithOtp({ shouldCreateUser: false }) + Supabase
 * disable_signup — so only these accounts can ever obtain a session.
 */
export const ADMIN_EMAILS = ["info@amox.gr"];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const e = email.toLowerCase();
  return ADMIN_EMAILS.some((allowed) => allowed.toLowerCase() === e);
}
