import type { BudgetData, ChartData, FrequencyType } from "./types";

const DAYS_IN_MONTH = 30.44;
const MONTHS_IN_YEAR = 12;

function convertToDaily(amount: number, frequency: FrequencyType): number {
  switch (frequency) {
    case "day":
      return amount;
    case "month":
      return amount / DAYS_IN_MONTH;
    case "year":
      return amount / (DAYS_IN_MONTH * MONTHS_IN_YEAR);
  }
}

function convertDurationToDays(duration: number, type: FrequencyType): number {
  switch (type) {
    case "day":
      return duration;
    case "month":
      return duration * DAYS_IN_MONTH;
    case "year":
      return duration * DAYS_IN_MONTH * MONTHS_IN_YEAR;
  }
}

export function calculateExpectedBudget(data: BudgetData): number {
  const dailySalary = convertToDaily(data.salary, data.salaryFrequency);
  const dailyExpenses = convertToDaily(data.expenses, "month");
  const durationInDays = convertDurationToDays(data.duration, data.durationType);

  return (
    data.currentBudget +
    (dailySalary - dailyExpenses) * durationInDays
  );
}

export function generateChartData(data: BudgetData): ChartData[] {
  const dailySalary = convertToDaily(data.salary, data.salaryFrequency);
  const dailyExpenses = convertToDaily(data.expenses, "month");
  const durationInDays = convertDurationToDays(data.duration, data.durationType);
  const points = Math.min(12, durationInDays);
  const interval = durationInDays / points;

  return Array.from({ length: points + 1 }, (_, i) => {
    const days = i * interval;
    return {
      name: `${Math.round(days)} days`,
      amount: data.currentBudget + (dailySalary - dailyExpenses) * days,
    };
  });
}