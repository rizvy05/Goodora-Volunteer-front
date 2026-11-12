
"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Users,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  ImagePlus,
  Loader2,
  RefreshCw,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const programTypes = [
  "Blood Donation",
  "Clothing Donation",
  "Community Cleaning",
  "Irrigation Support",
  "Education & Teaching",
  "Elderly Care",
  "Food Distribution",
  "Tree Plantation",
  "Other",
];

type ProgramStatus = "Upcoming" | "Ongoing" | "Completed";

interface VolunteerProgram {
  _id: string;
  title: string;
  type: string;
  destination: string;
  date: string;
  volunteersNeeded: number;
  description: string;
  coverImage: string;
  status: ProgramStatus;
  createdAt?: string;
}

interface ProgramForm {
  title: string;
  type: string;
  destination: string;
  date: string;
  volunteersNeeded: string;
  description: string;
  coverImage: string;
  status: ProgramStatus;
}

const initialForm: ProgramForm = {
  title: "",
  type: "",
  destination: "",
  date: "",
  volunteersNeeded: "",
  description: "",
  coverImage: "",
  status: "Upcoming",
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the image."));

    reader.readAsDataURL(file);
  });
}

export default function VolunteerProgramsAdminPage() {
  const [programs, setPrograms] = useState<VolunteerProgram[]>([]);
  const [form, setForm] = useState<ProgramForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");

  const isEditing = editingId !== null;

  const loadPrograms = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/programs`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not load programs.");
      }

      setPrograms(Array.isArray(result) ? result : result.data || []);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while loading programs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPrograms();
  }, []);

  const updateField = (
    field: keyof ProgramForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("The cover image must be smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      updateField("coverImage", base64);
      setImageName(file.name);
    } catch {
      alert("Could not upload this image. Please try again.");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setImageName("");

    const imageInput = document.getElementById(
      "coverImage"
    ) as HTMLInputElement | null;

    if (imageInput) imageInput.value = "";
  };

  const handleEdit = (program: VolunteerProgram) => {
    setEditingId(program._id);

    setForm({
      title: program.title || "",
      type: program.type || "",
      destination: program.destination || "",
      date: program.date ? program.date.slice(0, 10) : "",
      volunteersNeeded: String(program.volunteersNeeded ?? ""),
      description: program.description || "",
      coverImage: program.coverImage || "",
      status: program.status || "Upcoming",
    });

    setImageName(program.coverImage ? "Current cover image" : "");

    document
      .getElementById("program-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.coverImage) {
      alert("Please upload a cover image for this program.");
      return;
    }

    setSaving(true);

    const programData = {
      ...form,
      volunteersNeeded: Number(form.volunteersNeeded),
    };

    try {
      const response = await fetch(
        isEditing
          ? `${API_URL}/programs/${editingId}`
          : `${API_URL}/programs`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not save the volunteer program."
        );
      }

      alert(
        isEditing
          ? "Program updated successfully!"
          : "Program created successfully!"
      );

      resetForm();
      await loadPrograms();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this program? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      const response = await fetch(`${API_URL}/programs/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not delete the program.");
      }

      setPrograms((previous) =>
        previous.filter((program) => program._id !== id)
      );

      if (editingId === id) resetForm();

      alert("Program deleted successfully.");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Could not delete this program."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPrograms = programs.filter((program) => {
    const searchText = search.toLowerCase();

    return (
      program.title.toLowerCase().includes(searchText) ||
      program.type.toLowerCase().includes(searchText) ||
      program.destination.toLowerCase().includes(searchText) ||
      program.status.toLowerCase().includes(searchText)
    );
  });

  const statusStyle: Record<ProgramStatus, string> = {
    Upcoming: "bg-blue-50 text-blue-700",
    Ongoing: "bg-green-50 text-green-700",
    Completed: "bg-gray-100 text-gray-600",
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* Page heading */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
            Goodora Administration
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Volunteer Programs
              </h1>
              <p className="mt-2 text-gray-500">
                Create and manage volunteer opportunities for your community.
              </p>
            </div>

            <button
              type="button"
              onClick={loadPrograms}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Programs</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {programs.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Upcoming Programs</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">
              {programs.filter((p) => p.status === "Upcoming").length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Ongoing Programs</p>
            <p className="mt-2 text-3xl font-bold text-green-700">
              {programs.filter((p) => p.status === "Ongoing").length}
            </p>
          </div>
        </div>

        {/* Add / Edit form */}
        <section
          id="program-form"
          className="scroll-mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? "Edit Program" : "Add a New Program"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter the details of the volunteer opportunity.
              </p>
            </div>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100"
              >
                <X size={16} />
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className={labelClass}>Program Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. Community Tree Plantation"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Program Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => updateField("type", e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select program type</option>
                  {programTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Destination *</label>
                <input
                  value={form.destination}
                  onChange={(e) =>
                    updateField("destination", e.target.value)
                  }
                  placeholder="e.g. Madhupur, Tangail"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Program Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Volunteers Needed *</label>
                <input
                  type="number"
                  min="1"
                  value={form.volunteersNeeded}
                  onChange={(e) =>
                    updateField("volunteersNeeded", e.target.value)
                  }
                  placeholder="e.g. 25"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Program Status *</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField("status", e.target.value as ProgramStatus)
                  }
                  className={inputClass}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Program Description *</label>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  placeholder="Describe the purpose, activities, and impact of this program..."
                  className={inputClass}
                  required
                />
              </div>

              {/* Cover image */}
              <div className="md:col-span-2">
                <label className={labelClass}>Program Cover Image *</label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {form.coverImage ? (
                    <div className="relative h-36 w-full overflow-hidden rounded-xl border border-gray-200 sm:w-56">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.coverImage}
                        alt="Program cover preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          updateField("coverImage", "");
                          setImageName("");
                        }}
                        className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white hover:bg-black"
                        aria-label="Remove cover image"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-36 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400 sm:w-56">
                      <div className="text-center">
                        <ImagePlus className="mx-auto mb-2" size={28} />
                        <span className="text-xs">Image preview</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="coverImage"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-green-500 hover:bg-green-50"
                    >
                      <ImagePlus size={17} />
                      {form.coverImage ? "Change Image" : "Upload Image"}
                    </label>

                    <input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                      {imageName || "JPG, PNG or WebP. Maximum 2 MB."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Plus size={17} />
                )}
                {saving
                  ? "Saving..."
                  : isEditing
                    ? "Update Program"
                    : "Create Program"}
              </button>
            </div>
          </form>
        </section>

        {/* Programs list */}
        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Manage Programs
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                All volunteer opportunities created so far.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search programs..."
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center">
              <Loader2 className="mx-auto animate-spin text-green-700" size={30} />
              <p className="mt-3 text-sm text-gray-500">
                Loading programs...
              </p>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
              <Users className="mx-auto text-gray-300" size={38} />
              <h3 className="mt-4 font-semibold text-gray-800">
                {search ? "No matching programs" : "No programs added yet"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {search
                  ? "Try searching with another title, type, or destination."
                  : "Create your first volunteer program using the form above."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPrograms.map((program) => (
                <article
                  key={program._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-48 bg-gray-100">
                    {program.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={program.coverImage}
                        alt={program.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        <ImagePlus size={32} />
                      </div>
                    )}

                    <span
                      className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyle[program.status] || statusStyle.Upcoming
                      }`}
                    >
                      {program.status}
                    </span>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                        {program.type}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-gray-900">
                        {program.title}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500">
                      <p className="flex items-center gap-2">
                        <MapPin size={16} className="shrink-0" />
                        {program.destination}
                      </p>

                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} className="shrink-0" />
                        {program.date
                          ? new Date(`${program.date.slice(0, 10)}T00:00:00`).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Date not set"}
                      </p>

                      <p className="flex items-center gap-2">
                        <Users size={16} className="shrink-0" />
                        {program.volunteersNeeded} volunteers needed
                      </p>
                    </div>

                    <p className="line-clamp-3 text-sm leading-6 text-gray-500">
                      {program.description}
                    </p>

                    <div className="flex gap-2 border-t border-gray-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(program)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-green-500 hover:bg-green-50 hover:text-green-700"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(program._id)}
                        disabled={deletingId === program._id}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === program._id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
