import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinalCta() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:pb-20" aria-labelledby="final-cta">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[oklch(0.32_0.07_150)] px-6 py-14 text-center text-primary-foreground shadow-xl sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-gold/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-secondary/30 blur-3xl"
        />

        <h2 className="font-heading relative mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Ready to make a difference in your community?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/85">
          Join Goodora today — browse programs, sign up for events, and start
          building the impact story you&apos;ll be proud to share.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-11 bg-gold px-6 text-base text-gold-foreground hover:bg-gold/85"
            render={<Link href="/signup" />}
          >
            Sign Up Free
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 border-primary-foreground/40 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            render={<Link href="/contact" />}
          >
            Contact our team
          </Button>
        </div>
      </div>
    </section>
  );
}
