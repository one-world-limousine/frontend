import { driverQuestions, parseDriverApplication } from "@/lib/careers";
import { sendFormEmail } from "@/lib/email";

/** Drive for us form: validates the application and emails it to the business inbox. */
export async function POST(request: Request) {
  const app = parseDriverApplication(await request.json().catch(() => null));
  if (!app) return Response.json({ error: "Invalid application" }, { status: 400 });
  // A filled honeypot means a bot: report success so it moves on, but send nothing.
  if (app.website) return Response.json({ ok: true });

  try {
    await sendFormEmail({
      subject: `Driver application from ${app.firstName} ${app.lastName}`,
      replyTo: app.email,
      fields: [
        ["Name", `${app.firstName} ${app.lastName}`],
        ["Email", app.email],
        ["Mobile", app.phone],
        ...driverQuestions.map((q): [string, string] => [q.label, app[q.name] ? "Yes" : "No"]),
        ["Car and experience", app.experience || "(none)"],
      ],
    });
  } catch (err) {
    console.error("[drivers] email failed", err);
    return Response.json({ error: "Could not send" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
