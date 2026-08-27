"use client";

import { useState } from "react";
import { Languages, RefreshCw, Save, Eye, AlertTriangle } from "lucide-react";
import {
  saveEnglish,
  retranslateArticle,
  type EnglishInput,
} from "@/lib/article-actions";
import type { AdminArticle, Section } from "@/lib/admin-articles";

/**
 * The English half of an article, which until now had no interface at all:
 * it was machine-translated on publish and invisible from the editor, so the
 * practitioner could not read it, correct it, or even tell whether it existed.
 *
 * Saving here sets english_edited, which makes publish-time auto-translation
 * skip the row — corrections are never silently overwritten. "Ξαναμετάφρασε"
 * clears that flag and hands the article back to the translator.
 */
export function EnglishPanel({
  article,
  slug,
  disabled,
}: {
  article: AdminArticle;
  /** Live slug from the editor — the preview link must follow a rename. */
  slug: string;
  /** True while the article has never been saved (no id to act on). */
  disabled?: boolean;
}) {
  const [en, setEn] = useState<EnglishInput>({
    title_en: article.title_en ?? "",
    excerpt_en: article.excerpt_en ?? "",
    category_en: article.category_en ?? "",
    read_time_en: article.read_time_en ?? "",
    sections_en: article.sections_en?.length ? article.sections_en : [],
  });
  const [busy, setBusy] = useState<"save" | "retranslate" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const missing = !en.title_en || en.sections_en.length === 0;
  const greekCount = article.sections?.length ?? 0;
  const mismatch = !missing && en.sections_en.length !== greekCount;

  function setField<K extends keyof EnglishInput>(k: K, v: EnglishInput[K]) {
    setEn((prev) => ({ ...prev, [k]: v }));
    setDone(null);
  }
  function setSection(i: number, patch: Partial<Section>) {
    setEn((prev) => ({
      ...prev,
      sections_en: prev.sections_en.map((s, n) =>
        n === i ? { ...s, ...patch } : s,
      ),
    }));
    setDone(null);
  }

  async function onSave() {
    setBusy("save");
    setError(null);
    try {
      await saveEnglish(article.id, en);
      setDone("Οι διορθώσεις αποθηκεύτηκαν.");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  }

  async function onRetranslate() {
    if (
      !missing &&
      !confirm(
        "Η αυτόματη μετάφραση θα αντικαταστήσει το αγγλικό κείμενο, μαζί με τυχόν διορθώσεις σας. Να συνεχίσω;",
      )
    )
      return;
    setBusy("retranslate");
    setError(null);
    try {
      const fresh = await retranslateArticle(article.id);
      setEn(fresh);
      setDone("Η μετάφραση ανανεώθηκε.");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  }

  const input =
    "w-full rounded-lg border border-stone bg-snow px-3 py-2 text-ink outline-none transition-colors focus:border-cobalt";
  const labelCls = "text-[11px] uppercase tracking-[0.18em] text-ink-muted";

  return (
    <section className="space-y-4 rounded-2xl border border-stone bg-snow p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-sm font-medium text-ink">
          <Languages className="size-4" strokeWidth={1.5} />
          Αγγλική έκδοση
          <span
            className={
              "rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] " +
              (missing ? "bg-red-100 text-red-700" : "bg-cobalt/10 text-cobalt")
            }
          >
            {missing ? "Δεν υπάρχει" : "Υπάρχει"}
          </span>
        </h2>
        <div className="flex gap-2">
          {!missing && (
            <a
              href={`/en/articles/${slug}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone px-3.5 py-1.5 text-xs text-ink-muted transition-colors hover:border-cobalt hover:text-cobalt"
            >
              <Eye className="size-3.5" strokeWidth={1.5} />
              Προβολή
            </a>
          )}
          <button
            type="button"
            onClick={onRetranslate}
            disabled={!!busy || disabled}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone px-3.5 py-1.5 text-xs text-ink transition-colors hover:border-cobalt disabled:opacity-50"
          >
            <RefreshCw
              className={"size-3.5" + (busy === "retranslate" ? " animate-spin" : "")}
              strokeWidth={1.5}
            />
            {busy === "retranslate" ? "Μεταφράζω…" : "Ξαναμετάφρασε"}
          </button>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        Η αγγλική έκδοση φτιάχνεται αυτόματα όταν δημοσιεύετε. Εδώ τη βλέπετε και
        τη διορθώνετε. Μόλις τη διορθώσετε, <strong>δεν ξαναγράφεται</strong> από
        την αυτόματη μετάφραση — μόνο αν πατήσετε «Ξαναμετάφρασε».
      </p>

      {disabled && (
        <p className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs text-ink">
          Αποθηκεύστε πρώτα το άρθρο για να δουλέψει η μετάφραση.
        </p>
      )}
      {error && (
        <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}
      {done && (
        <p className="rounded-lg border border-cobalt/30 bg-cobalt/5 px-4 py-2.5 text-sm text-cobalt">
          {done}
        </p>
      )}
      {mismatch && (
        <p className="inline-flex items-start gap-2 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs text-ink">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
          Οι ενότητες δεν ταιριάζουν: {greekCount} στα ελληνικά,{" "}
          {en.sections_en.length} στα αγγλικά. Πατήστε «Ξαναμετάφρασε» για να
          συγχρονιστούν.
        </p>
      )}

      {missing ? (
        <p className="rounded-lg border border-stone bg-porcelain px-4 py-3 text-sm text-ink-muted">
          Δεν υπάρχει ακόμη αγγλική έκδοση — η σελίδα /en δείχνει το ελληνικό
          κείμενο. Πατήστε «Ξαναμετάφρασε» για να δημιουργηθεί.
        </p>
      ) : (
        <>
          <div>
            <label className={labelCls}>Title</label>
            <input
              className={input + " mt-1.5"}
              value={en.title_en}
              onChange={(e) => setField("title_en", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Excerpt</label>
            <textarea
              className={input + " mt-1.5 min-h-20 resize-y"}
              value={en.excerpt_en}
              onChange={(e) => setField("excerpt_en", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Category</label>
              <input
                className={input + " mt-1.5"}
                value={en.category_en}
                onChange={(e) => setField("category_en", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Read time</label>
              <input
                className={input + " mt-1.5"}
                value={en.read_time_en}
                onChange={(e) => setField("read_time_en", e.target.value)}
                placeholder="8 min"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {en.sections_en.map((s, i) => (
              <div key={i} className="rounded-xl border border-stone p-4">
                <label className={labelCls}>Ενότητα {i + 1} — heading</label>
                <input
                  className={input + " mt-1.5"}
                  value={s.heading ?? ""}
                  onChange={(e) => setSection(i, { heading: e.target.value })}
                />
                <label className={labelCls + " mt-3 block"}>Body</label>
                <textarea
                  className={input + " mt-1.5 min-h-44 resize-y font-mono text-[13px] leading-relaxed"}
                  value={s.body}
                  onChange={(e) => setSection(i, { body: e.target.value })}
                />
                {article.sections?.[i]?.heading && (
                  <p className="mt-2 text-[11px] text-ink-muted">
                    Ελληνικά: {article.sections[i].heading}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onSave}
            disabled={!!busy || disabled}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-snow transition-colors hover:bg-cobalt disabled:opacity-50"
          >
            <Save className="size-4" strokeWidth={1.5} />
            {busy === "save" ? "Αποθήκευση…" : "Αποθήκευση αγγλικών"}
          </button>
        </>
      )}
    </section>
  );
}
