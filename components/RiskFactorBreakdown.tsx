"use client";

import { useEffect, useState } from "react";

type RiskFactor = {
  name: string;
  value: number;
};

type RiskFactorBreakdownProps = {
  factors: RiskFactor[];
  totalRisk: number;
};

export default function RiskFactorBreakdown({
  factors,
  totalRisk,
}: RiskFactorBreakdownProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold text-cyan-400">
          RISK FACTOR BREAKDOWN
        </p>

        <h2 className="mt-1 text-xl font-bold text-white">
          Why is the risk {totalRisk}%?
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Key signals contributing to the current local risk level.
        </p>
      </div>

      <div className="space-y-4">
        {factors.length === 0 ? (
          <p className="text-sm text-slate-500">
            No active signals available.
          </p>
        ) : (
          factors.map((factor, index) => (
            <div key={`${factor.name}-${index}`}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  {factor.name}
                </span>

                <span className="text-sm font-semibold text-cyan-400">
                  +{factor.value}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{
                    width: `${Math.min(factor.value * 5, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-300">
            Current Local Risk
          </span>

          <span className="text-2xl font-bold text-cyan-400">
            {totalRisk}%
          </span>
        </div>
      </div>
    </section>
  );
}