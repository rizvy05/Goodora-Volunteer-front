import Link from "next/link";
import { cn } from "cn";

/** Goodora brand lockup — uses the existing favicon logo asset. */
export default function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Goodora — home"
      className={cn("group flex items-center gap-2", className)}
    >
      {/* Suppress img warning: .ico isn't supported by the next/image optimizer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.ico"
        alt="Goodora logo"
        width={32}
        height={32}
        className="size-8 transition-transform group-hover:scale-105"
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Goodora
          </span>
          <span className="text-[0.65rem] font-medium tracking-wide text-muted-foreground">
            VOLUNTEER PLATFORM
          </span>
        </span>
      )}
    </Link>
  );
}
