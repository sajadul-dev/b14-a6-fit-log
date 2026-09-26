import type { Workout } from "@/types/Workout";

export const PLAN_STORAGE_KEY = "fitlog-plan";
export const SAVED_STORAGE_KEY = "fitlog-saved";
export const DONE_STORAGE_KEY = "fitlog-done";
export const STORAGE_UPDATE_EVENT = "fitlog-storage-update";

function readWorkouts(key: string): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(key);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as Workout[]) : [];
  } catch {
    return [];
  }
}

function writeWorkouts(key: string, workouts: Workout[]) {
  window.localStorage.setItem(key, JSON.stringify(workouts));
  window.dispatchEvent(new Event(STORAGE_UPDATE_EVENT));
}

function readDoneIds(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(DONE_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed.filter((id): id is number => typeof id === "number")
      : [];
  } catch {
    return [];
  }
}

export function getPlan(): Workout[] {
  return readWorkouts(PLAN_STORAGE_KEY);
}

export function getSaved(): Workout[] {
  return readWorkouts(SAVED_STORAGE_KEY);
}

export function savePlan(workouts: Workout[]) {
  writeWorkouts(PLAN_STORAGE_KEY, workouts);
}

export function saveSaved(workouts: Workout[]) {
  writeWorkouts(SAVED_STORAGE_KEY, workouts);
}

export function getDoneIds(): number[] {
  return readDoneIds();
}

export function saveDoneIds(ids: number[]) {
  window.localStorage.setItem(DONE_STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(STORAGE_UPDATE_EVENT));
}