"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Workout } from "@/types/Workout";
import {
  getPlan,
  getSaved,
  savePlan,
  saveSaved,
} from "@/lib/storage";

const toastStyle = {
  background: "#111318",
  color: "#f5f7fa",
  border: "1px solid #2a2f39",
};

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M8 2.5v4M16 2.5v4M3 9h18" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z" />
    </svg>
  );
}

export default function WorkoutDetailsActions({
  workout,
}: {
  workout: Workout;
}) {
  const [planCount, setPlanCount] = useState(0);
  const [inPlan, setInPlan] = useState(false);

  useEffect(() => {
    const plan = getPlan();

    setPlanCount(plan.length);
    setInPlan(plan.some((item) => item.id === workout.id));
  }, [workout.id]);

  const handleAddToPlan = () => {
    const plan = getPlan();

    if (plan.some((item) => item.id === workout.id)) {
      toast("Already in plan", {
        style: toastStyle,
      });
      return;
    }

    if (plan.length >= 5) {
      toast("Plan is full — maximum 5 workouts", {
        style: toastStyle,
      });
      return;
    }

    const updatedPlan = [...plan, workout];

    savePlan(updatedPlan);

    setPlanCount(updatedPlan.length);
    setInPlan(true);

    toast.success("Added to today's plan", {
      style: toastStyle,
    });
  };

  const handleSave = () => {
    const saved = getSaved();

    if (saved.some((item) => item.id === workout.id)) {
      toast("Already saved", {
        style: toastStyle,
      });
      return;
    }

    saveSaved([...saved, workout]);

    toast.success("Saved for later", {
      style: toastStyle,
    });
  };

  const addDisabled = planCount >= 5 && !inPlan;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={addDisabled}
        className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[11px] font-extrabold transition ${
          addDisabled
            ? "cursor-not-allowed bg-[#30343c] text-[#7f8692]"
            : "cursor-pointer bg-[#b6ff00] text-black hover:bg-[#c4ff33]"
        }`}
      >
        <CalendarIcon />
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={handleSave}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#353b47] bg-transparent px-5 py-3 text-[11px] font-semibold text-[#d7dbe2] transition hover:border-[#8a919d] hover:text-white"
      >
        <BookmarkIcon />
        Save for later
      </button>
    </div>
  );
}