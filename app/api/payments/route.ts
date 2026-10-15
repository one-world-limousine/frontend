import { fleet } from "@/lib/content";
import { parsePaymentRequest, toPlace } from "@/lib/payments";
import { places } from "@/lib/places";
import { estimateFare } from "@/lib/pricing";
import { createSquareCheckout } from "@/lib/square";

/**
 * Booking payment: recalculates the route and fare here (never trusting the browser's amount)
 * and returns the URL of a Square hosted checkout page for it.
 */
export async function POST(request: Request) {
  const req = parsePaymentRequest(await request.json().catch(() => null));
  if (!req) return Response.json({ error: "Invalid payment request" }, { status: 400 });

  const vehicle = fleet.find((f) => f.id === req.vehicle)!;
  const route = await places.route(req.points.map(toPlace)).catch(() => null);
  if (!route) return Response.json({ error: "Could not price this route" }, { status: 422 });
  const fare = estimateFare(vehicle.fareClass, route.miles, req.time);
  if (fare.kind !== "price") return Response.json({ error: "This vehicle is priced by phone" }, { status: 422 });

  try {
    const url = await createSquareCheckout({
      name: `${vehicle.name} ride · ${req.reference}`,
      amountCents: fare.amount * 100,
      idempotencyKey: `${req.reference}-${fare.amount}`,
      note: `Booking ${req.reference}: ${req.points.map((p) => p.label).join(" → ")}`.slice(0, 500),
      email: req.email,
    });
    return Response.json({ url, amount: fare.amount });
  } catch (err) {
    console.error("[payments] checkout failed", err);
    return Response.json({ error: "Could not start checkout" }, { status: 502 });
  }
}
