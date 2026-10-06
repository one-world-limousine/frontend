export type ContactMessage = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
};

/**
 * Sends a contact message. Posts to `${NEXT_PUBLIC_API_URL}/contact` when that env var is set;
 * otherwise it resolves after a short delay so the form can be tried before the backend exists.
 */
export async function submitContact(message: ContactMessage): Promise<void> {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (api) {
    const res = await fetch(`${api.replace(/\/$/, "")}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok) throw new Error(`Message failed (${res.status})`);
    return;
  }
  await new Promise((r) => setTimeout(r, 800));
}
