import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, SparklesIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-secondary/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-32 size-80 rounded-full bg-gold/15 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
            <SparklesIcon className="size-4 text-gold-foreground" aria-hidden />
            Social development & volunteer platform
          </span>

          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Give time. Grow communities.
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground text-pretty">
            Goodora connects you with community development initiatives across
            food, education, environment, and care — find a program, join an
            event, and watch your hours turn into visible impact.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-11 px-6 text-base"
              render={<Link href="/signup" />}
            >
              Become a Volunteer
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6 text-base"
              render={<Link href="/programs" />}
            >
              Explore Programs
            </Button>
          </div>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <UsersIcon className="size-4 text-primary" aria-hidden />
            Open to everyone — no experience needed, just the will to help.
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-foreground/10 shadow-xl">
            <Image
              src="/option/planting%20tree%20illustration.jpeg"
              alt="Volunteers planting trees together"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden w-44 overflow-hidden rounded-2xl ring-1 ring-foreground/10 shadow-lg sm:block">
            <div className="relative aspect-square">
              <Image
                src="/option/Elderly%20Care.jpeg"
                alt="Volunteer caring for an elder"
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -top-4 -right-3 rounded-2xl border border-gold/40 bg-accent px-4 py-2.5 shadow-md">
            <p className="text-xs font-semibold tracking-wider text-gold-foreground uppercase">
              Every hour counts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
