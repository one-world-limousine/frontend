"use client";

import { DatePicker, Form, Input, InputNumber, Select, TimePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { submitBooking, type Trip } from "@/lib/booking";
import { bookingModes, durations, fleet, type BookingMode } from "@/lib/content";
import type { Place } from "@/lib/places";
import { estimateFare } from "@/lib/pricing";
import { phones, site } from "@/lib/site";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { LocationField, pickedPlaceRule } from "./LocationField";
import { ModeTabs } from "./ModeTabs";
import { TripEstimate } from "./TripEstimate";
import { useRoute } from "./useTripEstimate";

type Values = {
  pickup?: Place;
  stops?: (Place | undefined)[];
  dropoff?: Place;
  flight?: string;
  duration?: string;
  date: Dayjs;
  time: Dayjs;
  vehicle: string;
  passengers: number;
  luggage?: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

const MAX_STOPS = 3;
const label = (text: string) => <span className="ow-field-label">{text}</span>;
const prefix = (name: Parameters<typeof Icon>[0]["name"]) => <Icon name={name} className="ow-prefix" />;
const disablePast = (d: Dayjs) => d.isBefore(dayjs().startOf("day"));
const isMode = (v?: string): v is BookingMode => bookingModes.some((m) => m.id === v);
const lastMinute = phones[phones.length - 1];

function initialValues(trip: Trip): Partial<Values> {
  const date = trip.date ? dayjs(trip.date, "YYYY-MM-DD") : undefined;
  const time = trip.time ? dayjs(trip.time, "HH:mm") : dayjs("09:00", "HH:mm");
  return {
    pickup: trip.pickup,
    dropoff: trip.dropoff,
    stops: [],
    duration: trip.duration && durations.includes(trip.duration) ? trip.duration : durations[0],
    date: date?.isValid() ? date : undefined,
    time: time.isValid() ? time : undefined,
    vehicle: fleet.some((f) => f.id === trip.vehicle) ? trip.vehicle : fleet[0].id,
    passengers: 1,
    luggage: 1,
  };
}

export function BookingForm({ trip = {} }: { trip?: Trip }) {
  const [mode, setMode] = useState<BookingMode>(isMode(trip.mode) ? trip.mode : "transfer");
  const [form] = Form.useForm<Values>();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);

  // Live route + fare, recalculated as the trip changes.
  const routed = mode !== "hourly";
  const pickup = Form.useWatch("pickup", form);
  const stops = Form.useWatch("stops", form);
  const dropoff = Form.useWatch("dropoff", form);
  const vehicleId = Form.useWatch("vehicle", form);
  const time = Form.useWatch("time", form);
  const route = useRoute(routed ? [pickup, ...(stops ?? []), dropoff] : []);
  const vehicle = fleet.find((f) => f.id === vehicleId);
  const timeText = time?.format("HH:mm");

  const onFinish = async (v: Values) => {
    setStatus("sending");
    const fare = route.status === "ready" && vehicle ? estimateFare(vehicle.fareClass, route.miles, v.time.format("HH:mm")) : null;
    try {
      const res = await submitBooking({
        mode,
        pickup: v.pickup!,
        stops: routed ? (v.stops ?? []).filter((s): s is Place => !!s) : [],
        dropoff: routed ? v.dropoff : undefined,
        flight: mode === "airport" ? v.flight : undefined,
        duration: mode === "hourly" ? v.duration : undefined,
        date: v.date.format("YYYY-MM-DD"),
        time: v.time.format("HH:mm"),
        vehicle: v.vehicle,
        passengers: v.passengers,
        luggage: v.luggage,
        name: v.name,
        email: v.email,
        phone: v.phone,
        notes: v.notes,
        estimate:
          route.status === "ready" && fare
            ? { miles: route.miles, minutes: route.minutes, fare: fare.kind === "price" ? fare.amount : "call" }
            : undefined,
      });
      setReference(res.reference);
      setStatus("idle");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {reference ? (
        <m.div key="done" className="bk-card bk-success" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="bk-success-mark"><Icon name="check" /></span>
          <h2>Your request is in.</h2>
          <p>
            Reference <strong>{reference}</strong>. A reservations agent will confirm your chauffeur and fare by email within 24 hours. For a
            ride at short notice, call <a href={lastMinute.href}>{lastMinute.number}</a>.
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              form.resetFields();
              setReference(null);
            }}
          >
            Book another ride
          </Button>
        </m.div>
      ) : (
        <m.div key="form" className="bk-card" exit={{ opacity: 0, y: -12 }}>
          <Form
            form={form}
            className="ow-form"
            layout="vertical"
            requiredMark={false}
            initialValues={initialValues(trip)}
            onFinish={onFinish}
            scrollToFirstError={{ behavior: "smooth", block: "center" }}
            aria-label="Reservation request"
          >
            <section className="bk-section" aria-labelledby="bk-trip">
              <h2 className="bk-section-title" id="bk-trip">Your trip</h2>
              <ModeTabs value={mode} onChange={setMode} />
              <div className="bk-fields">
                <Form.Item
                  className="bk-span"
                  name="pickup"
                  label={label("Pick-up")}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[pickedPlaceRule("Choose a pick-up address from the suggestions")]}
                >
                  <LocationField placeholder={mode === "airport" ? "Airport (STL, JFK), address or hotel" : "Address, hotel or airport"} />
                </Form.Item>

                {routed && (
                  <Form.List name="stops">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, i) => (
                          <div className="bk-span bk-stop" key={field.key}>
                            <Form.Item
                              name={field.name}
                              label={label(`Stop ${i + 1}`)}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[pickedPlaceRule("Choose this stop from the suggestions, or remove it")]}
                            >
                              <LocationField placeholder="Address, hotel or venue" />
                            </Form.Item>
                            <button type="button" className="bk-stop-remove" onClick={() => remove(field.name)} aria-label={`Remove stop ${i + 1}`}>
                              <Icon name="close" />
                            </button>
                          </div>
                        ))}
                        {fields.length < MAX_STOPS && (
                          <div className="bk-span">
                            <button type="button" className="bk-add-stop" onClick={() => add()}>
                              <Icon name="plus" />
                              {fields.length ? "Add another stop" : "Add a stop"}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </Form.List>
                )}

                {routed && (
                  <Form.Item
                    className="bk-span"
                    name="dropoff"
                    label={label("Drop-off")}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[pickedPlaceRule("Choose a drop-off address from the suggestions")]}
                  >
                    <LocationField placeholder={mode === "airport" ? "Airport, address or hotel" : "Address, hotel or venue"} />
                  </Form.Item>
                )}
                {mode === "airport" && (
                  <Form.Item className="bk-span" name="flight" label={label("Flight number")} extra="We track it and adjust for delays.">
                    <Input prefix={prefix("plane")} placeholder="AA100" />
                  </Form.Item>
                )}
                {mode === "hourly" && (
                  <Form.Item className="bk-span" name="duration" label={label("Duration")}>
                    <Select prefix={prefix("clock")} options={durations.map((d) => ({ value: d, label: d }))} />
                  </Form.Item>
                )}

                <Form.Item name="date" label={label("Date")} rules={[{ required: true, message: "Choose a date" }]}>
                  <DatePicker prefix={prefix("calendar")} suffixIcon={null} format="MMM D, YYYY" placeholder="Select date" disabledDate={disablePast} inputReadOnly />
                </Form.Item>
                <Form.Item name="time" label={label("Pick-up time")} rules={[{ required: true, message: "Choose a time" }]}>
                  <TimePicker prefix={prefix("clock")} suffixIcon={null} format="h:mm A" use12Hours minuteStep={5} needConfirm={false} inputReadOnly />
                </Form.Item>
              </div>
            </section>

            <section className="bk-section" aria-labelledby="bk-vehicle">
              <h2 className="bk-section-title" id="bk-vehicle">Vehicle and passengers</h2>
              <div className="bk-fields">
                <Form.Item className="bk-span" name="vehicle" label={label("Vehicle")}>
                  <Select
                    prefix={prefix("car")}
                    options={fleet.map((f) => ({ value: f.id, label: `${f.name} · ${f.vehicleClass} · up to ${f.passengers}` }))}
                  />
                </Form.Item>
                <Form.Item
                  name="passengers"
                  label={label("Passengers")}
                  dependencies={["vehicle"]}
                  rules={[
                    { required: true, message: "How many passengers?" },
                    ({ getFieldValue }) => ({
                      validator(_, value?: number) {
                        const car = fleet.find((f) => f.id === getFieldValue("vehicle"));
                        return !car || !value || value <= car.passengers
                          ? Promise.resolve()
                          : Promise.reject(new Error(`The ${car.name} seats up to ${car.passengers}. Choose a larger vehicle.`));
                      },
                    }),
                  ]}
                >
                  <InputNumber prefix={prefix("users")} min={1} max={14} />
                </Form.Item>
                <Form.Item name="luggage" label={label("Bags")}>
                  <InputNumber prefix={prefix("luggage")} min={0} max={20} />
                </Form.Item>
              </div>
              {routed && <TripEstimate route={route} fareClass={vehicle?.fareClass} time={timeText} />}
            </section>

            <section className="bk-section" aria-labelledby="bk-contact">
              <h2 className="bk-section-title" id="bk-contact">Your details</h2>
              <div className="bk-fields">
                <Form.Item className="bk-span" name="name" label={label("Full name")} rules={[{ required: true, whitespace: true, message: "Add the lead passenger's name" }]}>
                  <Input prefix={prefix("user")} placeholder="Jane Carter" autoComplete="name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={label("Email")}
                  rules={[
                    { required: true, message: "Add an email for the confirmation" },
                    { type: "email", message: "Check the email address" },
                  ]}
                >
                  <Input prefix={prefix("mail")} placeholder="jane@company.com" type="email" autoComplete="email" inputMode="email" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={label("Mobile")}
                  rules={[
                    { required: true, message: "Add a mobile number for your chauffeur" },
                    { pattern: /^\+?[0-9 ()-]{7,20}$/, message: "Use digits, spaces and an optional +" },
                  ]}
                >
                  <Input prefix={prefix("phone")} placeholder="+1 (212) 555-0147" type="tel" autoComplete="tel" inputMode="tel" />
                </Form.Item>
                <Form.Item className="bk-span" name="notes" label={label("Notes for your chauffeur")}>
                  <Input.TextArea rows={4} placeholder="A stop on the way, extra luggage, anything we should know" maxLength={500} showCount />
                </Form.Item>
              </div>

              {status === "error" && (
                <p className="ow-field-msg" role="alert" style={{ color: "var(--danger)", display: "flex", gap: 8, alignItems: "center", margin: "0 0 16px" }}>
                  <Icon name="alert" /> We could not send your request. Try again, or call {site.phone}.
                </p>
              )}

              <Button type="submit" size="lg" icon="arrow-right" disabled={status === "sending"}>
                {status === "sending" ? "Sending request" : "Request booking"}
              </Button>
              <p className="bk-legal">No payment is taken now. The estimate is a guide; we confirm the final fare by email before your ride.</p>
            </section>
          </Form>
        </m.div>
      )}
    </AnimatePresence>
  );
}
