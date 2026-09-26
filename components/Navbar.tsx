"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getPlan,
  getSaved,
  STORAGE_UPDATE_EVENT,
} from "@/lib/storage";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const isHome = pathname === "/";
  const isPlan = pathname.startsWith("/my-plan");

  useEffect(() => {
    const syncCounts = () => {
      setPlanCount(getPlan().length);
      setSavedCount(getSaved().length);
    };

    syncCounts();

    window.addEventListener(STORAGE_UPDATE_EVENT, syncCounts);
    window.addEventListener("storage", syncCounts);

    return () => {
      window.removeEventListener(STORAGE_UPDATE_EVENT, syncCounts);
      window.removeEventListener("storage", syncCounts);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f232c] bg-[#090a0d]/95 backdrop-blur-md">
      <nav className="flex min-h-18 items-center justify-between px-5 sm:px-6 lg:px-7">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
          aria-label="FitLog home"
        >
          <img
            src="/logo.png"
            alt="FitLog"
            className="h-6 w-6 object-contain sm:h-7 sm:w-7"
          />

          <span className="text-base font-extrabold tracking-wide text-white sm:text-lg">
            FITLOG
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
              isHome
                ? "bg-[#b6ff00] text-black"
                : "text-[#9ca3af] hover:bg-[#151820] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
              isPlan
                ? "bg-[#b6ff00] text-black"
                : "text-[#9ca3af] hover:bg-[#151820] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Desktop counters */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-[#9ca3af] transition hover:text-white sm:text-sm"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b6ff00] px-1.5 text-[11px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-[#9ca3af] transition hover:text-white sm:text-sm"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#343a46] px-1.5 text-[11px] text-[#c4c8d0]">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#2a2f39] text-white transition hover:border-[#b6ff00] hover:text-[#b6ff00] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="relative block h-5 w-5">
            <span
              className={`absolute left-0 top-1 block h-0.5 w-5 rounded bg-current transition ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-2.25 block h-0.5 w-5 rounded bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-4.25 block h-0.5 w-5 rounded bg-current transition ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[#1f232c] bg-[#0d0f13] md:hidden">
          <div className="px-5 py-4">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isHome
                    ? "bg-[#b6ff00] text-black"
                    : "text-[#d0d4dc] hover:bg-[#151820] hover:text-white"
                }`}
              >
                Workouts
              </Link>

              <Link
                href="/my-plan"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isPlan
                    ? "bg-[#b6ff00] text-black"
                    : "text-[#d0d4dc] hover:bg-[#151820] hover:text-white"
                }`}
              >
                My Plan
              </Link>

              <Link
                href="/my-plan"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm text-[#d0d4dc] transition hover:bg-[#151820] hover:text-white"
              >
                <span>Plan</span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#b6ff00] px-2 text-xs font-bold text-black">
                  {planCount}
                </span>
              </Link>

              <Link
                href="/my-plan"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm text-[#d0d4dc] transition hover:bg-[#151820] hover:text-white"
              >
                <span>Saved</span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#343a46] px-2 text-xs text-[#c4c8d0]">
                  {savedCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}