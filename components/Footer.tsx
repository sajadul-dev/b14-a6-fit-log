export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-40 border-t border-[#1f232c] bg-[#090a0d]">
      <div className="flex min-h-16 flex-col items-start justify-center gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-7">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog"
            className="h-5 w-5 object-contain"
          />

          <span className="text-xs font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-[10px] leading-4 text-[#737a86] sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}