"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 py-16 sm:px-6">
      <section className="w-full max-w-xl rounded-xl border border-[#252a34] bg-[#111318] px-6 py-10 text-center sm:px-10 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b6ff00]">
          FitLog
        </p>

        <h1 className="font-display mt-3 text-4xl font-semibold uppercase leading-none text-white sm:text-5xl">
          Something went wrong
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#858b97]">
          We couldn&apos;t load this page right now. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-md bg-[#b6ff00] px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#c4ff33]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}