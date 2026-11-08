import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "cn";
import type { Program } from "@/lib/data/programs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** Program card with image (or icon fallback when no asset exists). */
export default function ProgramCard({
  program,
  className,
}: {
  program: Program;
  className?: string;
}) {
  const Icon = program.icon;

  return (
    <Link
      href={`/programs/${program.slug}`}
      className={cn("group focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 rounded-xl", className)}
      aria-label={`${program.title} — view program details`}
    >
      <Card className="h-full gap-0 py-0 transition-all duration-300 ring-foreground/10 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:ring-primary/30">
        <div className="relative h-44 overflow-hidden rounded-t-xl bg-secondary">
          {program.image ? (
            <Image
              src={program.image}
              alt={program.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 via-secondary to-gold/20">
              <Icon
                className="size-14 text-primary transition-transform duration-500 group-hover:scale-110"
                aria-hidden
              />
            </div>
          )}
        </div>
        <CardHeader className="gap-1.5 pt-4">
          <div className="flex items-center gap-2 text-primary">
            <Icon className="size-4" aria-hidden />
            <span className="text-xs font-semibold tracking-wider uppercase opacity-80">
              {program.tagline}
            </span>
          </div>
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {program.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {program.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            View program
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
