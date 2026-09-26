import Link from "next/link";
import { Workout } from "@/types/Workout";

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
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
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
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
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

export default function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#252a34] bg-[#111318] transition duration-200 hover:-translate-y-1 hover:border-[#3a414d] hover:bg-[#14171d]"
    >
      <div className="aspect-4/3 overflow-hidden bg-[#0e1014]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#b6ff00] px-2.5 py-1 text-xs font-bold uppercase text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-semibold uppercase leading-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-1 truncate text-sm text-[#858b97]">
          {workout.equipment}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-[#222731] pt-3 text-xs text-[#8e95a1]">
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
    </Link>
  );
}