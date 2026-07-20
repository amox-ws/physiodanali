"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isAdminEmail } from "@/lib/admin";

type Status = "idle" | "sending" | "sent" | "error" | "notAllowed";

/**
 * Admin sign-in via magic link (client request: no passwords, for security).
 * Supabase emails a one-time link that lands on /admin/auth/callback, which
 * exchanges the code for a session cookie. `shouldCreateUser: false` means only
 * existing (provisioned) accounts can ever receive a link.
 */
export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Only the two provisioned admin accounts may request a link. The real
    // gate is server-side (proxy + admin layout + shouldCreateUser:false), this
    // just avoids emailing anyone else.
    if (!isAdminEmail(email.trim())) {
      setStatus("notAllowed");
      return;
    }
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="flex min-h-screen flex-col bg-porcelain">
      {/* Logo sits top-left like the site header, and returns to the public
          site (client request). */}
      <header className="px-6 py-6 lg:px-10">
        <Link
          href="/"
          aria-label="Μετάβαση στην αρχική σελίδα"
          className="inline-flex items-center"
        >
          <Image
            src="/logo-v2.png"
            alt="PhysioDanali"
            width={1190}
            height={190}
            priority
            className="h-10 w-auto"
          />
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 pb-24">
        <div className="w-full max-w-md">
        <p className="eyebrow">Διαχείριση</p>
        <h1 className="display mt-3 text-4xl leading-[1.05] tracking-tight text-ink">
          Σύνδεση
        </h1>

        {status === "sent" ? (
          <div className="mt-8 rounded-[20px] border border-stone bg-snow p-8">
            <span className="flex size-12 items-center justify-center rounded-full bg-cobalt/10">
              <MailCheck className="size-5 text-cobalt" strokeWidth={1.5} />
            </span>
            <h2 className="display mt-5 text-2xl leading-tight tracking-tight text-ink">
              Ελέγξτε το email σας.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Στείλαμε έναν σύνδεσμο σύνδεσης στο{" "}
              <strong className="text-ink">{email}</strong>. Ανοίξτε τον από
              αυτή τη συσκευή για να μπείτε στη διαχείριση.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-cobalt underline-offset-4 hover:underline"
            >
              Χρήση άλλου email
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 grid gap-5">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                Email
              </span>
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@physiodanali.gr"
                className="mt-2 w-full border-b border-stone-dark/50 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-cobalt"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-snow transition-all duration-500 hover:bg-cobalt disabled:opacity-60"
            >
              <span>
                {status === "sending"
                  ? "Αποστολή..."
                  : "Αποστολή συνδέσμου σύνδεσης"}
              </span>
              <ArrowRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>

            <p className="text-xs leading-relaxed text-ink-muted">
              Δεν χρειάζεται κωδικός — σας στέλνουμε έναν ασφαλή σύνδεσμο μιας
              χρήσης στο email σας.
            </p>

            {status === "error" && (
              <p className="text-sm text-red-600">
                Δεν ήταν δυνατή η αποστολή. Ελέγξτε το email και δοκιμάστε ξανά.
              </p>
            )}

            {status === "notAllowed" && (
              <p className="text-sm text-red-600" role="alert">
                Αυτό το email δεν έχει πρόσβαση στη διαχείριση.
              </p>
            )}
          </form>
        )}
        </div>
      </div>
    </main>
  );
}
