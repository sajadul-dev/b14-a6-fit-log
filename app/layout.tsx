import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense workout library and workout planning companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <div className="min-h-screen w-full bg-[#090a0d]">
          <Navbar />
          {children}
        </div>

        <Toaster
  position="top-right"
  theme="dark"
  duration={1800}
  closeButton
  toastOptions={{
    style: {
      background: "#111318",
      color: "#f5f7fa",
      border: "1px solid #2a2f39",
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
      fontSize: "13px",
      fontWeight: "600",
    },
  }}
/>
      </body>
    </html>
  );
}