"use client";

import { AutoComplete, Spin } from "antd";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { places, type Place } from "@/lib/places";
import { Icon } from "../ui/Icon";

type LocationFieldProps = {
  /** Set by antd Form.Item: the picked place, or undefined while the text is not a picked suggestion. */
  value?: Place;
  onChange?: (place: Place | undefined) => void;
  onBlur?: (e: FocusEvent<HTMLElement>) => void;
  placeholder?: string;
  id?: string;
  "aria-invalid"?: boolean;
};

const MIN_CHARS = 3;
const DEBOUNCE_MS = 280;

/**
 * Address search with suggestions. Like the reference site, only a picked suggestion counts as a value
 * (so every trip can be routed); free text stays in the box but the form treats the field as empty.
 */
export function LocationField({ value, onChange, onBlur, placeholder, id, ...rest }: LocationFieldProps) {
  const [text, setText] = useState(value?.label ?? "");
  const [options, setOptions] = useState<Place[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const request = useRef<AbortController>(undefined);

  // Keep the box in step when the form sets or resets the value from outside.
  const [lastValue, setLastValue] = useState(value);
  if (value !== lastValue) {
    setLastValue(value);
    if (value) setText(value.label);
    else if (lastValue && text === lastValue.label) setText("");
  }

  useEffect(() => () => {
    clearTimeout(timer.current);
    request.current?.abort();
  }, []);

  const search = (query: string) => {
    clearTimeout(timer.current);
    request.current?.abort();
    if (query.trim().length < MIN_CHARS) {
      setOptions([]);
      setStatus("idle");
      return;
    }
    // Local matches (airport codes) appear at once; the full search replaces them when it returns.
    setOptions(places.instant?.(query.trim()) ?? []);
    setStatus("loading");
    timer.current = setTimeout(async () => {
      const controller = new AbortController();
      request.current = controller;
      try {
        const found = await places.suggest(query.trim(), controller.signal);
        setOptions(found);
        setStatus("idle");
      } catch {
        if (controller.signal.aborted) return; // superseded by newer typing
        setStatus("error");
      }
    }, DEBOUNCE_MS);
  };

  const onType = (next: string) => {
    setText(next);
    if (value) onChange?.(undefined);
    search(next);
  };

  const onPick = (label: string) => {
    const place = options.find((o) => o.label === label);
    if (!place) return;
    setText(place.label);
    setLastValue(place);
    onChange?.(place);
  };

  const notFound =
    status === "loading" ? (
      <span className="ow-loc-empty"><Spin size="small" /> Searching</span>
    ) : status === "error" ? (
      <span className="ow-loc-empty">Address search is unavailable. Try again in a moment.</span>
    ) : text.trim().length >= MIN_CHARS ? (
      <span className="ow-loc-empty">No matches. Try a street, hotel, airport code or city.</span>
    ) : null;

  return (
    <AutoComplete
      id={id}
      value={text}
      onChange={onType}
      onSelect={onPick}
      onBlur={onBlur}
      showSearch={{ filterOption: false }}
      prefix={<Icon name={value?.kind === "airport" ? "plane" : "map-pin"} className="ow-prefix" />}
      placeholder={placeholder}
      notFoundContent={notFound}
      popupMatchSelectWidth
      className="ow-loc"
      classNames={{ popup: { root: "ow-loc-popup" } }}
      aria-invalid={rest["aria-invalid"]}
      // Plain one-line label: v6 shows the picked option's label in the field when it is not focused.
      options={options.map((o) => ({ value: o.label, label: o.label, place: o }))}
      // The dropdown gets the richer two-line layout.
      optionRender={(option) => {
        const o = (option.data as { place: Place }).place;
        return (
          <span className="ow-loc-option">
            <Icon name={o.kind === "airport" ? "plane" : o.kind === "address" ? "map-pin" : "building"} />
            <span>
              <span className="ow-loc-name">{o.name}</span>
              {o.detail && <span className="ow-loc-detail">{o.detail}</span>}
            </span>
          </span>
        );
      }}
    />
  );
}

/** Form rule: the field must hold a picked suggestion, not just typed text. */
export const pickedPlaceRule = (message: string) => ({
  validator: (_: unknown, v?: Place) => (v ? Promise.resolve() : Promise.reject(new Error(message))),
});
