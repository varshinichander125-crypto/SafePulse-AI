"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("./MapView"),
  { ssr: false }
);

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <p className="text-sm font-medium text-cyan-400">
          SAFEPULSE AI
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Local Risk Map
        </h1>

        <p className="mt-2 text-slate-400">
          Visualize developing risk across monitored local zones.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
          <MapView />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            🟢 <span className="text-slate-300">Normal</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            🟡 <span className="text-slate-300">Watch</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            🟠 <span className="text-slate-300">Developing</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            🔴 <span className="text-slate-300">High Attention</span>
          </div>

        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Prototype visualization • Risk zones are illustrative.
        </p>

      </div>

    </main>
  );
}