import { cn } from "cn";

/** Reusable section header with gold eyebrow, heading and optional description. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-gold-foreground uppercase">
          <span className="size-1.5 rounded-full bg-gold" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
