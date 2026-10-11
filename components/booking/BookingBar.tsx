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
import { fieldLabelClass, prefixIconClass } from "../ui/panels";
import { LocationField, pickedPlaceRule } from "./LocationField";
import { ModeTabs } from "./ModeTabs";

type Values = {
  pickup?: Place;
  dropoff?: Place;
  duration?: string;
  date?: Dayjs;
  time?: Dayjs;
};

const label = (text: string) => <span className={fieldLabelClass}>{text}</span>;
// Pick-up and drop-off take a full row until all five fields fit on one line.
const location = "col-span-2 xl:col-span-1";
const disablePast = (d: Dayjs) => d.isBefore(dayjs().startOf("day"));

/** The quick-booking panel on the home page. Collects the trip, then hands it to /book. */
export function BookingBar({
  defaultMode = "transfer",
}: {
  defaultMode?: BookingMode;
}) {
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
    <div className="rounded-lg bg-surface-raised px-4 pt-4 pb-6 shadow-float md:rounded-xl md:px-8 md:pt-6 md:pb-8">
      <ModeTabs value={mode} onChange={setMode} />
      <Form
        form={form}
        className="ow-form"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        aria-label="Book a chauffeur"
        initialValues={{
          time: dayjs("09:00", "HH:mm"),
          duration: durations[0],
        }}
      >
        {/* 2 columns on phones, 4 on tablets (locations take a full row), all 5 in one row from xl.
            ow-form-flush drops antd's gap under each field (globals.css). */}
        <div className="ow-form-flush grid grid-cols-2 items-start gap-4 md:grid-cols-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
          <Form.Item
            name="pickup"
            className={location}
            label={label("Pick-up")}
            validateTrigger={["onChange", "onBlur"]}
            rules={[pickedPlaceRule("Choose a pick-up from the suggestions")]}
          >
            <LocationField
              placeholder={
                mode === "airport"
                  ? "Airport (STL, JFK) or address"
                  : "Address, hotel or airport"
              }
            />
          </Form.Item>

          {mode === "hourly" ? (
            <Form.Item name="duration" className={location} label={label("Duration")}>
              <Select
                prefix={<Icon name="clock" className={prefixIconClass} />}
                options={durations.map((d) => ({ value: d, label: d }))}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="dropoff"
              className={location}
              label={label("Drop-off")}
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                pickedPlaceRule("Choose a drop-off from the suggestions"),
              ]}
            >
              <LocationField
                placeholder={
                  mode === "airport"
                    ? "Airport, address or hotel"
                    : "Address, hotel or venue"
                }
              />
            </Form.Item>
          )}

          <Form.Item
            name="date"
            label={label("Date")}
            rules={[{ required: true, message: "Choose a date" }]}
          >
            <DatePicker
              prefix={<Icon name="calendar" className={prefixIconClass} />}
              suffixIcon={null}
              format="MMM D, YYYY"
              placeholder="Select date"
              disabledDate={disablePast}
              inputReadOnly
            />
          </Form.Item>
          <Form.Item
            name="time"
            label={label("Time")}
            rules={[{ required: true, message: "Choose a time" }]}
          >
            <TimePicker
              prefix={<Icon name="clock" className={prefixIconClass} />}
              suffixIcon={null}
              format="h:mm A"
              use12Hours
              minuteStep={5}
              needConfirm={false}
              inputReadOnly
            />
          </Form.Item>

          <div className="col-span-2 md:col-span-4 xl:col-span-1 xl:pt-[22px]">
            <Button type="submit" size="lg" icon="arrow-right" className="w-full xl:w-auto">
              See vehicles
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
