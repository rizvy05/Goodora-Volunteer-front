"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, MenuIcon } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { programs } from "@/lib/data/programs";
import Logo from "./logo";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/archive", label: "Archive" },
  { href: "/impact", label: "Our Impact" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" pathname={pathname}>
            Home
          </NavLink>

          <NavLink href="/joinus" pathname={pathname}>
            Join as Volunteer
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted",
                isActive(pathname, "/programs") && "text-primary"
              )}
            >
              Programs
              <ChevronDownIcon className="size-4 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>All programs</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/programs" />}>
                <span className="w-full font-medium">All Programs</span>
              </DropdownMenuItem>
              {programs.map((program) => (
                <DropdownMenuItem
                  key={program.slug}
                  render={<Link href={`/programs/${program.slug}`} />}
                >
                  <span className="flex w-full items-center gap-2">
                    <program.icon className="size-4 text-primary" />
                    {program.title}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" render={<Link href="/signin" />}>
            Sign In
          </Button>
          <Button render={<Link href="/signup" />}>Sign Up</Button>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
            aria-label="Open menu"
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription>
                Social development & volunteer platform
              </SheetDescription>
            </SheetHeader>
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-1 px-4 pb-8"
            >
              <MobileLink href="/" pathname={pathname}>
                Home
              </MobileLink>
              <MobileLink href="/about" pathname={pathname}>
                About Us
              </MobileLink>

              <p className="mt-2 mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Programs
              </p>
              <MobileLink href="/programs" pathname={pathname}>
                All Programs
              </MobileLink>
              {programs.map((program) => (
                <MobileLink
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  pathname={pathname}
                  className="pl-9"
                >
                  <program.icon className="mr-2 inline size-4 text-primary" />
                  {program.title}
                </MobileLink>
              ))}

              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" render={<Link href="/signin" />}>
                  Sign In
                </Button>
                <Button render={<Link href="/signup" />}>Sign Up</Button>
                <Button variant="outline" render={<Link href="/joinus" />}>
                  Join Us
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      className={cn(
        "flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted",
        active ? "text-primary" : "text-foreground/80"
      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  pathname,
  className,
  children,
}: {
  href: string;
  pathname: string;
  className?: string;
  children: React.ReactNode;
}) {
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted",
        active ? "bg-secondary text-primary" : "text-foreground/80",
        className
      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
