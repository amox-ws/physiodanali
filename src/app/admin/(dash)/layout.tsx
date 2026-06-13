import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export const metadata = {
  title: "Διαχείριση",
  robots: { index: false, follow: false },
};

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export default async function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense in depth: the proxy already guards /admin, but never trust it alone
  // (Server Actions can bypass proxy matchers — see Next 16 proxy docs).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-10 border-b border-stone bg-snow/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-baseline gap-3">
            <span className="display text-xl tracking-tight text-ink">
              PhysioDanali
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-cobalt">
              Διαχείριση
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-ink-muted sm:inline">
              {user?.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-stone px-4 py-2 text-sm text-ink-muted transition-all hover:border-cobalt hover:text-cobalt"
              >
                <LogOut className="size-4" strokeWidth={1.5} />
                Έξοδος
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-10">{children}</main>
    </div>
  );
}
