import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 pb-8 pt-8 sm:px-5 lg:px-6 lg:pb-10 lg:pt-10">
      <div className="grid min-h-104 grid-cols-1 items-center overflow-hidden rounded-xl border border-[#252a34] bg-[#111318] lg:grid-cols-3">
        {/* Left Content */}
        <div className="px-6 py-10 sm:px-8 lg:col-span-2 lg:px-10 lg:py-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#b6ff00]">
            Workout Library
          </p>

          <h1 className="font-display max-w-xl text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl">
            Train with intent. Log every set.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-5 text-[#969ca8] sm:text-[15px] sm:leading-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-[#b6ff00] px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide text-black transition hover:bg-[#c4ff33] focus:outline-none focus:ring-2 focus:ring-[#b6ff00] focus:ring-offset-2 focus:ring-offset-[#111318]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex min-h-80 items-center justify-center px-5 py-8 sm:min-h-88 lg:col-span-1 lg:min-h-104 lg:justify-center lg:px-8 lg:py-8">
  <img
    src="/banner.png"
    alt="Workout illustration"
    className="h-64 w-auto object-contain sm:h-72 lg:h-80"
  />
</div>
      </div>
    </section>
  );
}