
"use client";

import { FormEvent, useState } from "react";
import {
  HeartHandshake,
  User,
  Clock,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

const programs = [
  "Blood Donation",
  "Clothing Donation",
  "Community Cleaning",
  "Irrigation Support",
  "Education & Teaching",
  "Elderly Care",
  "Food Distribution",
  "Tree Plantation",
];

const skills = [
  "Leadership",
  "Communication",
  "Event Management",
  "Teaching",
  "First Aid",
  "Photography",
  "Graphic Design",
  "Social Media Management",
  "Fundraising",
  "Technical Support",
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

export default function JoinUsPage() {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle multiple checkbox selections
  const toggleItem = (
    value: string,
    selected: string[],
    setter: (items: string[]) => void
  ) => {
    setter(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (selectedPrograms.length === 0) {
      alert("Please select at least one volunteer program.");
      return;
    }

    // Collect all form data before sending the request
    const volunteerData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      bloodGroup: formData.get("bloodGroup"),
      location: formData.get("location"),
      address: formData.get("address"),

      // Collect multiple checkbox values
      programs: formData.getAll("programs"),
      skills: formData.getAll("skills"),

      hoursPerWeek: formData.get("hoursPerWeek"),
      preferredTime: formData.get("preferredTime"),
      availability: formData.get("availability"),
      emergencyAvailability: formData.get("emergencyAvailability"),
      previousExperience: formData.get("previousExperience"),
      motivation: formData.get("motivation"),

      termsAccepted: formData.get("termsAccepted") === "yes",
      contactConsent: formData.get("contactConsent") === "yes",
    };

    setLoading(true);

    try {
      console.log("Volunteer Application:", volunteerData);

      // Send volunteer data to Express.js backend
      const res = await fetch("http://localhost:8000/add-volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volunteerData),
      });

      const data = await res.json();

      // Check API response
      if (!res.ok) {
        throw new Error(
          data.message || "Failed to submit volunteer application."
        );
      }

      console.log("Application submitted successfully:", data);

      // Show success message only after successful submission
      setSubmitted(true);

    } catch (error) {
      console.error("Submission error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // Reset form for another application
  const handleNewApplication = () => {
    setSelectedPrograms([]);
    setSelectedSkills([]);
    setSubmitted(false);
    setLoading(false);
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-muted/60">
      <div className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">

          {/* Page Heading */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Volunteer Registration
            </h2>

            <p className="mt-3 text-gray-500">
              Tell us a little about yourself and how you want to help.
            </p>
          </div>

          {/* Success Message */}
          {submitted ? (
            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
              <CheckCircle2
                size={55}
                className="mx-auto text-green-600"
              />

              <h2 className="mt-5 text-2xl font-bold">
                Thank You for Joining Goodora!
              </h2>

              <p className="mt-3 text-gray-500">
                Your volunteer application has been collected successfully.
              </p>

              <button
                type="button"
                onClick={handleNewApplication}
                className="mt-6 rounded-xl bg-green-700 px-6 py-3 text-white transition hover:bg-green-800"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >

              {/* 01. Personal Information */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <User className="text-green-700" />

                  <h3 className="text-xl font-semibold">
                    01. Personal Information
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className={labelClass}>
                      Full Name *
                    </label>

                    <input
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Email Address *
                    </label>

                    <input
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Phone Number *
                    </label>

                    <input
                      name="phone"
                      type="tel"
                      placeholder="+8801XXXXXXXXX"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Date of Birth
                    </label>

                    <input
                      name="dateOfBirth"
                      type="date"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Blood Group
                    </label>

                    <select
                      name="bloodGroup"
                      className={inputClass}
                    >
                      <option value="">Select blood group</option>

                      {[
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "AB+",
                        "AB-",
                        "O+",
                        "O-",
                      ].map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      City / District *
                    </label>

                    <input
                      name="location"
                      type="text"
                      placeholder="Your city or district"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Present Address *
                    </label>

                    <textarea
                      name="address"
                      rows={3}
                      placeholder="Enter your present address"
                      className={inputClass}
                      required
                    />
                  </div>

                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 02. Volunteer Interests */}
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <HeartHandshake className="text-green-700" />

                  <h3 className="text-xl font-semibold">
                    02. Volunteer Interests
                  </h3>
                </div>

                <p className="mb-5 text-sm text-gray-500">
                  Select the activities you are interested in.
                  You can choose multiple options.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {programs.map((program) => (
                    <label
                      key={program}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-green-500 hover:bg-green-50"
                    >
                      <input
                        type="checkbox"
                        name="programs"
                        value={program}
                        checked={selectedPrograms.includes(program)}
                        onChange={() =>
                          toggleItem(
                            program,
                            selectedPrograms,
                            setSelectedPrograms
                          )
                        }
                        className="h-4 w-4 accent-green-700"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        {program}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 03. Availability */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <Clock className="text-green-700" />

                  <h3 className="text-xl font-semibold">
                    03. Availability & Time Commitment
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className={labelClass}>
                      Hours per Week *
                    </label>

                    <select
                      name="hoursPerWeek"
                      className={inputClass}
                      required
                    >
                      <option value="">Select available hours</option>
                      <option value="1-2 hours">1–2 hours</option>
                      <option value="3-5 hours">3–5 hours</option>
                      <option value="6-10 hours">6–10 hours</option>
                      <option value="10-15 hours">10–15 hours</option>
                      <option value="15+ hours">15+ hours</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Preferred Time *
                    </label>

                    <select
                      name="preferredTime"
                      className={inputClass}
                      required
                    >
                      <option value="">Select preferred time</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Availability *
                    </label>

                    <select
                      name="availability"
                      className={inputClass}
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Both">Both</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Emergency Activities
                    </label>

                    <select
                      name="emergencyAvailability"
                      className={inputClass}
                    >
                      <option value="">Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Depending on availability">
                        Depending on availability
                      </option>
                    </select>
                  </div>

                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 04. Skills and Experience */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <GraduationCap className="text-green-700" />

                  <h3 className="text-xl font-semibold">
                    04. Skills & Experience
                  </h3>
                </div>

                <label className={labelClass}>
                  What skills can you contribute?
                </label>

                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  {skills.map((skill) => (
                    <label
                      key={skill}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        name="skills"
                        value={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={() =>
                          toggleItem(
                            skill,
                            selectedSkills,
                            setSelectedSkills
                          )
                        }
                        className="h-4 w-4 accent-green-700"
                      />

                      {skill}
                    </label>
                  ))}
                </div>

                <div className="space-y-5">

                  <div>
                    <label className={labelClass}>
                      Previous Volunteering Experience
                    </label>

                    <select
                      name="previousExperience"
                      className={inputClass}
                    >
                      <option value="">Select experience</option>
                      <option value="Yes, extensive experience">
                        Yes, extensive experience
                      </option>
                      <option value="Yes, some experience">
                        Yes, some experience
                      </option>
                      <option value="No, I am a beginner">
                        No, I am a beginner
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Why do you want to join Goodora?
                    </label>

                    <textarea
                      name="motivation"
                      rows={4}
                      placeholder="Tell us why you want to become a volunteer..."
                      className={inputClass}
                    />
                  </div>

                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 05. Confirmation */}
              <div>
                <h3 className="mb-5 text-xl font-semibold">
                  05. Confirmation
                </h3>

                <label className="flex items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    value="yes"
                    required
                    className="mt-1 h-4 w-4 accent-green-700"
                  />

                  <span>
                    I confirm that the information provided is accurate
                    and agree to the volunteer terms and conditions.
                  </span>
                </label>

                <label className="mt-4 flex items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="contactConsent"
                    value="yes"
                    required
                    className="mt-1 h-4 w-4 accent-green-700"
                  />

                  <span>
                    I agree to be contacted by Goodora regarding
                    volunteer opportunities.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || selectedPrograms.length === 0}
                className="w-full rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Submitting..."
                  : "Submit Volunteer Application →"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Your information will be handled responsibly
                and used for volunteer coordination.
              </p>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}






















// "use client";

// import { FormEvent, useState } from "react";
// import {
//   HeartHandshake,
//   User,
//   Clock,
//   GraduationCap,
//   CheckCircle2,
// } from "lucide-react";

// const programs = [
//   "Blood Donation",
//   "Clothing Donation",
//   "Community Cleaning",
//   "Irrigation Support",
//   "Education & Teaching",
//   "Elderly Care",
//   "Food Distribution",
//   "Tree Plantation",
// ];

// const skills = [
//   "Leadership",
//   "Communication",
//   "Event Management",
//   "Teaching",
//   "First Aid",
//   "Photography",
//   "Graphic Design",
//   "Social Media Management",
//   "Fundraising",
//   "Technical Support",
// ];

// const inputClass =
//   "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";

// const labelClass = "mb-2 block text-sm font-medium text-gray-700";

// export default function JoinUsPage() {
//   const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Handle multiple checkbox selections
//   const toggleItem = (
//     value: string,
//     selected: string[],
//     setter: (items: string[]) => void
//   ) => {
//     setter(
//       selected.includes(value)
//         ? selected.filter((item) => item !== value)
//         : [...selected, value]
//     );
//   };

// //   // Collect all form data
// //   const handleSubmit =async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// // const res = await fetch("http://localhost:8000/add-volunteers", {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // body: JSON.stringify(volunteerData)
// // });

// // const data = await res.json();

// // console.log(data);





// //     const form = e.currentTarget;
// //     const formData = new FormData(form);

// //     if (selectedPrograms.length === 0) {
// //       alert("Please select at least one volunteer program.");
// //       return;
// //     }

// //     const volunteerData = {
// //       fullName: formData.get("fullName"),
// //       email: formData.get("email"),
// //       phone: formData.get("phone"),
// //       dateOfBirth: formData.get("dateOfBirth"),
// //       bloodGroup: formData.get("bloodGroup"),
// //       location: formData.get("location"),
// //       address: formData.get("address"),

// //       // Collect multiple checkbox values
// //       programs: formData.getAll("programs"),
// //       skills: formData.getAll("skills"),

// //       hoursPerWeek: formData.get("hoursPerWeek"),
// //       preferredTime: formData.get("preferredTime"),
// //       availability: formData.get("availability"),
// //       emergencyAvailability: formData.get("emergencyAvailability"),
// //       previousExperience: formData.get("previousExperience"),
// //       motivation: formData.get("motivation"),

// //       termsAccepted: formData.get("termsAccepted") === "yes",
// //       contactConsent: formData.get("contactConsent") === "yes",
// //     };

// //     setLoading(true);

// //     try {
// //       // Check the complete collected data
// //       console.log("Volunteer Application:", volunteerData);

// //       // TODO: Connect this data to your Express.js API.
// //       setSubmitted(true);
// //     } catch (error) {
// //       console.error("Submission error:", error);
// //       alert("Something went wrong. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   const form = e.currentTarget;
//   const formData = new FormData(form);

//   if (selectedPrograms.length === 0) {
//     alert("Please select at least one volunteer program.");
//     return;
//   }

//   const volunteerData = {
//     fullName: formData.get("fullName"),
//     email: formData.get("email"),
//     phone: formData.get("phone"),
//     dateOfBirth: formData.get("dateOfBirth"),
//     bloodGroup: formData.get("bloodGroup"),
//     location: formData.get("location"),
//     address: formData.get("address"),

//     programs: formData.getAll("programs"),
//     skills: formData.getAll("skills"),

//     hoursPerWeek: formData.get("hoursPerWeek"),
//     preferredTime: formData.get("preferredTime"),
//     availability: formData.get("availability"),
//     emergencyAvailability: formData.get("emergencyAvailability"),
//     previousExperience: formData.get("previousExperience"),
//     motivation: formData.get("motivation"),

//     termsAccepted: formData.get("termsAccepted") === "yes",
//     contactConsent: formData.get("contactConsent") === "yes",
//   };

//   setLoading(true);

//   try {
//     const res = await fetch("http://localhost:8000/add-volunteers", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(volunteerData),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Failed to submit application");
//     }

//     console.log("Volunteer application submitted:", data);
//     setSubmitted(true);

//   } catch (error) {
//     console.error("Submission error:", error);

//     alert(
//       error instanceof Error
//         ? error.message
//         : "Something went wrong. Please try again."
//     );

//   } finally {
//     setLoading(false);
//   }
// };




//   // Reset form for another application
//   const handleNewApplication = () => {
//     setSelectedPrograms([]);
//     setSelectedSkills([]);
//     setSubmitted(false);
//     setLoading(false);
//   };

//   return (
//     <section className="min-h-[calc(100vh-4rem)] bg-muted/60">
//       <div className="px-4 py-16 sm:px-6">
//         <div className="mx-auto max-w-4xl">

//           {/* Page Heading */}
//           <div className="mb-10 text-center">
//             <h2 className="text-3xl font-bold text-gray-900">
//               Volunteer Registration
//             </h2>

//             <p className="mt-3 text-gray-500">
//               Tell us a little about yourself and how you want to help.
//             </p>
//           </div>

//           {/* Success Message */}
//           {submitted ? (
//             <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
//               <CheckCircle2
//                 size={55}
//                 className="mx-auto text-green-600"
//               />

//               <h2 className="mt-5 text-2xl font-bold">
//                 Thank You for Joining Goodora!
//               </h2>

//               <p className="mt-3 text-gray-500">
//                 Your volunteer application has been collected successfully.
//               </p>

//               <button
//                 type="button"
//                 onClick={handleNewApplication}
//                 className="mt-6 rounded-xl bg-green-700 px-6 py-3 text-white transition hover:bg-green-800"
//               >
//                 Submit Another Application
//               </button>
//             </div>
//           ) : (
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
//             >

//               {/* 01. Personal Information */}
//               <div>
//                 <div className="mb-6 flex items-center gap-3">
//                   <User className="text-green-700" />

//                   <h3 className="text-xl font-semibold">
//                     01. Personal Information
//                   </h3>
//                 </div>

//                 <div className="grid gap-5 md:grid-cols-2">

//                   <div>
//                     <label className={labelClass}>
//                       Full Name *
//                     </label>

//                     <input
//                       name="fullName"
//                       type="text"
//                       placeholder="Enter your full name"
//                       className={inputClass}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Email Address *
//                     </label>

//                     <input
//                       name="email"
//                       type="email"
//                       placeholder="example@email.com"
//                       className={inputClass}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Phone Number *
//                     </label>

//                     <input
//                       name="phone"
//                       type="tel"
//                       placeholder="+8801XXXXXXXXX"
//                       className={inputClass}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Date of Birth
//                     </label>

//                     <input
//                       name="dateOfBirth"
//                       type="date"
//                       className={inputClass}
//                     />
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Blood Group
//                     </label>

//                     <select
//                       name="bloodGroup"
//                       className={inputClass}
//                     >
//                       <option value="">Select blood group</option>

//                       {[
//                         "A+",
//                         "A-",
//                         "B+",
//                         "B-",
//                         "AB+",
//                         "AB-",
//                         "O+",
//                         "O-",
//                       ].map((group) => (
//                         <option key={group} value={group}>
//                           {group}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       City / District *
//                     </label>

//                     <input
//                       name="location"
//                       type="text"
//                       placeholder="Your city or district"
//                       className={inputClass}
//                       required
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className={labelClass}>
//                       Present Address *
//                     </label>

//                     <textarea
//                       name="address"
//                       rows={3}
//                       placeholder="Enter your present address"
//                       className={inputClass}
//                       required
//                     />
//                   </div>

//                 </div>
//               </div>

//               <hr className="border-gray-100" />

//               {/* 02. Volunteer Interests */}
//               <div>
//                 <div className="mb-5 flex items-center gap-3">
//                   <HeartHandshake className="text-green-700" />

//                   <h3 className="text-xl font-semibold">
//                     02. Volunteer Interests
//                   </h3>
//                 </div>

//                 <p className="mb-5 text-sm text-gray-500">
//                   Select the activities you are interested in.
//                   You can choose multiple options.
//                 </p>

//                 <div className="grid gap-3 sm:grid-cols-2">
//                   {programs.map((program) => (
//                     <label
//                       key={program}
//                       className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-green-500 hover:bg-green-50"
//                     >
//                       <input
//                         type="checkbox"
//                         name="programs"
//                         value={program}
//                         checked={selectedPrograms.includes(program)}
//                         onChange={() =>
//                           toggleItem(
//                             program,
//                             selectedPrograms,
//                             setSelectedPrograms
//                           )
//                         }
//                         className="h-4 w-4 accent-green-700"
//                       />

//                       <span className="text-sm font-medium text-gray-700">
//                         {program}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <hr className="border-gray-100" />

//               {/* 03. Availability */}
//               <div>
//                 <div className="mb-6 flex items-center gap-3">
//                   <Clock className="text-green-700" />

//                   <h3 className="text-xl font-semibold">
//                     03. Availability & Time Commitment
//                   </h3>
//                 </div>

//                 <div className="grid gap-5 md:grid-cols-2">

//                   <div>
//                     <label className={labelClass}>
//                       Hours per Week *
//                     </label>

//                     <select
//                       name="hoursPerWeek"
//                       className={inputClass}
//                       required
//                     >
//                       <option value="">Select available hours</option>
//                       <option value="1-2 hours">1–2 hours</option>
//                       <option value="3-5 hours">3–5 hours</option>
//                       <option value="6-10 hours">6–10 hours</option>
//                       <option value="10-15 hours">10–15 hours</option>
//                       <option value="15+ hours">15+ hours</option>
//                       <option value="Flexible">Flexible</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Preferred Time *
//                     </label>

//                     <select
//                       name="preferredTime"
//                       className={inputClass}
//                       required
//                     >
//                       <option value="">Select preferred time</option>
//                       <option value="Morning">Morning</option>
//                       <option value="Afternoon">Afternoon</option>
//                       <option value="Evening">Evening</option>
//                       <option value="Flexible">Flexible</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Availability *
//                     </label>

//                     <select
//                       name="availability"
//                       className={inputClass}
//                       required
//                     >
//                       <option value="">Select availability</option>
//                       <option value="Weekdays">Weekdays</option>
//                       <option value="Weekends">Weekends</option>
//                       <option value="Both">Both</option>
//                       <option value="Flexible">Flexible</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Emergency Activities
//                     </label>

//                     <select
//                       name="emergencyAvailability"
//                       className={inputClass}
//                     >
//                       <option value="">Select an option</option>
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                       <option value="Depending on availability">
//                         Depending on availability
//                       </option>
//                     </select>
//                   </div>

//                 </div>
//               </div>

//               <hr className="border-gray-100" />

//               {/* 04. Skills and Experience */}
//               <div>
//                 <div className="mb-6 flex items-center gap-3">
//                   <GraduationCap className="text-green-700" />

//                   <h3 className="text-xl font-semibold">
//                     04. Skills & Experience
//                   </h3>
//                 </div>

//                 <label className={labelClass}>
//                   What skills can you contribute?
//                 </label>

//                 <div className="mb-6 grid gap-3 sm:grid-cols-2">
//                   {skills.map((skill) => (
//                     <label
//                       key={skill}
//                       className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
//                     >
//                       <input
//                         type="checkbox"
//                         name="skills"
//                         value={skill}
//                         checked={selectedSkills.includes(skill)}
//                         onChange={() =>
//                           toggleItem(
//                             skill,
//                             selectedSkills,
//                             setSelectedSkills
//                           )
//                         }
//                         className="h-4 w-4 accent-green-700"
//                       />

//                       {skill}
//                     </label>
//                   ))}
//                 </div>

//                 <div className="space-y-5">

//                   <div>
//                     <label className={labelClass}>
//                       Previous Volunteering Experience
//                     </label>

//                     <select
//                       name="previousExperience"
//                       className={inputClass}
//                     >
//                       <option value="">Select experience</option>
//                       <option value="Yes, extensive experience">
//                         Yes, extensive experience
//                       </option>
//                       <option value="Yes, some experience">
//                         Yes, some experience
//                       </option>
//                       <option value="No, I am a beginner">
//                         No, I am a beginner
//                       </option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Why do you want to join Goodora?
//                     </label>

//                     <textarea
//                       name="motivation"
//                       rows={4}
//                       placeholder="Tell us why you want to become a volunteer..."
//                       className={inputClass}
//                     />
//                   </div>

//                 </div>
//               </div>

//               <hr className="border-gray-100" />

//               {/* 05. Confirmation */}
//               <div>
//                 <h3 className="mb-5 text-xl font-semibold">
//                   05. Confirmation
//                 </h3>

//                 <label className="flex items-start gap-3 text-sm text-gray-600">
//                   <input
//                     type="checkbox"
//                     name="termsAccepted"
//                     value="yes"
//                     required
//                     className="mt-1 h-4 w-4 accent-green-700"
//                   />

//                   <span>
//                     I confirm that the information provided is accurate
//                     and agree to the volunteer terms and conditions.
//                   </span>
//                 </label>

//                 <label className="mt-4 flex items-start gap-3 text-sm text-gray-600">
//                   <input
//                     type="checkbox"
//                     name="contactConsent"
//                     value="yes"
//                     required
//                     className="mt-1 h-4 w-4 accent-green-700"
//                   />

//                   <span>
//                     I agree to be contacted by Goodora regarding
//                     volunteer opportunities.
//                   </span>
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading || selectedPrograms.length === 0}
//                 className="w-full rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {loading
//                   ? "Submitting..."
//                   : "Submit Volunteer Application →"}
//               </button>

//               <p className="text-center text-xs text-gray-400">
//                 Your information will be handled responsibly
//                 and used for volunteer coordination.
//               </p>

//             </form>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// }
