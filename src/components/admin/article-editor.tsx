"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Save,
  Send,
  Eye,
  Upload,
  ArrowLeft,
  Undo2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  saveArticle,
  publishArticle,
  unpublishArticle,
  deleteArticle,
  type ArticleInput,
} from "@/lib/article-actions";
import type { AdminArticle } from "@/lib/admin-articles";
import { EnglishPanel } from "@/components/admin/english-panel";

const EMPTY: ArticleInput = {
  slug: "",
  title: "",
  category: "",
  excerpt: "",
  read_time: "",
  date: "",
  image: "",
  sections: [{ heading: "", body: "" }],
  meta_title: "",
  meta_description: "",
  keywords: [],
  faq: [],
};

const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));

export function ArticleEditor({ article }: { article: AdminArticle | null }) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(article?.id ?? null);
  const [status, setStatus] = useState(article?.status ?? "draft");
  const [form, setForm] = useState<ArticleInput>(
    article
      ? {
          slug: article.slug,
          title: article.title,
          category: article.category ?? "",
          excerpt: article.excerpt ?? "",
          read_time: article.read_time ?? "",
          date: article.date ?? "",
          image: article.image ?? "",
          sections: article.sections?.length
            ? article.sections
            : [{ heading: "", body: "" }],
          meta_title: article.meta_title ?? "",
          meta_description: article.meta_description ?? "",
          keywords: article.keywords ?? [],
          faq: article.faq ?? [],
        }
      : EMPTY,
  );
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof ArticleInput>(k: K, v: ArticleInput[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  // ── sections ──
  const updateSection = (i: number, key: "heading" | "body", value: string) =>
    setForm((f) => {
      const s = [...f.sections];
      s[i] = { ...s[i], [key]: value };
      return { ...f, sections: s };
    });
  const addSection = () =>
    setForm((f) => ({ ...f, sections: [...f.sections, { heading: "", body: "" }] }));
  const removeSection = (i: number) =>
    setForm((f) => ({ ...f, sections: f.sections.filter((_, j) => j !== i) }));
  const moveSection = (i: number, dir: -1 | 1) =>
    setForm((f) => {
      const j = i + dir;
      if (j < 0 || j >= f.sections.length) return f;
      const s = [...f.sections];
      [s[i], s[j]] = [s[j], s[i]];
      return { ...f, sections: s };
    });

  // ── faq ──
  const updateFaq = (i: number, key: "question" | "answer", value: string) =>
    setForm((f) => {
      const q = [...f.faq];
      q[i] = { ...q[i], [key]: value };
      return { ...f, faq: q };
    });
  const addFaq = () =>
    setForm((f) => ({ ...f, faq: [...f.faq, { question: "", answer: "" }] }));
  const removeFaq = (i: number) =>
    setForm((f) => ({ ...f, faq: f.faq.filter((_, j) => j !== i) }));

  async function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const base = (form.slug || "article").replace(/[^a-z0-9-]/gi, "-");
      const path = `${base}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("article-images")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("article-images").getPublicUrl(path);
      set("image", data.publicUrl);
    } catch (e) {
      setError("Αποτυχία ανεβάσματος εικόνας: " + errMsg(e));
    } finally {
      setUploading(false);
    }
  }

  async function doSave(): Promise<string | null> {
    setError(null);
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Ο τίτλος και το slug είναι υποχρεωτικά.");
      return null;
    }
    const res = await saveArticle(id, form);
    if (!id) setId(res.id);
    return res.id;
  }

  async function onSave() {
    setBusy("save");
    try {
      const newId = await doSave();
      if (newId && !article) {
        router.replace(`/admin/articles/${newId}`);
      } else {
        router.refresh();
      }
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setBusy(null);
    }
  }

  async function onPublish() {
    setBusy("publish");
    try {
      const newId = await doSave();
      if (!newId) {
        setBusy(null);
        return;
      }
      await publishArticle(newId);
      router.push("/admin");
    } catch (e) {
      setError(errMsg(e));
      setBusy(null);
    }
  }

  async function onUnpublish() {
    setBusy("unpublish");
    try {
      const newId = await doSave();
      if (newId) {
        await unpublishArticle(newId);
        setStatus("draft");
        router.refresh();
      }
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setBusy(null);
    }
  }

  async function onDelete() {
    if (!id) {
      router.push("/admin");
      return;
    }
    if (!confirm("Διαγραφή του άρθρου οριστικά;")) return;
    setBusy("delete");
    try {
      await deleteArticle(id);
      router.push("/admin");
    } catch (e) {
      setError(errMsg(e));
      setBusy(null);
    }
  }

  const input =
    "w-full rounded-lg border border-stone bg-snow px-3 py-2 text-ink outline-none transition-colors focus:border-cobalt";
  const labelCls = "text-[11px] uppercase tracking-[0.18em] text-ink-muted";

  return (
    <div className="mx-auto max-w-3xl">
      {/* Top bar */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-cobalt"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          Πίσω
        </Link>
        <span
          className={
            "rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] " +
            (status === "published"
              ? "bg-cobalt/10 text-cobalt"
              : "bg-gold/10 text-gold")
          }
        >
          {status === "published" ? "Δημοσιευμένο" : "Προσχέδιο"}
        </span>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* Core */}
        <section className="space-y-4 rounded-2xl border border-stone bg-snow p-6">
          <div>
            <label className={labelCls}>Τίτλος *</label>
            <input
              className={input + " mt-1.5 text-lg"}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Slug (URL) *</label>
              <input
                className={input + " mt-1.5"}
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="low-back-pain"
              />
              <p className="mt-1 text-xs text-ink-muted">/articles/{form.slug || "…"}</p>
            </div>
            <div>
              <label className={labelCls}>Κατηγορία</label>
              <input
                className={input + " mt-1.5"}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Σπονδυλική στήλη"
              />
            </div>
            <div>
              <label className={labelCls}>Χρόνος ανάγνωσης</label>
              <input
                className={input + " mt-1.5"}
                value={form.read_time}
                onChange={(e) => set("read_time", e.target.value)}
                placeholder="8 λεπτά"
              />
            </div>
            <div>
              <label className={labelCls}>Ημερομηνία</label>
              <input
                className={input + " mt-1.5"}
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                placeholder="13 Ιουνίου 2026"
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Περίληψη (excerpt)</label>
            <textarea
              className={input + " mt-1.5 resize-y"}
              rows={2}
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
            />
          </div>
        </section>

        {/* Cover image */}
        <section className="space-y-4 rounded-2xl border border-stone bg-snow p-6">
          <label className={labelCls}>Εικόνα εξωφύλλου</label>
          {form.image && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-stone">
              <Image src={form.image} alt="" fill sizes="700px" className="object-cover" />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone px-4 py-2 text-sm text-ink transition-colors hover:border-cobalt hover:text-cobalt">
              <Upload className="size-4" strokeWidth={1.5} />
              {uploading ? "Ανέβασμα..." : "Ανέβασμα εικόνας"}
              <input type="file" accept="image/*" onChange={onImage} className="hidden" disabled={uploading} />
            </label>
            <input
              className={input + " flex-1 min-w-[200px]"}
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="…ή επικολλήστε URL / διαδρομή (/articles/...)"
            />
          </div>
        </section>

        {/* Sections (body) */}
        <section className="space-y-4 rounded-2xl border border-stone bg-snow p-6">
          <div className="flex items-center justify-between">
            <h2 className="display text-xl text-ink">Περιεχόμενο</h2>
            <p className="text-xs text-ink-muted">
              «• » στην αρχή γραμμής = κουκκίδα · κενή γραμμή = νέα παράγραφος
            </p>
          </div>
          {form.sections.map((s, i) => (
            <div key={i} className="rounded-xl border border-stone bg-porcelain p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  Ενότητα {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveSection(i, -1)} className="rounded p-1 text-ink-muted hover:text-cobalt" aria-label="Πάνω">
                    <ChevronUp className="size-4" />
                  </button>
                  <button type="button" onClick={() => moveSection(i, 1)} className="rounded p-1 text-ink-muted hover:text-cobalt" aria-label="Κάτω">
                    <ChevronDown className="size-4" />
                  </button>
                  <button type="button" onClick={() => removeSection(i)} className="rounded p-1 text-ink-muted hover:text-red-600" aria-label="Διαγραφή ενότητας">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <input
                className={input + " mb-2"}
                value={s.heading ?? ""}
                onChange={(e) => updateSection(i, "heading", e.target.value)}
                placeholder="Επικεφαλίδα (προαιρετική — άφησέ τη κενή για εισαγωγή)"
              />
              <textarea
                className={input + " resize-y font-[450] leading-relaxed"}
                rows={6}
                value={s.body}
                onChange={(e) => updateSection(i, "body", e.target.value)}
                placeholder="Κείμενο ενότητας…"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-stone-dark px-4 py-2 text-sm text-ink-muted transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Plus className="size-4" strokeWidth={1.5} />
            Προσθήκη ενότητας
          </button>
        </section>

        {/* SEO / GEO */}
        <section className="space-y-4 rounded-2xl border border-stone bg-snow p-6">
          <h2 className="display text-xl text-ink">SEO & FAQ</h2>
          <div>
            <label className={labelCls}>Meta τίτλος</label>
            <input className={input + " mt-1.5"} value={form.meta_title} onChange={(e) => set("meta_title", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Meta περιγραφή</label>
            <textarea className={input + " mt-1.5 resize-y"} rows={2} value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Λέξεις-κλειδιά (χωρισμένες με κόμμα)</label>
            <input
              className={input + " mt-1.5"}
              value={form.keywords.join(", ")}
              onChange={(e) => set("keywords", e.target.value.split(","))}
              placeholder="οσφυαλγία, πόνος μέσης, φυσικοθεραπεία"
            />
          </div>

          <div className="space-y-3 pt-2">
            <span className={labelCls}>Συχνές ερωτήσεις (FAQ)</span>
            {form.faq.map((f, i) => (
              <div key={i} className="rounded-xl border border-stone bg-porcelain p-3">
                <div className="mb-2 flex items-center gap-2">
                  <input
                    className={input}
                    value={f.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    placeholder="Ερώτηση"
                  />
                  <button type="button" onClick={() => removeFaq(i)} className="rounded p-2 text-ink-muted hover:text-red-600" aria-label="Διαγραφή FAQ">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <textarea
                  className={input + " resize-y"}
                  rows={2}
                  value={f.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                  placeholder="Απάντηση"
                />
              </div>
            ))}
            <button type="button" onClick={addFaq} className="inline-flex items-center gap-2 rounded-full border border-dashed border-stone-dark px-4 py-2 text-sm text-ink-muted transition-colors hover:border-cobalt hover:text-cobalt">
              <Plus className="size-4" strokeWidth={1.5} />
              Προσθήκη ερώτησης
            </button>
          </div>
        </section>

        {/* English — machine-translated on publish, editable here */}
        {article && (
          <EnglishPanel article={article} slug={form.slug} disabled={!id} />
        )}
      </div>

      {/* Action bar */}
      <div className="sticky bottom-4 mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-stone bg-snow/95 p-4 shadow-[0_20px_50px_-25px_rgba(15,37,64,0.4)] backdrop-blur">
        <button
          onClick={onSave}
          disabled={!!busy}
          className="inline-flex items-center gap-2 rounded-full border border-stone px-5 py-2.5 text-sm text-ink transition-colors hover:border-cobalt hover:text-cobalt disabled:opacity-50"
        >
          <Save className="size-4" strokeWidth={1.5} />
          {busy === "save" ? "Αποθήκευση..." : "Αποθήκευση προσχεδίου"}
        </button>

        {status === "published" ? (
          <button onClick={onUnpublish} disabled={!!busy} className="inline-flex items-center gap-2 rounded-full border border-stone px-5 py-2.5 text-sm text-ink transition-colors hover:border-gold hover:text-gold disabled:opacity-50">
            <Undo2 className="size-4" strokeWidth={1.5} />
            {busy === "unpublish" ? "..." : "Απόσυρση"}
          </button>
        ) : (
          <button onClick={onPublish} disabled={!!busy} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-snow transition-colors hover:bg-cobalt disabled:opacity-50">
            <Send className="size-4" strokeWidth={1.5} />
            {busy === "publish" ? "Δημοσίευση..." : "Έγκριση & Δημοσίευση"}
          </button>
        )}

        {id && form.slug && (
          <Link
            href={`/api/preview?slug=${form.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-stone px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Eye className="size-4" strokeWidth={1.5} />
            Προβολή
          </Link>
        )}

        <button onClick={onDelete} disabled={!!busy} className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-ink-muted transition-colors hover:text-red-600 disabled:opacity-50">
          <Trash2 className="size-4" strokeWidth={1.5} />
          Διαγραφή
        </button>
      </div>
    </div>
  );
}
