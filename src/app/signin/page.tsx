"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** Demo form — no backend auth is wired up yet. */
export default function SignInPage() {
  const [signedIn, setSignedIn] = useState(false);

  if (signedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary">
          <CircleCheckIcon className="size-7 text-primary" aria-hidden />
        </div>
        <h1 className="font-heading mt-5 text-2xl font-semibold text-foreground">
          Signed in (demo)
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Authentication isn&apos;t connected yet — in a live deployment you&apos;d land
          on your dashboard now.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button render={<Link href="/dashboard" />}>Go to dashboard</Button>
          <Button variant="outline" onClick={() => setSignedIn(false)}>
            Back to sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:py-24">
      <Card className="py-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
          <CardDescription>
            Welcome back — sign in to manage your volunteer activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSignedIn(true); // demo only — wire to backend auth
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Email
              <Input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Password
              <Input name="password" type="password" required placeholder="Your password" />
            </label>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 font-normal text-muted-foreground">
                <Input
                  type="checkbox"
                  name="remember"
                  className="size-3.5"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" size="lg" className="h-10 w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            New to Goodora?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Demo form — authentication backend not connected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
