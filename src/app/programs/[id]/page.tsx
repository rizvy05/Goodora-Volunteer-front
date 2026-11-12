
import type { Metadata } from "next";
import SectionHeading from "@/components/goodora/section-heading";
import { CalendarDays, MapPin, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Browse all Goodora volunteer programs — blood donation, education, environment, elderly care, and more.",
};

interface VolunteerProgram {
  _id: string;
  title: string;
  type: string;
  destination: string;
  date: string;
  volunteersNeeded: number;
  description: string;
  coverImage: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getPrograms(): Promise<VolunteerProgram[]> {
  try {
    const response = await fetch(`${API_URL}/programs`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch programs");
    }

    const result = await response.json();

    return Array.isArray(result) ? result : result.data || [];
  } catch (error) {
    console.error("Error loading programs:", error);
    return [];
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeading
        eyebrow="Our Programs"
        title="Volunteer programs across our communities"
        description="Every program is run with local partners and open to new volunteers. Pick a cause and see how you can help."
      />

      {programs.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            No programs available yet
          </h3>
          <p className="mt-2 text-gray-500">
            New volunteer opportunities will appear here soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program._id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-52 bg-gray-100">
                {program.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={program.coverImage}
                    alt={program.title}
                    className="h-full w-full object-cover"
                  />
                )}

                <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
                  {program.status}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                    {program.type}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-gray-900">
                    {program.title}
                  </h2>
                </div>

                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {program.destination}
                  </p>

                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {program.date
                      ? new Date(
                          `${program.date.slice(0, 10)}T00:00:00`
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Date not set"}
                  </p>

                  <p className="flex items-center gap-2">
                    <Users size={16} />
                    {program.volunteersNeeded} volunteers needed
                  </p>
                </div>

                <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                  {program.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}


// import type { Metadata } from "next";
// import { programs } from "@/lib/data/programs";
// import ProgramCard from "@/components/goodora/program-card";
// import SectionHeading from "@/components/goodora/section-heading";

// export const metadata: Metadata = {
//   title: "Programs",
//   description:
//     "Browse all Goodora volunteer programs — blood donation, education, environment, elderly care, and more.",
// };

// export default function ProgramsPage() {
//   return (
//     <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
//       <SectionHeading
//         eyebrow="Our Programs"
//         title="Volunteer programs across eight community causes"
//         description="Every program is run with local partners and open to new volunteers. Pick a cause and see how you can help."
//       />

//       <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//         {programs.map((program) => (
//           <ProgramCard key={program.slug} program={program} />
//         ))}
//       </div>
//     </div>
//   );
// }
