import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// Renders legal-document sections (privacy / terms / cookies).
// Body convention: paragraphs split by blank lines; bullet lines start with
// "• "; inline links written as [label](/route) or [label](https://…).

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  let i = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [, label, href] = m;
    const external = /^https?:\/\//.test(href);
    nodes.push(
      external ? (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cobalt underline-offset-4 hover:underline"
        >
          {label}
        </a>
      ) : (
        <Link
          key={i}
          href={href}
          className="text-cobalt underline-offset-4 hover:underline"
        >
          {label}
        </Link>
      ),
    );
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Block({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const isList = lines.length > 0 && lines.every((l) => l.trimStart().startsWith("• "));

  if (isList) {
    return (
      <ul className="my-4 space-y-2.5">
        {lines.map((line, idx) => (
          <li key={idx} className="flex gap-3 text-ink-muted">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cobalt/60" />
            <span className="leading-relaxed">
              {renderInline(line.trimStart().slice(2))}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="my-4 leading-relaxed text-ink-muted">{renderInline(text)}</p>
  );
}

export function LegalProse({
  updated,
  sections,
}: {
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <section className="bg-snow py-20 lg:py-28">
      <div className="mx-auto max-w-[760px] px-6 lg:px-10">
        <p className="mb-12 text-sm text-ink-muted">
          Τελευταία ενημέρωση: {updated}
        </p>

        <div className="text-base lg:text-lg">
          {sections.map((s) => (
            <Fragment key={s.heading}>
              <h2 className="display mt-12 mb-2 text-2xl leading-tight tracking-tight text-ink first:mt-0 lg:text-3xl">
                {s.heading}
              </h2>
              {s.body.split(/\n{2,}/).map((block, idx) => (
                <Block key={idx} text={block} />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
