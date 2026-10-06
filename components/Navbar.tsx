"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Report", path: "/report" },
  { name: "Analysis", path: "/analysis" },
  { name: "Map", path: "/map" },
  { name: "History", path: "/history" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="text-xl font-bold text-cyan-400">
          SafePulse AI
        </Link>

        <div className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}