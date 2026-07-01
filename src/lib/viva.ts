import "server-only";

// Viva Wallet Smart Checkout — optional booking deposit. Graceful no-op until
// the env is configured. Set VIVA_DEMO=1 to use the Viva demo environment.
//
// Env: VIVA_CLIENT_ID, VIVA_CLIENT_SECRET, VIVA_SOURCE_CODE, VIVA_DEMO?

function cfg() {
  const id = process.env.VIVA_CLIENT_ID;
  const secret = process.env.VIVA_CLIENT_SECRET;
  const source = process.env.VIVA_SOURCE_CODE;
  if (!id || !secret || !source) return null;
  const demo = process.env.VIVA_DEMO === "1";
  return {
    id,
    secret,
    source,
    accounts: demo ? "https://demo-accounts.vivapayments.com" : "https://accounts.vivapayments.com",
    api: demo ? "https://demo-api.vivapayments.com" : "https://api.vivapayments.com",
    checkout: demo
      ? "https://demo.vivapayments.com/web/checkout?ref="
      : "https://www.vivapayments.com/web/checkout?ref=",
  };
}

export function vivaConfigured(): boolean {
  return cfg() !== null;
}

async function token(c: NonNullable<ReturnType<typeof cfg>>): Promise<string | null> {
  const basic = Buffer.from(`${c.id}:${c.secret}`).toString("base64");
  const res = await fetch(`${c.accounts}/connect/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { access_token?: string };
  return j.access_token ?? null;
}

/** Create a Smart Checkout order for a deposit. Returns checkout URL + order code. */
export async function createDepositCheckout(opts: {
  amountEur: number;
  appointmentId: string;
  name: string;
  phone: string;
  email?: string;
}): Promise<{ url: string; orderCode: string } | null> {
  const c = cfg();
  if (!c) return null;
  try {
    const t = await token(c);
    if (!t) return null;
    const res = await fetch(`${c.api}/checkout/v2/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(opts.amountEur * 100), // cents
        customerTrns: "Προκαταβολή ραντεβού — PhysioDanali",
        merchantTrns: opts.appointmentId,
        sourceCode: c.source,
        paymentTimeout: 1800,
        customer: {
          fullName: opts.name,
          phone: opts.phone,
          email: opts.email,
          countryCode: "GR",
          requestLang: "el-GR",
        },
      }),
    });
    if (!res.ok) return null;
    const j = (await res.json()) as { orderCode?: number | string };
    if (!j.orderCode) return null;
    return { url: `${c.checkout}${j.orderCode}`, orderCode: String(j.orderCode) };
  } catch {
    return null;
  }
}

/** Verify a transaction after the Viva redirect. */
export async function verifyTransaction(
  transactionId: string,
): Promise<{ paid: boolean; orderCode?: string } | null> {
  const c = cfg();
  if (!c) return null;
  try {
    const t = await token(c);
    if (!t) return null;
    const res = await fetch(`${c.api}/checkout/v2/transactions/${transactionId}`, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (!res.ok) return null;
    const j = (await res.json()) as { statusId?: string; orderCode?: number | string };
    return { paid: j.statusId === "F", orderCode: j.orderCode ? String(j.orderCode) : undefined };
  } catch {
    return null;
  }
}
