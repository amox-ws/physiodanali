import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "PhysioDanali — Χειροπρακτική & Φυσικοθεραπεία κατ' οίκον";

// Default social-share image for the whole site (any page without its own).
export default function Image() {
  return renderOg({
    eyebrow: "PHYSIODANALI",
    title: "Χειροπρακτική & Φυσικοθεραπεία κατ' οίκον.",
    footer: "Βούλα · Βουλιαγμένη · Βάρη · Γλυφάδα · έως 23:00",
  });
}
