// Server-only: creates Square hosted checkout pages (https://developer.squareup.com/docs/checkout-api).
// Set SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID, and SQUARE_ENVIRONMENT=production when live; see .env.example.

type Checkout = {
  /** Shown to the customer on the checkout page as the item name. */
  name: string;
  amountCents: number;
  /** Ties retries of the same booking and amount to one payment link. */
  idempotencyKey: string;
  note: string;
  email?: string;
};

export async function createSquareCheckout({ name, amountCents, idempotencyKey, note, email }: Checkout): Promise<string> {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!token || !locationId) throw new Error("SQUARE_ACCESS_TOKEN or SQUARE_LOCATION_ID is not set");
  const host = process.env.SQUARE_ENVIRONMENT === "production" ? "connect.squareup.com" : "connect.squareupsandbox.com";

  const res = await fetch(`https://${host}/v2/online-checkout/payment-links`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Square-Version": "2025-01-23" },
    body: JSON.stringify({
      idempotency_key: idempotencyKey,
      quick_pay: { name, price_money: { amount: amountCents, currency: "USD" }, location_id: locationId },
      payment_note: note,
      checkout_options: { ask_for_shipping_address: false },
      ...(email && { pre_populated_data: { buyer_email: email } }),
    }),
  });
  if (!res.ok) throw new Error(`Square responded ${res.status}: ${await res.text()}`);
  const data: { payment_link: { url: string } } = await res.json();
  return data.payment_link.url;
}
