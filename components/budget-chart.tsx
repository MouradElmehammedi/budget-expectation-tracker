"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BudgetData, ChartData } from "@/lib/types";
import { generateChartData } from "@/lib/calculations";
import { CurrencyCode, getCurrencySymbol } from "./ui/currency-selector";

interface BudgetChartProps {
  data: BudgetData;
  currency: CurrencyCode;
}

export function BudgetChart({ data, currency }: BudgetChartProps) {
  const chartData = useMemo(() => generateChartData(data), [data]);
  const currencySymbol = getCurrencySymbol(currency);

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      const thousands = value / 1000;
      // If it's a whole number after division, don't show decimals
      const formatted = Number.isInteger(thousands) 
        ? thousands.toString() 
        : thousands.toFixed(1);
      return `${currencySymbol} ${formatted}K`;
    }
    return `${currencySymbol} ${value.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-primary">📈</span>
        <h2 className="text-2xl font-semibold">Budget Progression</h2>
      </div>

      <div className="rounded-xl border bg-white/50 dark:bg-gray-950/50 py-6 pr-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis 
                dataKey="name"
                className="text-sm"
              />
              <YAxis
                tickFormatter={formatCurrency}
                width={80}
                className="text-sm"
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}