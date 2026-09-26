export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2a2f39] border-t-[#b6ff00]" />

        <p className="mt-4 text-sm font-medium text-[#9298a4]">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}