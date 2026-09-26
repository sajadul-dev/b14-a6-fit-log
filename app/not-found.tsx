import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 py-16 sm:px-6">
      <section className="w-full max-w-xl rounded-xl border border-[#252a34] bg-[#111318] px-6 py-10 text-center sm:px-10 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b6ff00]">
          FitLog
        </p>

        <h1 className="font-display mt-3 text-6xl font-semibold leading-none text-white sm:text-7xl">
          404
        </h1>

        <h2 className="mt-4 text-lg font-semibold text-white">
          Workout not found
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#858b97]">
          The page or workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-md bg-[#b6ff00] px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#c4ff33]"
        >
          Back to workouts
        </Link>
      </section>
    </main>
  );
}