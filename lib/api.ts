import { Workout } from "@/types/Workout";

const ALL_WORKOUTS_API =
  "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(ALL_WORKOUTS_API, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts.");
  }

  const data: Workout[] = await response.json();

  return data;
}