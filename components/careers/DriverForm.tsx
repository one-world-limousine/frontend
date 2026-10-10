"use client";

import { Form, Input, Radio } from "antd";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { driverQuestions, submitDriverApplication, type DriverApplication } from "@/lib/careers";
import { phones } from "@/lib/site";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

const label = (text: string) => <span className="ow-field-label">{text}</span>;
const prefix = (name: Parameters<typeof Icon>[0]["name"]) => <Icon name={name} className="ow-prefix" />;
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
        <m.div key="sent" className="bk-card bk-success" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="bk-success-mark"><Icon name="check" /></span>
          <h2>Thank you, {sentTo}.</h2>
          <p>
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
        <m.div key="form" className="bk-card" exit={{ opacity: 0, y: -12 }}>
          <Form
            form={form}
            className="ow-form"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            scrollToFirstError={{ behavior: "smooth", block: "center" }}
            aria-labelledby="dr-form-title"
          >
            <section className="bk-section">
              <h2 className="bk-section-title" id="dr-form-title">Your details</h2>
              <div className="bk-fields">
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

            <section className="bk-section">
              <h2 className="bk-section-title">Vehicle and licensing</h2>
              <div className="dr-questions">
                {driverQuestions.map((q) => (
                  <Form.Item
                    key={q.name}
                    className="dr-q"
                    name={q.name}
                    label={<span className="dr-q-label">{q.label}</span>}
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
            <div className="ow-hp" aria-hidden="true">
              <Form.Item name="website" label="Website">
                <Input tabIndex={-1} autoComplete="off" />
              </Form.Item>
            </div>

            {status === "error" && (
              <p className="ct-error" role="alert">
                <Icon name="alert" /> We could not send your application. Try again, or call {phones[0].number}.
              </p>
            )}

            <Button type="submit" size="lg" icon="arrow-right" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Submit application"}
            </Button>
            <p className="bk-legal">We reply within 24 hours. We only use your details to review your application.</p>
          </Form>
        </m.div>
      )}
    </AnimatePresence>
  );
}
