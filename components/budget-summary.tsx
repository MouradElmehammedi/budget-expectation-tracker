"use client";

import { Card } from "@/components/ui/card";
import type { BudgetData } from "@/lib/types";
import { calculateExpectedBudget } from "@/lib/calculations";
import { CurrencyCode, getCurrencySymbol } from "./ui/currency-selector";

interface BudgetSummaryProps {
  data: BudgetData;
  currency: CurrencyCode;
}

export function BudgetSummary({ data, currency }: BudgetSummaryProps) {
  const expectedBudget = calculateExpectedBudget(data);
  const currencySymbol = getCurrencySymbol(currency);
  const formatCurrency = (amount: number) =>
    `${amount.toLocaleString()} ${currencySymbol}`;

  // Calculate monthly values
  const getMonthlyIncome = () => {
    switch (data.salaryFrequency) {
      case "day": return data.salary * 30;
      case "month": return data.salary;
      case "year": return data.salary / 12;
    }
  };

  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = data.expenses;
  const monthlySavings = monthlyIncome - monthlyExpenses;
  const savingsRate = (monthlySavings / monthlyIncome) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-primary">📊</span>
        <h2 className="text-2xl font-semibold">Budget Summary</h2>
        <div className="flex items-center gap-2 ml-auto">
            <p className="text-sm text-muted-foreground ">Duration</p>
            <p className="text-lg font-semibold">
              {data.duration} {data.durationType}(s)
            </p>
          </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white/50 dark:bg-gray-950/50 p-6">
          <p className="text-sm text-muted-foreground mb-2">Current Budget</p>
          <p className="text-2xl font-bold">{formatCurrency(data.currentBudget)}</p>
        </div>
        <div className="rounded-xl border bg-white/50 dark:bg-gray-950/50 p-6">
          <p className="text-sm text-muted-foreground mb-2">Expected Budget</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(expectedBudget)}</p>
        </div>
      </div>

      {/* New Savings Section */}
      <div className="rounded-xl border bg-white/50 dark:bg-gray-950/50 p-6">
        <h3 className="text-sm font-medium mb-4">Monthly Overview</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Income</p>
            <p className="text-lg font-semibold">{formatCurrency(monthlyIncome)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Expenses</p>
            <p className="text-lg font-semibold">{formatCurrency(monthlyExpenses)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Savings</p>
            <p className={`text-lg font-semibold ${monthlySavings >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatCurrency(monthlySavings)}
              <span className="text-sm font-normal ml-1 text-muted-foreground">
                ({savingsRate.toFixed(1)}%)
              </span>
            </p>
          </div>
        </div>
      </div>

       
    </div>
  );
}