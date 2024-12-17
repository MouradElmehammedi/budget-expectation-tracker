"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CurrencyCode, getCurrencySymbol } from "./ui/currency-selector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Expense {
  id: string;
  name: string;
  amount: number;
  frequency: "daily" | "monthly" | "yearly";
}

interface ExpenseFormProps {
  currency: CurrencyCode;
  onExpensesChange: (monthlyTotal: number) => void;
}

export function ExpenseForm({ currency, onExpensesChange }: ExpenseFormProps) {
  const [expenseMode, setExpenseMode] = useState<"total" | "itemized">("total");
  const [totalExpense, setTotalExpense] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "monthly" | "yearly">("monthly");
  
  const currencySymbol = getCurrencySymbol(currency);

  const calculateMonthlyAmount = (amount: number, freq: "daily" | "monthly" | "yearly") => {
    switch (freq) {
      case "daily":
        return amount * 30; // Approximate month
      case "yearly":
        return amount / 12;
      default:
        return amount;
    }
  };

  const formatAmount = (amount: number, freq: "daily" | "monthly" | "yearly") => {
    const monthlyAmount = calculateMonthlyAmount(amount, freq);
    if (monthlyAmount >= 1000) {
      const thousands = monthlyAmount / 1000;  
      return `${currencySymbol} ${monthlyAmount}`;
    }
    return `${currencySymbol} ${monthlyAmount.toFixed(2)}`;
  };

  const handleTotalExpenseChange = (value: string) => {
    setTotalExpense(value);
    const numValue = parseFloat(value) || 0;
    onExpensesChange(numValue);
  };

  const addExpense = ( ) => {
    //e.preventDefault();
    if (!expenseName || !expenseAmount) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      frequency,
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    
    // Calculate new monthly total
    const monthlyTotal = updatedExpenses.reduce((total, expense) => 
      total + calculateMonthlyAmount(expense.amount, expense.frequency), 0
    );
    
    onExpensesChange(monthlyTotal);

    // Reset form
    setExpenseName("");
    setExpenseAmount("");
    setFrequency("monthly");
  };

  const removeExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    
    const monthlyTotal = updatedExpenses.reduce((total, expense) => 
      total + calculateMonthlyAmount(expense.amount, expense.frequency), 0
    );
    
    onExpensesChange(monthlyTotal);
  };

  return (
    <div className="space-y-6">
        
      <div className="rounded-xl border bg-white/50 dark:bg-gray-950/50 p-6 space-y-4">
        <div className="flex items-center gap-2">
            <span className="text-primary">💸</span>
            <h3 className="font-medium">Expenses</h3>
        </div>
        <RadioGroup
          defaultValue="total"
          value={expenseMode}
          onValueChange={(value: "total" | "itemized") => setExpenseMode(value)}
          className="mb-4"
        >
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="total" id="total" />
              <Label htmlFor="total">Enter Total</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="itemized" id="itemized" />
              <Label htmlFor="itemized">Calculate from Items</Label>
            </div>
          </div>
        </RadioGroup>

        {expenseMode === "total" ? (
          <div className="space-y-4">
            <Input
              type="number"
              placeholder={`Total Monthly Expenses (${currencySymbol})`}
              value={totalExpense}
              onChange={(e) => handleTotalExpenseChange(e.target.value)}
              className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0"
              min="0"
              step="0.01"
            />
          </div>
        ) : (
          <>
            <div 
              //onSubmit={addExpense}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input
                  placeholder="Expense name"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0"
                />
                
                <Input
                  type="number"
                  placeholder={`Amount (${currencySymbol})`}
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0"
                  min="0"
                  step="0.01"
                />

                <Select 
                  value={frequency} 
                  onValueChange={(value: "daily" | "monthly" | "yearly") => setFrequency(value)}
                >
                  <SelectTrigger className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="button" 
                onClick={addExpense}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Add Expense
              </Button>
            </div>

            {expenses.length > 0 && (
              <div className="mt-6 space-y-3">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{expense.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatAmount(expense.amount, expense.frequency)} / month
                        <span className="ml-2">
                          ({currencySymbol} {expense.amount.toFixed(2)} {expense.frequency})
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExpense(expense.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total Monthly Expenses:</span>
                    <span>
                      {formatAmount(
                        expenses.reduce(
                          (total, expense) => 
                            total + calculateMonthlyAmount(expense.amount, expense.frequency),
                          0
                        ),
                        "monthly"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 