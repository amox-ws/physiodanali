"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/content";
import { useContent, useLocale } from "@/components/site/locale-provider";
import { t } from "@/lib/translations";

type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const locale = useLocale();
  const { contact } = useContent();
  const tx = t(locale);
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setStatus("submitting");
    // No backend yet — open mail client with the message prefilled.
    const subject = encodeURIComponent(`${tx.cfSubjectPrefix}${form.name}`);
    const body = encodeURIComponent(
      `${tx.cfBodyName}: ${form.name}\nEmail: ${form.email}\n${tx.cfBodyPhone}: ${form.phone}\n\n${form.message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("success"), 600);
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
