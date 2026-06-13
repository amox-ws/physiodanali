"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "sent" | "error";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
        shouldCreateUser: false,
      },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-porcelain px-6">
      <div className="w-full max-w-md">
        <p className="eyebrow">PhysioDanali · Διαχείριση</p>
        <h1 className="display mt-3 text-4xl leading-[1.05] tracking-tight text-ink">
          Σύνδεση
        </h1>

        {status === "sent" ? (
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-cobalt/20 bg-cobalt/5 p-6">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-cobalt/10">
              <Check className="size-4 text-cobalt" strokeWidth={2} />
            </span>
            <p className="text-sm leading-relaxed text-ink-muted">
              Στείλαμε σύνδεσμο σύνδεσης στο <strong>{email}</strong>. Ανοίξτε
              το email και πατήστε τον σύνδεσμο για να μπείτε.
            </p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@amox.gr"
                className="mt-2 w-full border-b border-stone-dark/50 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-cobalt"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-snow transition-all duration-500 hover:bg-cobalt disabled:opacity-60"
            >
              <span>
                {status === "sending" ? "Αποστολή..." : "Στείλτε σύνδεσμο"}
              </span>
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
            </button>

            {status === "error" && (
              <p className="text-sm text-red-600">
                Δεν ήταν δυνατή η αποστολή. Ελέγξτε ότι το email έχει πρόσβαση
                διαχειριστή και δοκιμάστε ξανά.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
