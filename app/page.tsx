"use client";

import { useEffect, useState } from "react";
import RiskFactorBreakdown from "../components/RiskFactorBreakdown";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const demoSignals: Signal[] = [
  {
    id: 1,
    location: "Zone A",
    category: "Rainfall",
    description: "Increasing rainfall observed in the local area.",
    time: "08:00",
  },
  {
    id: 2,
    location: "Zone A",
    category: "Traffic",
    description: "Traffic congestion is increasing near the main road.",
    time: "09:00",
  },
  {
    id: 3,
    location: "Zone A",
    category: "Waterlogging",
    description: "Water accumulation reported near the road.",
    time: "10:00",
  },
  {
    id: 4,
    location: "Zone A",
    category: "Road Blockage",
    description: "Partial road blockage reported in the affected area.",
    time: "11:00",
  },
];

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

export default function Home() {
  const [risk, setRisk] = useState(0);
  const [signals, setSignals] = useState<Signal[]>([]);

  useEffect(() => {
    const savedSignals: Signal[] = JSON.parse(
      localStorage.getItem("safepulseSignals") || "[]"
    );

    if (savedSignals.length > 0) {
      setSignals(savedSignals);
      setRisk(calculateRisk(savedSignals));
    } else {
      setSignals(demoSignals);
      setRisk(76);
    }
  }, []);

  const status = getRiskStatus(risk);

  const chartData =
    signals.length > 0
      ? signals.map((signal, index) => ({
          time: signal.time,
          risk: calculateRisk(signals.slice(0, index + 1)),
        }))
      : [
          { time: "08:00", risk: 18 },
          { time: "09:00", risk: 32 },
          { time: "10:00", risk: 51 },
          { time: "11:00", risk: 76 },
        ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium tracking-wide text-cyan-400">
            AI-POWERED LOCAL RISK INTELLIGENCE
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            SafePulse AI
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Understand how local risk is developing before it escalates.
          </p>
        </div>
        

        {/* Main Risk Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          

          {/* Current Risk */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:col-span-2">
            <p className="text-sm text-slate-400">
              Current Local Risk
            </p>

            <div className="mt-4 flex flex-wrap items-end gap-4">
              <span className="text-6xl font-bold text-cyan-400">
                {risk}%
              </span>

              <span className="mb-2 rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
                {status}
              </span>
            </div>

            <p className="mt-4 text-slate-400">
              Risk is calculated from multiple local signals and their
              combined pattern.
            </p>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${risk}%` }}
              />
            </div>
          </div>

          {/* Trend */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Risk Trend
            </p>

            <p className="mt-4 text-3xl font-semibold text-orange-400">
              Increasing
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Based on {signals.length} active signals
            </p>
          </div>
        </div>
                

        {/* Risk Factor Breakdown */}
        <section className="mt-8">
          <RiskFactorBreakdown
            totalRisk={risk}
            factors={signals.map((signal) => ({
              name: signal.category,
              value: riskValues[signal.category] ?? 5,
            }))}
          />
        </section>
                {/* Risk Intelligence */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Risk Velocity */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-cyan-400">
              RISK VELOCITY
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {signals.length >= 2 ? "+18 points" : "Stable"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {signals.length >= 2
                ? "Risk is increasing as additional local signals emerge."
                : "Not enough signals to identify a developing trend."}
            </p>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">
                Trend indicator
              </p>

              <p className="mt-1 text-sm font-semibold text-cyan-300">
                {signals.length >= 3 ? "Increasing" : "Monitoring"}
              </p>
            </div>
          </div>

          {/* Top Contributing Factor */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-cyan-400">
              TOP CONTRIBUTING FACTOR
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {signals.length > 0
                ? signals[signals.length - 1].category
                : "None"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Most recent signal contributing to the current local risk.
            </p>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">
                Risk contribution
              </p>

              <p className="mt-1 text-sm font-semibold text-cyan-300">
                +{signals.length > 0
                  ? riskValues[signals[signals.length - 1].category] ?? 5
                  : 0} points
              </p>
            </div>
          </div>

        </section>

                {/* Risk Evolution */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <p className="text-sm font-medium text-cyan-400">
              RISK EVOLUTION
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                />

                <YAxis
                  domain={[0, 100]}
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Active Signals */}
        <section className="mt-8">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-cyan-400">
                SIGNAL MONITORING
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Active Signals
              </h2>
            </div>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-400">
              {signals.length} detected
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {signals.slice(-4).map((signal) => (
              <div
                key={signal.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <p className="text-sm text-cyan-400">
                  {signal.category}
                </p>

                <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                  {signal.description}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  📍 {signal.location}
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  {signal.time}
                </p>
              </div>
            ))}

          </div>
        </section> 
                {/* Early Warning Center */}
        <section className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
              ⚠️
            </div>

            <div>
              <p className="text-sm font-semibold text-amber-400">
                EARLY WARNING
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                {risk >= 76
                  ? "High Attention: Local Risk Escalating"
                  : risk >= 51
                  ? "Developing Local Risk Detected"
                  : risk >= 26
                  ? "Watch: Risk Signals Increasing"
                  : "No Significant Risk Escalation"}
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                {risk >= 51
                  ? "Multiple local signals are developing within the monitored area. Continued human monitoring is recommended."
                  : "Current signals do not indicate a significant developing risk pattern. Continue monitoring local conditions."}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm font-semibold text-cyan-300">
              Monitoring Recommendation
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Verify local conditions and monitor whether additional related
              signals emerge in the same area and time window.
            </p>
          </div>

          <p className="mt-4 text-xs text-slate-600">
            Prototype early-warning support • Human verification remains essential.
          </p>
        </section>

        {/* AI Insight */}
        <section className="mt-8 rounded-2xl border border-cyan-900/50 bg-cyan-950/20 p-6">

          <p className="text-sm font-medium text-cyan-400">
            AI INSIGHT
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Developing Local Risk Pattern
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            Multiple related local signals are increasing within the same
            area and time window. The combined pattern indicates a
            developing local risk that requires continued human monitoring.
          </p>

        </section>

        {/* Prototype Notice */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
          <p className="text-xs text-slate-500">
            Prototype decision-support system • Human monitoring remains essential.
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-600">
          SafePulse AI • Local Risk Evolution Intelligence
        </p>

      </div>
    </main>
  );
}