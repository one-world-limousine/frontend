"use client";

import { Form, Input } from "antd";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { submitContact, type ContactMessage } from "@/lib/contact";
import { phones } from "@/lib/site";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

const label = (text: string) => <span className="ow-field-label">{text}</span>;
const prefix = (name: Parameters<typeof Icon>[0]["name"]) => <Icon name={name} className="ow-prefix" />;
const lastMinute = phones[phones.length - 1];

/** The contact form, with the same fields as the eapremiumtransportation.com contact form. */
export function ContactForm() {
  const [form] = Form.useForm<ContactMessage>();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [sentTo, setSentTo] = useState<string | null>(null);

  const onFinish = async (values: ContactMessage) => {
    setStatus("sending");
    try {
      await submitContact({ ...values, firstName: values.firstName.trim(), lastName: values.lastName.trim() });
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
            Your message is with our reservations team and we reply within 24 hours. If your ride is today, call{" "}
            <a href={lastMinute.href}>{lastMinute.number}</a> so we can attend to you promptly.
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              form.resetFields();
              setSentTo(null);
            }}
          >
            Send another message
          </Button>
        </m.div>
      ) : (
        <m.div key="form" className="bk-card" exit={{ opacity: 0, y: -12 }}>
          <h2 className="bk-section-title" id="ct-form-title">Send us a message</h2>
          <Form
            form={form}
            className="ow-form"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            scrollToFirstError={{ behavior: "smooth", block: "center" }}
            aria-labelledby="ct-form-title"
          >
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
                <Input prefix={prefix("mail")} placeholder="jane@company.com" type="email" autoComplete="email" inputMode="email" />
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
              <Form.Item className="bk-span" name="message" label={label("Comment or message")}>
                <Input.TextArea rows={5} placeholder="A quote for a wedding, weekly airport runs, a question about a booking" maxLength={1000} showCount />
              </Form.Item>
            </div>

            {status === "error" && (
              <p className="ct-error" role="alert">
                <Icon name="alert" /> We could not send your message. Try again, or call {phones[0].number}.
              </p>
            )}

            <Button type="submit" size="lg" icon="arrow-right" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Send message"}
            </Button>
            <p className="bk-legal">We reply within 24 hours. We only use your details to answer you.</p>
          </Form>
        </m.div>
      )}
    </AnimatePresence>
  );
}
