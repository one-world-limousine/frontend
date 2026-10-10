import { parseContact } from "@/lib/contact";
import { sendFormEmail } from "@/lib/email";

/** Contact form: validates the message and emails it to the reservations inbox. */
export async function POST(request: Request) {
  const msg = parseContact(await request.json().catch(() => null));
  if (!msg) return Response.json({ error: "Invalid message" }, { status: 400 });
  // A filled honeypot means a bot: report success so it moves on, but send nothing.
  if (msg.website) return Response.json({ ok: true });

  try {
    await sendFormEmail({
      subject: `Website message from ${msg.firstName} ${msg.lastName}`,
      replyTo: msg.email,
      fields: [
        ["Name", `${msg.firstName} ${msg.lastName}`],
        ["Email", msg.email],
        ["Mobile", msg.phone],
        ["Message", msg.message || "(none)"],
      ],
    });
  } catch (err) {
    console.error("[contact] email failed", err);
    return Response.json({ error: "Could not send" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
