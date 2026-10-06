"use client";

import { useState } from "react";

const riskValues: Record<string, number> = {
  Rainfall: 20,
  Waterlogging: 20,
  Traffic: 15,
  "Road Blockage": 15,
  Infrastructure: 10,
  Other: 5,
};

type Signal = {
  id: number;
  location: string;
  category: string;
  description: string;
  time: string;
};

function calculateRisk(signals: Signal[]) {
  const baseScore = signals.reduce(
    (total, signal) => total + (riskValues[signal.category] ?? 5),
    0
  );

  const uniqueCategories = new Set(
    signals.map((signal) => signal.category)
  ).size;

  const correlationBonus =
    uniqueCategories >= 2 ? (uniqueCategories - 1) * 2 : 0;

  return Math.min(100, baseScore + correlationBonus);
}

function getRiskStatus(score: number) {
  if (score <= 25) return "NORMAL";
  if (score <= 50) return "WATCH";
  if (score <= 75) return "DEVELOPING";
  return "HIGH ATTENTION";
}

export default function ReportPage() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Waterlogging");
  const [description, setDescription] = useState("");
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!location || !description) {
      setMessage("Please fill all required fields.");
      return;
    }

    const oldSignals: Signal[] = JSON.parse(
      localStorage.getItem("safepulseSignals") || "[]"
    );

    const newSignal: Signal = {
      id: Date.now(),
      location,
      category,
      description,
      time: new Date().toLocaleTimeString(),
    };

    const updatedSignals = [...oldSignals, newSignal];

    const newRisk = calculateRisk(updatedSignals);

    localStorage.setItem(
      "safepulseSignals",
      JSON.stringify(updatedSignals)
    );

    localStorage.setItem(
      "safepulseRisk",
      String(newRisk)
    );

    setRiskScore(newRisk);
    setMessage("Signal analyzed and risk pattern updated!");

    setDescription("");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">

        <p className="text-sm font-medium text-cyan-400">
          SAFEPULSE AI
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Report a Local Signal
        </h1>

        <p className="mt-2 text-slate-400">
          Submit a local observation to help identify developing risk patterns.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <label className="text-sm text-slate-300">
            Location
          </label>

          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
          />

          <label className="mt-6 block text-sm text-slate-300">
            Signal Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option>Waterlogging</option>
            <option>Road Blockage</option>
            <option>Traffic</option>
            <option>Infrastructure</option>
            <option>Rainfall</option>
            <option>Other</option>
          </select>

          <label className="mt-6 block text-sm text-slate-300">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Describe what you observed..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Analyze Signal
          </button>

          {message && (
            <div className="mt-5 rounded-xl border border-cyan-900 bg-cyan-950/30 p-4 text-center text-cyan-300">
              {message}
            </div>
          )}

          {riskScore !== null && (
            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-6 text-center">

              <p className="text-sm text-slate-400">
                UPDATED LOCAL RISK SCORE
              </p>

              <p className="mt-2 text-6xl font-bold text-cyan-400">
                {riskScore}%
              </p>

              <p className="mt-3 text-lg font-semibold">
                {getRiskStatus(riskScore)}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Risk is calculated from combined local signals.
              </p>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}