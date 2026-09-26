export default function Home() {
  return (
    <main className="min-h-screen bg-[#1d1d1d] p-4 text-white sm:p-6">
      <div className="mx-auto min-h-[120vh] max-w-350 bg-[#090a0d]">
        <section className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b6ff00]">
              Workout Library
            </p>

            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
              FitLog
            </h1>

            <p className="mt-4 text-sm text-gray-400 sm:text-base">
              Train with intent. Log every set.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}