"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const interests = [
  "Blood Donation",
  "Clothing Donation",
  "Community Cleaning",
  "Irrigation Support",
  "Education & Teaching",
  "Elderly Care",
  "Food Distribution",
  "Tree Plantation",
];

/** Demo form — no backend auth is wired up yet. */
export default function SignUpPage() {
  const [created, setCreated] = useState(false);

  if (created) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary">
          <CircleCheckIcon className="size-7 text-primary" aria-hidden />
        </div>
        <h1 className="font-heading mt-5 text-2xl font-semibold text-foreground">
          Account created (demo)
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Registration isn&apos;t connected to a backend yet — in a live deployment
          you&apos;d be redirected to your dashboard now.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button render={<Link href="/dashboard" />}>Go to dashboard</Button>
          <Button variant="outline" onClick={() => setCreated(false)}>
            Back to sign up
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:py-20">
      <Card className="py-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create your account
          </CardTitle>
          <CardDescription>
            Join Goodora and start contributing to community programs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setCreated(true); // demo only — wire to backend auth
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Full name
              <Input name="name" required placeholder="Your full name" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Email
              <Input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Password
                <Input name="password" type="password" required placeholder="At least 8 characters" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Confirm password
                <Input name="confirm" type="password" required placeholder="Repeat password" />
              </label>
            </div>
            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium">
                Causes you care about <span className="font-normal text-muted-foreground">(optional)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:checked]:text-primary"
                  >
                    <Input
                      type="checkbox"
                      name="interest"
                      value={interest}
                      className="size-3"
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </fieldset>
            <Button type="submit" size="lg" className="h-10 w-full">
              Create account
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Demo form — registration backend not connected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
