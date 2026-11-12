
"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** Demo form — no backend auth is wired up yet. */
export default function SignInPage() {
  const [signedIn, setSignedIn] = useState(false);


const formData = new FormData(e.target)
const user=Object.fromEntries(formData.entries())
console.log(user)
const {data,error}=await authClient.signIn({
  email:user.email as string,
  password:user.password as string
})
console.log(data,error)
}
if (error) {
  console.error("Error signing in:", error);
  return;
}
if (data) {
  console.log("User signed in successfully:", data);
  setSignedIn(true)
  redirect("/")
}




  if (signedIn) {
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <CircleCheckIcon className="size-8 text-primary" aria-hidden />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          Signed in (demo)
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Authentication isn&apos;t connected yet — in a live deployment
          you&apos;d land on your dashboard now.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href="/dashboard" />}>
            Go to dashboard
          </Button>

          <Button variant="outline" onClick={() => setSignedIn(false)}>
            Back to sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 sm:px-6 lg:py-16">
      <Card className="w-full max-w-lg border border-border/70 bg-card py-7 shadow-lg shadow-black/5">
        <CardHeader className="space-y-2 px-6 sm:px-8">
          <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back
          </CardTitle>

          <CardDescription className="text-sm leading-6">
            Sign in to manage your volunteer activities and stay connected
            with Goodora.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 sm:px-8">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSignedIn(true);
            }}
          >
            <label className="flex flex-col gap-2 text-sm font-medium">
              Email
              <Input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-11"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Password
              <Input
                name="password"
                type="password"
                required
                placeholder="Your password"
                className="h-11"
              />
            </label>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 font-normal text-muted-foreground">
                <Input
                  type="checkbox"
                  name="remember"
                  className="size-4"
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="mt-1 h-11 w-full">
              Sign in
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <svg
                aria-label="Google logo"
                width="17"
                height="17"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff" />
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                </g>
              </svg>
              Google
            </button>

            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-md bg-black text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              <svg
                aria-label="GitHub logo"
                width="17"
                height="17"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
              GitHub
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            New to Goodora?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Demo form — authentication backend not connected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
