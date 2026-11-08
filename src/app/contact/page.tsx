"use client";

import { useState } from "react";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  CircleCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/goodora/section-heading";

/* PLACEHOLDER contact details — replace with verified information. */
const contactInfo = [
  {
    icon: MapPinIcon,
    label: "Address",
    value: "Green District Community Center (placeholder address)",
  },
  { icon: MailIcon, label: "Email", value: "hello@goodora.example" },
  { icon: PhoneIcon, label: "Phone", value: "+00 000 000 000" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 sm:px-6 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary">
          <CircleCheckIcon className="size-7 text-primary" aria-hidden />
        </div>
        <h1 className="font-heading mt-5 text-2xl font-semibold text-foreground">
          Message sent (demo)
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a front-end preview — no message was delivered. Once the
          backend is connected, your message will reach the Goodora team here.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
      <div>
        <SectionHeading
          align="left"
          eyebrow="Contact"
          title="Talk to the Goodora team"
          description="Questions about programs, partnerships, or your volunteer account? Send us a note."
        />
        <ul className="mt-8 space-y-4">
          {contactInfo.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <item.icon className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {item.label}
                </span>
                <span className="text-sm text-foreground">{item.value}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <form
        className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true); // demo only — wire to backend when available
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Name
            <Input name="name" required placeholder="Your full name" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <Input name="email" type="email" required placeholder="you@example.com" />
          </label>
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Subject
          <Input name="subject" required placeholder="How can we help?" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Message
          <Textarea name="message" rows={5} required placeholder="Write your message…" />
        </label>
        <Button type="submit" size="lg" className="h-10 w-fit px-6">
          Send message
        </Button>
        <p className="text-xs text-muted-foreground">
          Demo form — submissions are not delivered yet.
        </p>
      </form>
    </div>
  );
}
