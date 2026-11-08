"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** Demo form — no backend email flow is wired up yet. */
export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:py-24">
      <Card className="py-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Forgot password?
          </CardTitle>
          <CardDescription>
            {sent
              ? "Check your inbox — we've sent a reset link to the address you entered."
              : "Enter your email and we'll send you a password reset link."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <CircleCheckIcon className="size-6 text-primary" aria-hidden />
              </div>
              <p className="text-sm text-muted-foreground">
                This is a front-end preview — no email was actually sent.
              </p>
              <div className="flex gap-3">
                <Button render={<Link href="/signin" />}>Back to sign in</Button>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Try another email
                </Button>
              </div>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true); // demo only — wire to backend email flow
              }}
            >
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Email
                <Input name="email" type="email" required placeholder="you@example.com" />
              </label>
              <Button type="submit" size="lg" className="h-10 w-full">
                Send reset link
              </Button>
            </form>
          )}

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Remembered it?{" "}
            <Link
              href="/signin"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
