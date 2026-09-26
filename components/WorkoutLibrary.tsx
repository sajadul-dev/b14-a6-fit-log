import { Workout } from "@/types/Workout";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary({
  workouts,
}: {
  workouts: Workout[];
}) {
  return (
    <section
      id="library"
      className="px-4 pb-16 pt-2 sm:px-5 lg:px-6 lg:pb-20"
    >
      <div className="mb-7">
        <h2 className="font-display text-3xl font-semibold uppercase leading-none text-white sm:text-4xl">
          The Library
        </h2>

        <p className="mt-2 text-sm text-[#858b97]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}