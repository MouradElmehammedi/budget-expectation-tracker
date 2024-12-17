export type FrequencyType = "day" | "month" | "year";

export interface BudgetData {
  currentBudget: number;
  salary: number;
  salaryFrequency: FrequencyType;
  expenses: number;
  duration: number;
  durationType: FrequencyType;
}

export interface ChartData {
  name: string;
  amount: number;
}