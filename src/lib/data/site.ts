import {
  CalendarCheck,
  Globe2,
  HandHeart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/* ============================================================================
 * PLACEHOLDER DATA
 * All statistics, events and testimonials below are illustrative mock content.
 * Do NOT present them as real organizational data. Replace with backend data.
 * ========================================================================== */

export type WhyChoose = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const whyChoose: WhyChoose[] = [
  {
    icon: ShieldCheck,
    title: "Verified, impactful programs",
    description:
      "Every program is vetted and tracked so your time goes to work that genuinely helps the community.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible scheduling",
    description:
      "Join one-off events or commit to recurring shifts — volunteering that fits around your life.",
  },
  {
    icon: HandHeart,
    title: "Support every step of the way",
    description:
      "Orientation, team leads, and clear on-ground guidance, whether it's your first event or your fiftieth.",
  },
  {
    icon: Globe2,
    title: "Community-first approach",
    description:
      "We work with local partners and residents, so every initiative is driven by the community's own needs.",
  },
];

export type ImpactStat = {
  label: string;
  value: string;
  suffix?: string;
};

export const impactStats: ImpactStat[] = [
  { label: "Active volunteers", value: "1,200", suffix: "+" },
  { label: "Community programs", value: "8" },
  { label: "Volunteer hours contributed", value: "24,000", suffix: "+" },
  { label: "Neighborhoods reached", value: "35", suffix: "+" },
];

export type HowItWorksStep = {
  title: string;
  description: string;
};

export const howItWorks: HowItWorksStep[] = [
  {
    title: "Create your account",
    description:
      "Sign up in minutes and tell us the causes you care about most.",
  },
  {
    title: "Find a program",
    description:
      "Browse programs and upcoming events, and pick one that matches your time and interests.",
  },
  {
    title: "Register for an activity",
    description:
      "Reserve your spot on an event — you'll get an orientation and details by email.",
  },
  {
    title: "Volunteer and track impact",
    description:
      "Show up, contribute, and follow the results of your effort in your volunteer dashboard.",
  },
];

export type VolunteerEvent = {
  id: string;
  title: string;
  programSlug: string;
  programTitle: string;
  date: string;
  time: string;
  location: string;
  volunteersNeeded: number;
};

export const upcomingEvents: VolunteerEvent[] = [
  {
    id: "EVT-001",
    title: "Weekend community kitchen",
    programSlug: "food-distribution",
    programTitle: "Food Distribution",
    date: "Saturday, Nov 14",
    time: "9:00 AM – 1:00 PM",
    location: "Riverside Community Center",
    volunteersNeeded: 20,
  },
  {
    id: "EVT-002",
    title: "Old-town plaza cleanup",
    programSlug: "community-cleaning",
    programTitle: "Community Cleaning",
    date: "Sunday, Nov 15",
    time: "8:00 AM – 11:00 AM",
    location: "Old Town Market Square",
    volunteersNeeded: 35,
  },
  {
    id: "EVT-003",
    title: "Blood donation camp",
    programSlug: "blood-donation",
    programTitle: "Blood Donation",
    date: "Wednesday, Nov 18",
    time: "10:00 AM – 4:00 PM",
    location: "Central Hospital Card",
    volunteersNeeded: 15,
  },
  {
    id: "EVT-004",
    title: "Winter clothing drive launch",
    programSlug: "clothing-donation",
    programTitle: "Clothing Donation",
    date: "Saturday, Nov 21",
    time: "2:00 PM – 6:00 PM",
    location: "Goodora Warehouse, Green District",
    volunteersNeeded: 25,
  },
  {
    id: "EVT-005",
    title: "Tree adoption walk & planting",
    programSlug: "tree-plantation",
    programTitle: "Tree Plantation",
    date: "Sunday, Nov 29",
    time: "7:00 AM – 10:00 AM",
    location: "Greenline Park",
    volunteersNeeded: 40,
  },
  {
    id: "EVT-006",
    title: "Homework club opening session",
    programSlug: "education-teaching",
    programTitle: "Education & Teaching",
    date: "Monday, Dec 1",
    time: "4:00 PM – 6:00 PM",
    location: "Bright Minds Learning Hub",
    volunteersNeeded: 10,
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I joined one cleanup day to try it out — six months later I run the monthly shifts for my neighborhood. It's the most rewarding few hours of my week.",
    name: "Sadia R.",
    role: "Community Cleaning volunteer — sample testimonial",
  },
  {
    quote:
      "Teaching the after-school reading club changed how I see my own city. Watching a child finish their first book is unforgettable.",
    name: "Farhan K.",
    role: "Education & Teaching volunteer — sample testimonial",
  },
  {
    quote:
      "Food distribution days are organized, warm, and genuinely welcoming. You show up, get clear instructions, and leave knowing it mattered.",
    name: "Maria T.",
    role: "Food Distribution volunteer — sample testimonial",
  },
];

export type PastEvent = {
  id: string;
  title: string;
  programSlug: string;
  programTitle: string;
  date: string;
  location: string;
  summary: string;
  volunteers: number;
};

export const pastEvents: PastEvent[] = [
  {
    id: "ARC-001",
    title: "Monsoon season food relief",
    programSlug: "food-distribution",
    programTitle: "Food Distribution",
    date: "August 2026",
    location: "Riverside Community Center",
    summary:
      "Two weekends of packaged meal distribution reaching families cut off by flooding in the riverside district.",
    volunteers: 32,
  },
  {
    id: "ARC-002",
    title: "Summer literacy sprint",
    programSlug: "education-teaching",
    programTitle: "Education & Teaching",
    date: "June–July 2026",
    location: "Bright Minds Learning Hub",
    summary:
      "A six-week reading camp where volunteer mentors helped students build summer reading habits and libraries of their own.",
    volunteers: 18,
  },
  {
    id: "ARC-003",
    title: "Greenline Park plantation drive",
    programSlug: "tree-plantation",
    programTitle: "Tree Plantation",
    date: "April 2026",
    location: "Greenline Park",
    summary:
      "Over 300 saplings planted and adopted by residents, with a watering rota that keeps every sapling alive through summer.",
    volunteers: 45,
  },
  {
    id: "ARC-004",
    title: "Elder care companionship month",
    programSlug: "elderly-care",
    programTitle: "Elderly Care",
    date: "October 2026",
    location: "Various care homes",
    summary:
      "A month-long visiting program pairing volunteers with seniors for weekly companionship, errands, and activity sessions.",
    volunteers: 21,
  },
  {
    id: "ARC-005",
    title: "Winter clothing collection & handover",
    programSlug: "clothing-donation",
    programTitle: "Clothing Donation",
    date: "December 2025",
    location: "Goodora Warehouse, Green District",
    summary:
      "Collection points across five neighborhoods supplied sorted winter clothing packs to partner shelters before the cold spell.",
    volunteers: 27,
  },
];
