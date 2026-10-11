"use client";

import { Form, Input, Radio } from "antd";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { driverQuestions, submitDriverApplication, type DriverApplication } from "@/lib/careers";
import { phones } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import {
  fieldLabelClass,
  fieldsClass,
  formErrorClass,
  formSectionClass,
  formSectionTitleClass,
  honeypotClass,
  legalClass,
  panelClass,
  prefixIconClass,
  successClass,
  successMarkClass,
  successTextClass,
  successTitleClass,
} from "../ui/panels";

const label = (text: string) => <span className={fieldLabelClass}>{text}</span>;
const prefix = (name: Parameters<typeof Icon>[0]["name"]) => <Icon name={name} className={prefixIconClass} />;
const yesNo = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

/** The driver application, with the same questions as the eapremiumtransportation.com form. */
export function DriverForm() {
  const [form] = Form.useForm<DriverApplication>();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [sentTo, setSentTo] = useState<string | null>(null);

  const onFinish = async (values: DriverApplication) => {
    setStatus("sending");
    try {
      await submitDriverApplication({ ...values, firstName: values.firstName.trim(), lastName: values.lastName.trim() });
      setSentTo(values.firstName.trim());
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sentTo ? (
        <m.div key="sent" className={cn(panelClass, successClass)} role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className={successMarkClass}><Icon name="check" size={28} /></span>
          <h2 className={successTitleClass}>Thank you, {sentTo}.</h2>
          <p className={successTextClass}>
            Your application is with our team. We review every one and reply within 24 hours to arrange the next
            step. Questions in the meantime? Call <a href={phones[0].href}>{phones[0].number}</a>.
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              form.resetFields();
              setSentTo(null);
            }}
          >
            Start a new application
          </Button>
        </m.div>
      ) : (
        <m.div key="form" className={panelClass} exit={{ opacity: 0, y: -12 }}>
          <Form
            form={form}
            className="ow-form"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            scrollToFirstError={{ behavior: "smooth", block: "center" }}
            aria-labelledby="dr-form-title"
          >
            <section className={formSectionClass}>
              <h2 className={formSectionTitleClass} id="dr-form-title">Your details</h2>
              <div className={fieldsClass}>
                <Form.Item name="firstName" label={label("First name")} rules={[{ required: true, whitespace: true, message: "Add your first name" }]}>
                  <Input prefix={prefix("user")} placeholder="Jane" autoComplete="given-name" />
                </Form.Item>
                <Form.Item name="lastName" label={label("Last name")} rules={[{ required: true, whitespace: true, message: "Add your last name" }]}>
                  <Input prefix={prefix("user")} placeholder="Carter" autoComplete="family-name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={label("Email")}
                  rules={[
                    { required: true, message: "Add an email so we can reply" },
                    { type: "email", message: "Check the email address" },
                  ]}
                >
                  <Input prefix={prefix("mail")} placeholder="jane@example.com" type="email" autoComplete="email" inputMode="email" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={label("Mobile number")}
                  rules={[
                    { required: true, message: "Add a mobile number" },
                    { pattern: /^\+?[0-9 ()-]{7,20}$/, message: "Use digits, spaces and an optional +" },
                  ]}
                >
                  <Input prefix={prefix("phone")} placeholder="+1 (314) 555-0147" type="tel" autoComplete="tel" inputMode="tel" />
                </Form.Item>
              </div>
            </section>

            <section className={formSectionClass}>
              <h2 className={formSectionTitleClass}>Vehicle and licensing</h2>
              <div className="border-t border-line">
                {driverQuestions.map((q) => (
                  <Form.Item
                    key={q.name}
                    // dr-q: question beside the Yes / No buttons (antd overrides in globals.css).
                    className="dr-q"
                    name={q.name}
                    label={<span className="text-[15px] leading-[22px] font-semibold text-ink">{q.label}</span>}
                    rules={[{ required: true, message: "Choose yes or no" }]}
                  >
                    <Radio.Group options={yesNo} optionType="button" buttonStyle="solid" />
                  </Form.Item>
                ))}
              </div>
              <Form.Item className="dr-notes" name="experience" label={label("Your car and experience (optional)")}>
                <Input.TextArea
                  rows={4}
                  placeholder="Make, model and year of your car, and how long you have been driving professionally"
                  maxLength={1000}
                  showCount
                />
              </Form.Item>
            </section>

            {/* Honeypot: hidden from people, so only bots fill it in. */}
            <div className={honeypotClass} aria-hidden="true">
              <Form.Item name="website" label="Website">
                <Input tabIndex={-1} autoComplete="off" />
              </Form.Item>
            </div>

            {status === "error" && (
              <p className={cn(formErrorClass, "text-sm")} role="alert">
                <Icon name="alert" size={18} /> We could not send your application. Try again, or call {phones[0].number}.
              </p>
            )}

            <Button type="submit" size="lg" icon="arrow-right" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Submit application"}
            </Button>
            <p className={legalClass}>We reply within 24 hours. We only use your details to review your application.</p>
          </Form>
        </m.div>
      )}
    </AnimatePresence>
  );
}
