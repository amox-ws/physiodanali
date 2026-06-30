import Link from "next/link";
import { Check, X } from "lucide-react";
import { site } from "@/lib/content";
import { verifyTransaction } from "@/lib/viva";
import { markDepositPaidByOrder } from "@/lib/booking";

export const dynamic = "force-dynamic";
export const metadata = { title: "Πληρωμή προκαταβολής", robots: { index: false } };

export default async function PaymentReturn({
  searchParams,
}: {
  searchParams: Promise<{ t?: string; s?: string }>;
}) {
  const { t, s } = await searchParams;
  let paid = false;
  if (t) {
    const v = await verifyTransaction(t);
    if (v?.paid) paid = await markDepositPaidByOrder(v.orderCode || s || "");
  }

  return (
    <section className="flex min-h-[70vh] items-center bg-porcelain px-6 py-28">
      <div className="mx-auto w-full max-w-[520px] text-center">
        <span
          className={`mx-auto flex size-14 items-center justify-center rounded-full ${paid ? "bg-cobalt/10" : "bg-red-100"}`}
        >
          {paid ? (
            <Check className="size-6 text-cobalt" strokeWidth={2} />
          ) : (
            <X className="size-6 text-red-600" strokeWidth={2} />
          )}
        </span>
        <h1 className="display mt-6 text-3xl tracking-tight text-ink">
          {paid ? "Η προκαταβολή ελήφθη!" : "Η πληρωμή δεν ολοκληρώθηκε"}
        </h1>
        <p className="mt-4 text-ink-muted">
          {paid
            ? "Το ραντεβού σας είναι εξασφαλισμένο. Θα επικοινωνήσουμε για την τελική επιβεβαίωση."
            : "Δεν χρεωθήκατε. Μπορείτε να δοκιμάσετε ξανά ή να καλέσετε μας."}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3 text-sm text-snow transition-colors hover:bg-cobalt"
          >
            Αρχική
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="rounded-full border border-stone px-6 py-3 text-sm text-ink transition-colors hover:border-cobalt"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
