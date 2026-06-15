"use client";

import "./globals.css";

// Last-resort boundary: catches errors thrown in the ROOT layout itself, so it
// must render its own <html>/<body> (the normal layout is bypassed here).
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="el">
      <body className="antialiased">
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "2rem",
            textAlign: "center",
            background: "#f7f8fa",
            color: "#0a1628",
            fontFamily:
              "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 600, margin: 0 }}>
            Παρουσιάστηκε ένα σφάλμα
          </h1>
          <p style={{ maxWidth: "40ch", color: "#46566b", lineHeight: 1.6 }}>
            Λυπούμαστε για την αναστάτωση. Δοκιμάστε ξανά ή επαναφορτώστε τη
            σελίδα.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              borderRadius: "9999px",
              background: "#0a1628",
              color: "#f7f8fa",
              padding: "0.9rem 1.75rem",
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Δοκιμάστε ξανά
          </button>
        </main>
      </body>
    </html>
  );
}
