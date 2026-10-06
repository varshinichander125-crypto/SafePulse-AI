"use client";

import { useEffect, useState } from "react";

type Signal = {
  id: number;
  location: string;
  category: string;
  description: string;
  time: string;
};

const riskValues: Record<string, number> = {
  Rainfall: 20,
  Waterlogging: 20,
  Traffic: 15,
  "Road Blockage": 15,
  Infrastructure: 10,
  Other: 5,
};

function calculateRisk(signals: Signal[]) {
  const baseScore = signals.reduce(
    (total, signal) =>
      total + (riskValues[signal.category] ?? 5),
    0
  );

  const uniqueCategories = new Set(
    signals.map((signal) => signal.category)
  ).size;

  const correlationBonus =
    uniqueCategories >= 2
      ? (uniqueCategories - 1) * 2
      : 0;

  return Math.min(100, baseScore + correlationBonus);
}

function getRiskStatus(score: number) {
  if (score <= 25) return "NORMAL";
  if (score <= 50) return "WATCH";
  if (score <= 75) return "DEVELOPING";
  return "HIGH ATTENTION";
}

export default function HistoryPage() {
  const [signals, setSignals] = useState<Signal[]>([]);

  useEffect(() => {
    const savedSignals: Signal[] = JSON.parse(
      localStorage.getItem("safepulseSignals") || "[]"
    );

    setSignals(savedSignals);
  }, []);

  const currentRisk =
    signals.length > 0 ? calculateRisk(signals) : 0;

  const peakRisk = currentRisk;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <p className="text-sm font-medium text-cyan-400">
          SAFEPULSE AI
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Risk History
        </h1>

        <p className="mt-2 text-slate-400">
          Review how local risk has evolved from reported signals.
        </p>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Current Risk
            </p>

            <p className="mt-2 text-4xl font-bold text-cyan-400">
              {currentRisk}%
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {getRiskStatus(currentRisk)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Total Signals
            </p>

            <p className="mt-2 text-4xl font-bold">
              {signals.length}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Local observations analyzed
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Peak Risk
            </p>

            <p className="mt-2 text-4xl font-bold text-red-400">
              {peakRisk}%
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Highest calculated risk
            </p>
          </div>

        </div>

        {/* Risk Evolution */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            Risk Evolution
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Signals contributing to the developing local risk pattern.
          </p>

          {signals.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-700 p-8 text-center">
              <p className="text-slate-400">
                No signals reported yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">

              {signals.map((signal, index) => {
                const risk = calculateRisk(
                  signals.slice(0, index + 1)
                );

                return (
                  <div
                    key={signal.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                  >

                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

                      <div>
                        <p className="text-sm text-slate-500">
                          {signal.time}
                        </p>

                        <h3 className="mt-1 font-semibold">
                          {signal.category}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {signal.description}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          📍 {signal.location}
                        </p>
                      </div>

                      <div className="text-left md:text-right">

                        <p className="text-3xl font-bold text-cyan-400">
                          {risk}%
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {getRiskStatus(risk)}
                        </p>

                      </div>

                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">

                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{
                          width: `${risk}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

        {/* AI Interpretation */}
        <section className="mt-8 rounded-2xl border border-cyan-900/50 bg-cyan-950/20 p-6">

          <p className="text-sm font-medium text-cyan-400">
            AI INSIGHT
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Risk Pattern Interpretation
          </h2>

          <p className="mt-3 leading-7 text-slate-300">
            {signals.length >= 2
              ? "Multiple local signals are being observed in the monitored area. Their combination indicates a developing risk pattern that requires continued human monitoring."
              : "SafePulse AI is waiting for additional local signals to identify a developing risk pattern."}
          </p>

        </section>

        <p className="mt-8 text-center text-sm text-slate-600">
          Prototype history visualization • Risk values are calculated from reported signals.
        </p>

      </div>
    </main>
  );
}