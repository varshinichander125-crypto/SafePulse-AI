"use client";

import { useState } from "react";

const riskValues = {
  Rainfall: 20,
  Traffic: 15,
  Waterlogging: 20,
  "Road Blockage": 15,
  Infrastructure: 10,
};

export default function SimulatorPage() {
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [simulatedRisk, setSimulatedRisk] = useState(18);

  const toggleSignal = (signal: string) => {
    setSelectedSignals((current) =>
      current.includes(signal)
        ? current.filter((item) => item !== signal)
        : [...current, signal]
    );
  };

  const calculateRisk = () => {
    const baseRisk = selectedSignals.reduce(
      (total, signal) =>
        total + riskValues[signal as keyof typeof riskValues],
      18
    );

    const correlationBonus =
      selectedSignals.length >= 2
        ? (selectedSignals.length - 1) * 3
        : 0;

    setSimulatedRisk(Math.min(100, baseRisk + correlationBonus));
  };

  const getStatus = () => {
    if (simulatedRisk <= 25) return "NORMAL";
    if (simulatedRisk <= 50) return "WATCH";
    if (simulatedRisk <= 75) return "DEVELOPING";
    return "HIGH ATTENTION";
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-400">
            SAFEPULSE AI
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            What-If Risk Simulator
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Explore how additional local signals could change the evolving
            risk level of an area.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
              Simulate Additional Signals
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Select signals that could appear in the same local area.
            </p>

            <div className="mt-6 space-y-3">
              {Object.keys(riskValues).map((signal) => {
                const selected = selectedSignals.includes(signal);

                return (
                  <button
                    key={signal}
                    onClick={() => toggleSignal(signal)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                      selected
                        ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                        : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{signal}</span>
                      <span className="text-sm">
                        +{riskValues[signal as keyof typeof riskValues]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={calculateRisk}
              className="mt-6 w-full rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              Simulate Risk Evolution
            </button>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Projected Local Risk
            </p>

            <div className="mt-3 text-6xl font-bold text-cyan-400">
              {simulatedRisk}%
            </div>

            <div className="mt-3 inline-block rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold">
              {getStatus()}
            </div>

            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">
                  Selected signals
                </span>

                <span>
                  {selectedSignals.length}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${simulatedRisk}%` }}
                />
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-950 p-4">
              <p className="text-sm font-semibold text-cyan-300">
                AI Interpretation
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {selectedSignals.length === 0
                  ? "Select additional signals to explore how local risk could evolve."
                  : selectedSignals.length === 1
                  ? "A new signal has been introduced. Monitoring is recommended to identify additional related signals."
                  : "Multiple related signals are now present. Their combination may indicate a developing local risk pattern requiring human monitoring."}
              </p>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Prototype simulation — projected values are illustrative and
              are not official emergency thresholds.
            </p>

          </section>
        </div>
      </div>
    </main>
  );
}