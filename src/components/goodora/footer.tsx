import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { programs } from "@/lib/data/programs";
import Logo from "./logo";

/* PLACEHOLDER contact details — replace with verified information. */
const contact = {
  address: "Green District Community Center (placeholder address)",
  email: "hello@goodora.example",
  phone: "+00 000 000 000",
};

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/archive", label: "Archive" },
  { href: "/impact", label: "Our Impact" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Goodora connects volunteers with community development initiatives
            — discover programs, join activities, and grow your impact.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-heading text-sm font-semibold text-foreground">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Programs">
          <h2 className="font-heading text-sm font-semibold text-foreground">
            Programs
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {programs.slice(0, 6).map((program) => (
              <li key={program.slug}>
                <Link
                  href={`/programs/${program.slug}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {program.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-semibold text-foreground">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              {contact.address}
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="size-4 shrink-0 text-primary" />
              <a href={`mailto:${contact.email}`} className="hover:text-primary">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="size-4 shrink-0 text-primary" />
              <a href={`tel:${contact.phone}`} className="hover:text-primary">
                {contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {2026} Goodora. Placeholder project — content
            is illustrative.
          </p>
          <p>
            Built with Next.js ·{" "}
            <Link href="/signin" className="hover:text-primary">
              Volunteer sign in
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
