import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  GraduationCap,
  HeartHandshake,
  Shirt,
  Trash2,
  TreePine,
  Utensils,
  Waves,
} from "lucide-react";

export type Program = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Image path from public/option — absent for programs without an asset. */
  image?: string;
  icon: LucideIcon;
  activities: string[];
  // PLACEHOLDER figures — replace with real data when the backend is available.
  volunteers: string;
  hours: string;
};

export const programs: Program[] = [
  {
    slug: "blood-donation",
    title: "Blood Donation",
    tagline: "Give blood, save lives",
    description:
      "Organize and volunteer at regular blood donation camps in partnership with local hospitals, helping patients access safe blood when it matters most.",
    image:
      "/option/Blood%20donation%20Customizable%20Isometric%20Illustrations%20_%20Amico%20Style.jpeg",
    icon: Droplets,
    activities: [
      "Community donation camps",
      "Donor registration and follow-up",
      "Awareness drives",
      "Camp logistics support",
    ],
    volunteers: "240+",
    hours: "3,500+",
  },
  {
    slug: "clothing-donation",
    title: "Clothing Donation",
    tagline: "Warm clothes for every winter",
    description:
      "Collect, sort, and distribute donated clothing to families in need, with seasonal winter drives across underserved neighborhoods.",
    image: "/option/Clothing%20Donation.jpeg",
    icon: Shirt,
    activities: [
      "Donation drop-off points",
      "Sorting and quality checks",
      "Seasonal distribution drives",
      "Partner shelter deliveries",
    ],
    volunteers: "180+",
    hours: "2,200+",
  },
  {
    slug: "community-cleaning",
    title: "Community Cleaning",
    tagline: "Cleaner streets, stronger community",
    description:
      "Bring neighbors together for regular cleanup campaigns in parks, streets, and public spaces to build healthier, more livable areas.",
    image: "/option/Community%20Cleaning.jpeg",
    icon: Trash2,
    activities: [
      "Neighborhood cleanup days",
      "Waste segregation awareness",
      "Park and public space upkeep",
      "Recycling drives",
    ],
    volunteers: "310+",
    hours: "4,800+",
  },
  {
    slug: "irrigation-support",
    title: "Irrigation Support",
    tagline: "Water where it matters",
    description:
      "Help farming communities build and maintain low-cost irrigation channels so crops thrive through unpredictable seasons.",
    icon: Waves,
    activities: [
      "Irrigation channel maintenance",
      "Water conservation training",
      "Field mapping with farmers",
      "Rainwater harvesting setups",
    ],
    volunteers: "90+",
    hours: "1,400+",
  },
  {
    slug: "education-teaching",
    title: "Education & Teaching",
    tagline: "Every child deserves a classroom",
    description:
      "Tutor school children, run homework clubs, and mentor first-generation learners with reading, math, and digital skills support.",
    image: "/option/Education%20%26%20Teaching.jpeg",
    icon: GraduationCap,
    activities: [
      "After-school tutoring",
      "Reading and literacy clubs",
      "Digital skills workshops",
      "Career mentoring",
    ],
    volunteers: "270+",
    hours: "5,100+",
  },
  {
    slug: "elderly-care",
    title: "Elderly Care",
    tagline: "Companionship for our elders",
    description:
      "Spend time with seniors in care homes and their own houses — companionship, errands, health check reminders, and companionship visits.",
    image: "/option/Elderly%20Care.jpeg",
    icon: HeartHandshake,
    activities: [
      "Companionship visits",
      "Grocery and errand help",
      "Health check reminders",
      "Story and activity sessions",
    ],
    volunteers: "150+",
    hours: "2,700+",
  },
  {
    slug: "food-distribution",
    title: "Food Distribution",
    tagline: "No one eats alone",
    description:
      "Coordinate food banks and community kitchens to distribute nutritious meals and grocery packs to families facing food insecurity.",
    image: "/option/Food%20Distribution.jpeg",
    icon: Utensils,
    activities: [
      "Community kitchen shifts",
      "Grocery pack assembly",
      "Food bank pickups",
      "Distribution day logistics",
    ],
    volunteers: "330+",
    hours: "5,600+",
  },
  {
    slug: "tree-plantation",
    title: "Tree Plantation",
    tagline: "Plant today, breathe tomorrow",
    description:
      "Grow greener neighborhoods through tree plantation drives, sapling care programs, and urban green space restoration projects.",
    image: "/option/planting%20tree%20illustration.jpeg",
    icon: TreePine,
    activities: [
      "Community plantation drives",
      "Sapling nursery care",
      "Tree adoption programs",
      "Green space restoration",
    ],
    volunteers: "290+",
    hours: "3,900+",
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}

/** PLACEHOLDER data — illustrative figures only, not real organizational statistics. */
export const impactByProgram = programs.map((p) => ({
  slug: p.slug,
  title: p.title,
  icon: p.icon,
  volunteers: p.volunteers,
  hours: p.hours,
}));
