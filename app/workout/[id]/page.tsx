import { notFound } from "next/navigation";
import WorkoutDetailsActions from "@/components/WorkoutDetailsActions";
import { getWorkoutById } from "@/lib/api";

function RatingIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 text-[#b6ff00]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between gap-6 px-4 py-4 sm:px-5">
      <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8d94a0]">
        {label}
      </span>

      <span className="text-right text-sm text-[#e2e5ea]">
        {value}
      </span>
    </div>
  );
}

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 pb-16 pt-8 sm:px-5 lg:px-6 lg:pb-20">
      <section className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Left - Image */}
        <div className="overflow-hidden rounded-xl border border-[#252a34] bg-[#111318]">
          <div className="aspect-square">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-semibold uppercase leading-none text-white sm:text-5xl">
            {workout.name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#949aa6] sm:text-[15px]">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#b6ff00] px-3 py-1.5 text-[11px] font-bold uppercase text-black"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-[#252a34] bg-[#151820] divide-y divide-[#222731]">
            <DetailRow
              label="Equipment"
              value={workout.equipment}
            />

            <DetailRow
              label="Difficulty"
              value={workout.difficulty}
            />

            <DetailRow
              label="Sets"
              value={workout.sets}
            />

            <DetailRow
              label="Reps"
              value={workout.reps}
            />

            <DetailRow
              label="Duration"
              value={`${workout.duration} min`}
            />

            <DetailRow
              label="Calories"
              value={`${workout.caloriesBurned} kcal`}
            />

            <div className="flex items-center justify-between gap-6 px-4 py-4 sm:px-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8d94a0]">
                Rating
              </span>

              <span className="flex items-center gap-1.5 text-sm text-[#e2e5ea]">
                <RatingIcon />
                {workout.rating}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.08em] text-white">
              Instructions
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${workout.id}-instruction-${index}`}
                  className="flex items-start gap-3 text-sm leading-5 text-[#9ba1ac]"
                >
                  <span className="w-4 shrink-0 text-[#8a909b]">
                    {index + 1}.
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-7">
            <WorkoutDetailsActions workout={workout} />
          </div>
        </div>
      </section>
    </main>
  );
}