import type { Workout } from "@/types/Workout";

const ALL_WORKOUTS_API =
  "https://api.abcz.workers.dev/api/fitlog";

const WORKOUT_DETAILS_API =
  "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(ALL_WORKOUTS_API, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts.");
  }

  const data: unknown = await response.json();

  return Array.isArray(data) ? (data as Workout[]) : [];
}

export async function getWorkoutById(
  id: string,
): Promise<Workout | null> {
  const response = await fetch(`${WORKOUT_DETAILS_API}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();

  if (!data || typeof data !== "object" || !("id" in data)) {
    return null;
  }

  return data as Workout;
}