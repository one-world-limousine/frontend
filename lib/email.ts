// Server-only: sends form submissions to the business inbox through Resend (https://resend.com).
// Set RESEND_API_KEY and EMAIL_FROM (an address on a domain verified in Resend); see .env.example.
import { site } from "./site";

type Email = {
  subject: string;
  /** Rows of the submission, shown as a two-column table. */
  fields: [label: string, value: string][];
  /** The visitor's address, so hitting Reply in the inbox answers them. */
  replyTo: string;
};

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const toText = (fields: Email["fields"]) => fields.map(([label, value]) => `${label}: ${value}`).join("\n");

export async function sendFormEmail({ subject, fields, replyTo }: Email): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Without a key the forms still work locally; the message is printed instead of sent.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email] RESEND_API_KEY not set; would send "${subject}":\n${toText(fields)}`);
      return;
    }
    throw new Error("RESEND_API_KEY is not set");
  }

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0;color:#4a4e55;font-weight:600">${escape(label)}</th>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${escape(value)}</td></tr>`,
    )
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.EMAIL_TO ?? site.email],
      reply_to: replyTo,
      subject,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#17181b"><h2 style="font-weight:600">${escape(subject)}</h2><table cellspacing="0">${rows}</table></div>`,
      text: toText(fields),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}
