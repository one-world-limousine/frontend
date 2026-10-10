import { parseContact } from "./contact";

export type DriverApplication = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  blackCar: boolean;
  mtcLicense: boolean;
  mtcSticker: boolean;
  commercialInsurance: boolean;
  commercialLicense: boolean;
  experience?: string;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: string;
};

/** The yes/no questions on the eapremiumtransportation.com driver application, in its order. */
export const driverQuestions = [
  { name: "blackCar", label: "Do you have a premium black car?" },
  { name: "mtcLicense", label: "Do you have an MTC license?" },
  { name: "mtcSticker", label: "Do you have an MTC sticker?" },
  { name: "commercialInsurance", label: "Do you have commercial insurance?" },
  { name: "commercialLicense", label: "Do you have a commercial driver's license?" },
] as const satisfies readonly { name: keyof DriverApplication; label: string }[];

/** What a driver needs to join, as listed on the reference site. */
export const driverRequirements = [
  "Your own premium black car",
  "An active MTC (Metropolitan Taxicab Commission) license",
  "A valid MTC vehicle sticker",
  "Commercial auto insurance",
  "A commercial driver's license",
];

/** Checks an application on the server; returns it cleaned, or null if a field is missing or malformed. */
export function parseDriverApplication(body: unknown): DriverApplication | null {
  const b = (body ?? {}) as Record<string, unknown>;
  // Name, email and phone follow the contact form's rules.
  const person = parseContact({ ...b, message: b.experience ?? "" });
  if (!person || driverQuestions.some((q) => typeof b[q.name] !== "boolean")) return null;
  const answers = Object.fromEntries(driverQuestions.map((q) => [q.name, b[q.name] as boolean]));
  const { message: experience, ...rest } = person;
  return { ...rest, ...answers, experience } as DriverApplication;
}

/** Sends a driver application to the business inbox (see app/api/drivers). */
export async function submitDriverApplication(application: DriverApplication): Promise<void> {
  const res = await fetch("/api/drivers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  if (!res.ok) throw new Error(`Application failed (${res.status})`);
}
