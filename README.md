# Goodora — Social Development & Volunteer Platform

Goodora connects volunteers with meaningful community development initiatives:
users can discover programs, register as volunteers, participate in activities,
and explore the impact of previous events.

This repository contains the frontend web application.

## Tech Stack
- [Next.js 16]
- [React 19]
- [TypeScript]
- [Tailwind CSS v4]
- [shadcn/ui]
- [lucide-react]

Volunteer Programs
Eight program areas, each with its own detail page:
Blood Donation · Clothing Donation · Community Cleaning · Irrigation Support ·
Education & Teaching · Elderly Care · Food Distribution · Tree Plantation
Important Notes
- All statistics, events, and testimonials are illustrative placeholders.
There is no backend yet — the registration/sign-in forms log or acknowledge
submissions locally and clearly label themselves as demos. Replace
src/lib/data/* with real data once the API is available.
- Next.js engine features worth knowing before contributing:
cacheComponents is enabled (dynamic data needs <Suspense> + explicit
caching, and new Date() cannot be used during prerendering), and the
React Compiler manages memoization (avoid manual useMemo/useCallback
unless necessary).
