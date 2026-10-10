export type ContactMessage = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^\+?[0-9 ()-]{7,20}$/;

const text = (v: unknown, max: number) => (typeof v === "string" && v.trim().length <= max ? v.trim() : undefined);

/** Checks a submission on the server; returns the cleaned message, or null if a field is missing or malformed. */
export function parseContact(body: unknown): ContactMessage | null {
  const b = (body ?? {}) as Record<string, unknown>;
  const msg = {
    firstName: text(b.firstName, 80),
    lastName: text(b.lastName, 80),
    email: text(b.email, 200),
    phone: text(b.phone, 20),
    message: text(b.message ?? "", 1000),
    website: text(b.website ?? "", 200),
  };
  if (!msg.firstName || !msg.lastName || !msg.email || !msg.phone || msg.message === undefined) return null;
  if (!emailPattern.test(msg.email) || !phonePattern.test(msg.phone)) return null;
  return msg as ContactMessage;
}

/** Sends a contact message to the reservations inbox (see app/api/contact). */
export async function submitContact(message: ContactMessage): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  if (!res.ok) throw new Error(`Message failed (${res.status})`);
}
