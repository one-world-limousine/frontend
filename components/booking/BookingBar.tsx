"use client";

import { DatePicker, Form, Select, TimePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { durations, type BookingMode } from "@/lib/content";
import { tripToSearch } from "@/lib/booking";
import type { Place } from "@/lib/places";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { LocationField, pickedPlaceRule } from "./LocationField";
import { ModeTabs } from "./ModeTabs";

type Values = { pickup?: Place; dropoff?: Place; duration?: string; date?: Dayjs; time?: Dayjs };

const label = (text: string) => <span className="ow-field-label">{text}</span>;
const disablePast = (d: Dayjs) => d.isBefore(dayjs().startOf("day"));

/** The quick-booking panel on the home page. Collects the trip, then hands it to /book. */
export function BookingBar({ defaultMode = "transfer" }: { defaultMode?: BookingMode }) {
  const [mode, setMode] = useState<BookingMode>(defaultMode);
  const [form] = Form.useForm<Values>();
  const router = useRouter();

  const onFinish = (v: Values) => {
    router.push(
      `/book${tripToSearch({
        mode,
        pickup: v.pickup,
        dropoff: mode === "hourly" ? undefined : v.dropoff,
        duration: mode === "hourly" ? v.duration : undefined,
        date: v.date?.format("YYYY-MM-DD"),
        time: v.time?.format("HH:mm"),
      })}`,
    );
  };

  return (
    <div className="ow-book">
      <ModeTabs value={mode} onChange={setMode} />
      <Form
        form={form}
        className="ow-form"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        aria-label="Book a chauffeur"
        initialValues={{ time: dayjs("09:00", "HH:mm"), duration: durations[0] }}
      >
        <div className="ow-book-grid">
          <Form.Item
            name="pickup"
            label={label("Pick-up")}
            validateTrigger={["onChange", "onBlur"]}
            rules={[pickedPlaceRule("Choose a pick-up from the suggestions")]}
          >
            <LocationField placeholder={mode === "airport" ? "Airport (STL, JFK) or address" : "Address, hotel or airport"} />
          </Form.Item>

          {mode === "hourly" ? (
            <Form.Item name="duration" label={label("Duration")}>
              <Select prefix={<Icon name="clock" className="ow-prefix" />} options={durations.map((d) => ({ value: d, label: d }))} />
            </Form.Item>
          ) : (
            <Form.Item
              name="dropoff"
              label={label("Drop-off")}
              validateTrigger={["onChange", "onBlur"]}
              rules={[pickedPlaceRule("Choose a drop-off from the suggestions")]}
            >
              <LocationField placeholder={mode === "airport" ? "Airport, address or hotel" : "Address, hotel or venue"} />
            </Form.Item>
          )}

          <Form.Item name="date" label={label("Date")} rules={[{ required: true, message: "Choose a date" }]}>
            <DatePicker
              prefix={<Icon name="calendar" className="ow-prefix" />}
              suffixIcon={null}
              format="MMM D, YYYY"
              placeholder="Select date"
              disabledDate={disablePast}
              inputReadOnly
            />
          </Form.Item>
          <Form.Item name="time" label={label("Time")} rules={[{ required: true, message: "Choose a time" }]}>
            <TimePicker
              prefix={<Icon name="clock" className="ow-prefix" />}
              suffixIcon={null}
              format="h:mm A"
              use12Hours
              minuteStep={5}
              needConfirm={false}
              inputReadOnly
            />
          </Form.Item>

          <div className="ow-book-submit">
            <Button type="submit" size="lg" icon="arrow-right">
              See vehicles
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
