"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/content";
import { useContent, useLocale } from "@/components/site/locale-provider";
import { t } from "@/lib/translations";
import { sendContactMessage } from "@/app/contact/actions";
import { Turnstile, turnstileEnabled } from "@/components/site/turnstile";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const locale = useLocale();
  const { contact } = useContent();
  const tx = t(locale);
  const [status, setStatus] = useState<Status>("idle");
  const [errKind, setErrKind] = useState<"send" | "captcha">("send");
  const [consent, setConsent] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const onToken = useCallback((tok: string) => setCaptcha(tok), []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "", // honeypot
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    if (turnstileEnabled && !captcha) {
      setErrKind("captcha");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await sendContactMessage({ ...form, consent, token: captcha });
      if (res.ok) {
        setStatus("success");
        return;
      }
      setErrKind(res.error === "captcha" ? "captcha" : "send");
      setStatus("error");
    } catch {
      setErrKind("send");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-6 py-12"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-cobalt/10">
          <Check className="size-6 text-cobalt" strokeWidth={2} />
        </span>
        <h3 className="display text-3xl leading-[1.1] tracking-tight text-ink lg:text-4xl">
          {tx.cfSuccessTitle}
        </h3>
        <p className="max-w-[44ch] text-base leading-relaxed text-ink-muted">
          {tx.cfSuccessBody1}{" "}
          <a
            href={`tel:${site.phone}`}
            className="text-cobalt underline-offset-4 hover:underline"
          >
            {site.phoneDisplay}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
        className="sr-only"
        style={{ position: "absolute", left: "-9999px" }}
      />
      <Field label={contact.fields.name} name="name">
        <input
          required
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full border-b border-stone-dark/50 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-cobalt"
          placeholder={tx.cfPlaceholderName}
        />
      </Field>
      <Field label={contact.fields.email} name="email">
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full border-b border-stone-dark/50 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-cobalt"
          placeholder="email@example.com"
        />
      </Field>
      <Field label={contact.fields.phone} name="phone">
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full border-b border-stone-dark/50 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-cobalt"
          placeholder="69 ..."
        />
      </Field>
      <Field label={contact.fields.message} name="message">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full resize-none border-b border-stone-dark/50 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-cobalt"
          placeholder={tx.cfPlaceholderMessage}
        />
      </Field>

      <label className="mt-2 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-cobalt"
        />
        <span className="text-xs leading-relaxed text-ink-muted">
          {tx.cfConsent1}{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cobalt underline underline-offset-2"
          >
            {tx.cfPrivacy}
          </Link>{" "}
          {tx.cfConsent2}
        </span>
      </label>

      {/* Cloudflare Turnstile captcha — renders only when configured */}
      <Turnstile onToken={onToken} />

      {status === "error" && errKind === "captcha" && (
        <p className="text-sm text-red-600" role="alert">
          {tx.cfCaptcha}
        </p>
      )}
      {status === "error" && errKind === "send" && (
        <p className="text-sm text-red-600" role="alert">
          {tx.cfError}{" "}
          <a
            href={`tel:${site.phone}`}
            className="underline underline-offset-4"
          >
            {site.phoneDisplay}
          </a>
          .
        </p>
      )}

      <div className="mt-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-ink-muted">
          {tx.cfFootnote}
        </p>
        <button
          type="submit"
          disabled={status === "submitting" || !consent}
          className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-snow transition-all duration-500 hover:bg-cobalt disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>
            {status === "submitting" ? tx.submitting : contact.fields.submit}
          </span>
          <ArrowRight
            className="size-4 transition-transform duration-500 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
