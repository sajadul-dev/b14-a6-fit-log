"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isPlan = pathname.startsWith("/my-plan");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f232c] bg-[#090a0d]/95 backdrop-blur-md">
      <nav className="mx-auto flex min-h-18 max-w-350 items-center justify-between px-5 sm:px-7 lg:px-8">
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
            className="h-7 w-7 object-contain"
          />

          <span className="text-[18px] font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isHome
                ? "bg-[#b6ff00] text-black"
                : "text-[#9ca3af] hover:bg-[#151820] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isPlan
                ? "bg-[#b6ff00] text-black"
                : "text-[#9ca3af] hover:bg-[#151820] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Desktop Status */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/my-plan"
            className="group flex items-center gap-2 text-sm text-[#9ca3af] transition hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b6ff00] px-1.5 text-[11px] font-bold text-black">
              0
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="group flex items-center gap-2 text-sm text-[#9ca3af] transition hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#343a46] px-1.5 text-[11px] text-[#c4c8d0]">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#2a2f39] text-white transition hover:border-[#b6ff00] hover:text-[#b6ff00] md:hidden"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[#1f232c] bg-[#0d0f13] md:hidden">
          <div className="mx-auto max-w-350 px-5 py-4">
            <div className="flex flex-col gap-2">
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
                  0
                </span>
              </Link>

              <Link
                href="/my-plan"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm text-[#d0d4dc] transition hover:bg-[#151820] hover:text-white"
              >
                <span>Saved</span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#343a46] px-2 text-xs text-[#c4c8d0]">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}