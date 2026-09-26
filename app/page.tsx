import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen">
      <Hero />
      <WorkoutLibrary workouts={workouts} />
    </main>
  );
}