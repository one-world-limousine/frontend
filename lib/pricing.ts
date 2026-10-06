// Fare estimate rules, matching the formula on eapremiumtransportation.com/reservation.
// Change the numbers here; the booking form, fleet cards and estimate all read from this file.
export const pricing = {
  vehicles: {
    sedan: { base: 50 },
    suv: { base: 65 },
    sprinter: null, // "Call for pricing"
  },
  includedMiles: 6,
  perMileAfter: 5, // charged per started mile past the included miles
  bookingFee: 5,
  lateNight: { fee: 20, fromMinutes: 23 * 60, untilMinutes: 5 * 60 + 30 }, // 11:00 PM to 5:30 AM pick-ups
  surchargeRate: 0.2, // added to the total
} as const;

export type FareClass = keyof typeof pricing.vehicles;

export type FareEstimate = { kind: "price"; amount: number } | { kind: "call" };

/** Minutes after midnight for an "HH:mm" time. */
const minutesOf = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function isLateNight(time?: string) {
  if (!time) return false;
  const t = minutesOf(time);
  return t >= pricing.lateNight.fromMinutes || t <= pricing.lateNight.untilMinutes;
}

/** Estimated fare for a trip. `time` is the pick-up time as "HH:mm". */
export function estimateFare(fareClass: FareClass, miles: number, time?: string): FareEstimate {
  const vehicle = pricing.vehicles[fareClass];
  if (!vehicle) return { kind: "call" };
  let fare: number = vehicle.base;
  if (miles > pricing.includedMiles) fare += Math.ceil(miles - pricing.includedMiles) * pricing.perMileAfter;
  fare += pricing.bookingFee;
  if (isLateNight(time)) fare += pricing.lateNight.fee;
  fare += fare * pricing.surchargeRate;
  return { kind: "price", amount: Math.round(fare) };
}

/** The lowest fare a vehicle class can have (a short daytime trip), for "From $X" on fleet cards. */
export function startingFare(fareClass: FareClass): number | null {
  const estimate = estimateFare(fareClass, 0, "12:00");
  return estimate.kind === "price" ? estimate.amount : null;
}
