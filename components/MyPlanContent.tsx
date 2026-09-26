"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Workout } from "@/types/Workout";
import {
  getDoneIds,
  getPlan,
  getSaved,
  saveDoneIds,
  savePlan,
  saveSaved,
  STORAGE_UPDATE_EVENT,
} from "@/lib/storage";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const toastStyle = {
  background: "#111318",
  color: "#f5f7fa",
  border: "1px solid #2a2f39",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "600",
};

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 22c4 0 7-2.7 7-6.7 0-3.2-1.8-5.4-4.6-8.1.1 2.4-1 3.8-2.2 4.6.2-2.8-1-5.7-3.6-7.8C8.8 8.7 5 11.2 5 15.3 5 19.3 8 22 12 22Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-[#2b303a] px-6 text-center">
      <h3 className="font-display text-2xl font-semibold uppercase text-white">
        Nothing here yet
      </h3>

      <p className="mt-2 max-w-md text-sm text-[#858b97]">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#b6ff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#c4ff33]"
      >
        Go to workouts
      </Link>
    </div>
  );
}

export default function MyPlanContent() {
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncStorage = () => {
      setPlan(getPlan());
      setSaved(getSaved());
      setDoneIds(getDoneIds());
      setLoading(false);
    };

    syncStorage();

    window.addEventListener(STORAGE_UPDATE_EVENT, syncStorage);
    window.addEventListener("storage", syncStorage);

    return () => {
      window.removeEventListener(STORAGE_UPDATE_EVENT, syncStorage);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const currentList = activeTab === "plan" ? plan : saved;

  /* 
   * IMPORTANT:
   * Metrics now use the currently selected tab's data.
   * Plan tab   -> plan totals
   * Saved tab  -> saved totals
   */
  const exercisesCount = currentList.length;

  const minutes = useMemo(
    () =>
      currentList.reduce(
        (total, workout) => total + workout.duration,
        0,
      ),
    [currentList],
  );

  const calories = useMemo(
    () =>
      currentList.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0,
      ),
    [currentList],
  );

  const filteredAndSortedList = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = currentList.filter((workout) => {
      if (!query) {
        return true;
      }

      const matchesName = workout.name.toLowerCase().includes(query);

      const matchesTag = workout.muscleGroups.some((group) =>
        group.toLowerCase().includes(query),
      );

      return matchesName || matchesTag;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return a.duration - b.duration;
    });
  }, [currentList, search, sortBy]);

  const handleRemove = (workout: Workout) => {
    if (activeTab === "plan") {
      const updatedPlan = plan.filter(
        (item) => item.id !== workout.id,
      );

      savePlan(updatedPlan);
      setPlan(updatedPlan);

      toast.success("Workout removed", {
        style: toastStyle,
      });

      return;
    }

    const updatedSaved = saved.filter(
      (item) => item.id !== workout.id,
    );

    saveSaved(updatedSaved);
    setSaved(updatedSaved);

    toast.success("Workout removed", {
      style: toastStyle,
    });
  };

  const handleMarkDone = (workout: Workout) => {
    if (doneIds.includes(workout.id)) {
      toast("Already marked as done", {
        style: toastStyle,
      });

      return;
    }

    const updatedDoneIds = [...doneIds, workout.id];

    saveDoneIds(updatedDoneIds);
    setDoneIds(updatedDoneIds);

    toast.success("Workout marked as done", {
      style: toastStyle,
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen px-4 pb-16 pt-10 sm:px-5 lg:px-6">
        <div className="flex min-h-72 items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2a2f39] border-t-[#b6ff00]" />

            <p className="mt-4 text-sm font-medium text-[#9298a4]">
              Loading workouts...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-16 pt-8 sm:px-5 lg:px-6 lg:pb-20">
      {/* Heading */}
      <section>
        <h1 className="font-display text-4xl font-semibold uppercase leading-none text-white sm:text-5xl">
          My Plan
        </h1>

        <p className="mt-2 text-sm text-[#858b97]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      {/* Metrics */}
      <section className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-[#252a34] bg-[#151820] sm:grid-cols-3">
        <div className="border-b border-[#252a34] px-5 py-5 sm:border-b-0 sm:border-r">
          <p className="text-xs text-[#858b97]">Exercises</p>

          <p className="mt-1 font-display text-4xl font-semibold leading-none text-[#b6ff00]">
            {exercisesCount}
          </p>
        </div>

        <div className="border-b border-[#252a34] px-5 py-5 sm:border-b-0 sm:border-r">
          <p className="text-xs text-[#858b97]">Minutes</p>

          <p className="mt-1 font-display text-4xl font-semibold leading-none text-white">
            {minutes}
          </p>
        </div>

        <div className="px-5 py-5">
          <p className="text-xs text-[#858b97]">Calories</p>

          <p className="mt-1 font-display text-4xl font-semibold leading-none text-white">
            {calories}
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <div className="flex w-fit rounded-lg border border-[#252a34] bg-[#111318] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`cursor-pointer rounded-md px-4 py-2 text-xs font-semibold transition ${
                activeTab === "plan"
                  ? "bg-[#20252d] text-white"
                  : "text-[#858b97] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`cursor-pointer rounded-md px-4 py-2 text-xs font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#20252d] text-white"
                  : "text-[#858b97] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <label className="w-full sm:w-64">
            <span className="sr-only">Search workouts</span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or tag"
              className="h-10 w-full rounded-lg border border-[#252a34] bg-[#111318] px-3 text-sm text-white outline-none transition placeholder:text-[#656b77] focus:border-[#b6ff00]"
            />
          </label>
        </div>

        <label className="flex items-center gap-2 self-end text-xs text-[#858b97] lg:self-auto">
          <span>Sort By</span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="h-10 cursor-pointer rounded-lg border border-[#252a34] bg-[#111318] px-3 text-xs text-white outline-none focus:border-[#b6ff00]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </section>

      {/* List */}
      <section className="mt-4">
        {filteredAndSortedList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {filteredAndSortedList.map((workout) => {
              const isDone = doneIds.includes(workout.id);

              return (
                <article
                  key={workout.id}
                  className={`flex flex-col gap-4 rounded-xl border border-[#252a34] bg-[#111318] p-3 transition sm:p-4 lg:flex-row lg:items-center ${
                    isDone ? "opacity-70" : ""
                  }`}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[#0e1014] sm:h-22 sm:w-32">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-display text-xl font-semibold uppercase leading-none text-white">
                        {workout.name}
                      </h2>

                      <p className="mt-1 truncate text-xs text-[#858b97]">
                        {workout.equipment}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#8e95a1]">
                        <span className="flex items-center gap-1.5">
                          <ClockIcon />
                          {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1.5">
                          <FlameIcon />
                          {workout.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1.5 text-[#b6ff00]">
                          <StarIcon />
                          {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#353b47] px-4 py-2 text-xs font-medium text-[#d7dbe2] transition hover:border-[#8a919d] hover:text-white"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        type="button"
                        onClick={() => handleMarkDone(workout)}
                        disabled={isDone}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
                          isDone
                            ? "cursor-not-allowed bg-[#30343c] text-[#8b919d]"
                            : "cursor-pointer bg-[#b6ff00] text-black hover:bg-[#c4ff33]"
                        }`}
                      >
                        <CheckIcon />
                        {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemove(workout)}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#747b87] transition hover:bg-[#1a1e25] hover:text-white"
                      aria-label={`Remove ${workout.name}`}
                    >
                      ×
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}