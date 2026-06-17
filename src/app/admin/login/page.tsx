"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "signing" | "error";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("signing");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setStatus("error");
      return;
    }
    // Full reload so the proxy + server layout pick up the new session cookie.
    window.location.href = "/admin";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-porcelain px-6">
      <div className="w-full max-w-md">
        <p className="eyebrow">PhysioDanali · Διαχείριση</p>
        <h1 className="display mt-3 text-4xl leading-[1.05] tracking-tight text-ink">
          Σύνδεση
        </h1>

        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
              Email
            </span>
            <input
              required
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@physiodanali.gr"
              className="mt-2 w-full border-b border-stone-dark/50 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-cobalt"
            />
          </label>

          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
              Κωδικός
            </span>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full border-b border-stone-dark/50 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-cobalt"
            />
          </label>

          <button
            type="submit"
            disabled={status === "signing"}
            className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-snow transition-all duration-500 hover:bg-cobalt disabled:opacity-60"
          >
            <span>{status === "signing" ? "Σύνδεση..." : "Σύνδεση"}</span>
            <ArrowRight
              className="size-4 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600">
              Λάθος email ή κωδικός. Δοκιμάστε ξανά.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
