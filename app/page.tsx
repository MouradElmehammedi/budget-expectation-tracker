"use client";

import { Card } from "@/components/ui/card";
import { BudgetForm } from "@/components/budget-form";
import { BudgetSummary } from "@/components/budget-summary";
import { BudgetChart } from "@/components/budget-chart";
import { Header } from "@/components/ui/header";
import { useState } from "react";
import type { BudgetData } from "@/lib/types";
import type { CurrencyCode } from "@/components/ui/currency-selector";

export default function Home() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [currency, setCurrency] = useState<CurrencyCode>("MAD");

  return (
    <>
      <Header onCurrencyChange={setCurrency} />
      <main className="container mx-auto px-4 min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto py-12 animate-fade-in">
          <div className="grid gap-10 lg:grid-cols-2">
            <section className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Create Budget Plan
                </h2>
                <p className="text-muted-foreground text-lg">
                  Enter your budget details to get started with financial planning
                </p>
              </div>
              <Card className="glass-panel">
                <div className="p-6 sm:p-8">
                  <BudgetForm onSubmit={setBudgetData} currency={currency} />
                </div>
              </Card>
            </section>

            {budgetData && (
              <section className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Budget Analysis
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Detailed breakdown of your budget allocation
                  </p>
                </div>
                <div className="grid gap-6">
                  <Card className="glass-panel">
                    <div className="p-6 sm:p-8">
                      <BudgetSummary data={budgetData} currency={currency} />
                    </div>
                  </Card>
                  <Card className="glass-panel">
                    <div className="p-6 sm:p-8">
                      <BudgetChart data={budgetData} currency={currency} />
                    </div>
                  </Card>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}