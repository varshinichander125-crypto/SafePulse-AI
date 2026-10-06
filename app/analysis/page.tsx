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

function generateInsight(signals: Signal[]) {
  if (signals.length === 0) {
    return "No local signals have been reported yet. SafePulse AI is waiting for observations to identify a developing risk pattern.";
  }

  const categories = signals.map((signal) => signal.category);

  if (signals.length >= 3) {
    return `Multiple local signals including ${categories
      .slice(0, 3)
      .join(", ")} are being observed. Their combined pattern indicates increasing local risk and requires continued human monitoring.`;
  }

  if (signals.length === 2) {
    return `Two related local signals, ${categories[0]} and ${categories[1]}, are being observed together. This combination suggests a developing risk pattern.`;
  }

  return `A ${categories[0]} signal has been reported. Additional observations will help SafePulse AI determine whether the local risk is developing.`;
}

export default function AnalysisPage() {
  const [signals, setSignals] = useState<Signal[]>([]);

  useEffect(() => {
    const savedSignals: Signal[] = JSON.parse(
      localStorage.getItem("safepulseSignals") || "[]"
    );

    setSignals(savedSignals);
  }, []);

  const currentRisk =
    signals.length > 0 ? calculateRisk(signals) : 76;

  const status = getRiskStatus(currentRisk);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <p className="text-sm font-medium text-cyan-400">
          SAFEPULSE AI
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          AI Risk Analysis
        </h1>

        <p className="mt-2 text-slate-400">
          Understand why local risk is developing.
        </p>

        {/* Summary */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Current Risk
            </p>

            <p className="mt-2 text-4xl font-bold text-cyan-400">
              {currentRisk}%
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {status}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Risk Trend
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-400">
              {signals.length >= 2 ? "Increasing" : "Monitoring"}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Based on reported signals
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Active Signals
            </p>

            <p className="mt-2 text-4xl font-bold">
              {signals.length}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Local observations analyzed
            </p>
          </div>

        </div>

        {/* Contributing Signals */}
        <section className="mt-8">

          <h2 className="text-2xl font-semibold">
            Contributing Signals
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">

            {signals.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:col-span-2">
                <p className="text-slate-400">
                  No signals available for analysis.
                </p>
              </div>
            ) : (
              signals.map((signal) => (
                <div
                  key={signal.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-lg font-semibold">
                        {signal.category}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {signal.description}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        📍 {signal.location}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="text-2xl font-bold text-cyan-400">
                        +{riskValues[signal.category] ?? 5}%
                      </p>

                      <p className="text-xs text-slate-500">
                        Contribution
                      </p>

                    </div>

                  </div>

                </div>
              ))
            )}

          </div>

        </section>

        {/* AI Insight */}
        <section className="mt-8 rounded-2xl border border-cyan-800/50 bg-cyan-950/20 p-6">

          <p className="text-sm font-medium text-cyan-400">
            AI INSIGHT
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Developing Local Risk Pattern
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            {generateInsight(signals)}
          </p>

        </section>

        {/* Monitoring */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            Recommended Monitoring
          </h2>

          <ul className="mt-4 space-y-3 text-slate-300">

            <li>
              • Continue monitoring new local observations.
            </li>

            <li>
              • Check whether multiple signals are developing in the same area.
            </li>

            <li>
              • Review the risk trend before taking further action.
            </li>

            <li>
              • Keep a human decision-maker in the monitoring loop.
            </li>

          </ul>

        </section>

        <p className="mt-8 text-center text-sm text-slate-600">
          Prototype AI analysis • Human monitoring remains essential.
        </p>

      </div>
    </main>
  );
}