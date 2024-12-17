"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BudgetData } from "@/lib/types";
import { CurrencyCode, getCurrencySymbol } from "@/components/ui/currency-selector";
import { ExpenseForm } from "@/components/expense-form";

const formSchema = z.object({
  currentBudget: z.number().min(0, "Budget must be a positive number").nullable(),
  salary: z.number().min(0, "Salary must be a positive number").nullable(),
  salaryFrequency: z.enum(["day", "month", "year"]),
  expenses: z.number().min(0, "Expenses must be a positive number").nullable(),
  duration: z.number().min(1, "Duration must be at least 1"),
  durationType: z.enum(["day", "month", "year"]),
}).transform((data) => ({
  ...data,
  currentBudget: data.currentBudget ?? 0,
  salary: data.salary ?? 0,
  expenses: data.expenses ?? 0,
}));

interface BudgetFormProps {
  onSubmit: (data: BudgetData) => void;
  currency: CurrencyCode;
}

export function BudgetForm({ onSubmit, currency }: BudgetFormProps) {
  const form = useForm<BudgetData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentBudget: undefined,
      salary: undefined,
      salaryFrequency: "month",
      expenses: undefined,
      duration: 1,
      durationType: "month",
    },
  });

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="currentBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <span className="text-primary">💰</span>
                Current Budget
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-xl border bg-white/50 dark:bg-gray-950/50 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-primary">📊</span>
            <h3 className="font-medium">Income Details</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salaryFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0">
                        <SelectValue placeholder="Monthly" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="day">Daily</SelectItem>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="expenses"
          render={({ field }) => (
            <FormItem>
               
              <ExpenseForm 
                currency={currency}
                onExpensesChange={(total) => field.onChange(total)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-xl border bg-white/50 dark:bg-gray-950/50 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-primary">📅</span>
            <h3 className="font-medium">Duration</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0"
                      placeholder="1"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="durationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 bg-blue-100/50 dark:bg-blue-950/20 rounded-lg border-0">
                        <SelectValue placeholder="Months" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="day">Days</SelectItem>
                      <SelectItem value="month">Months</SelectItem>
                      <SelectItem value="year">Years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg text-base font-medium"
        >
          Calculate Budget Expectation
        </Button>
      </form>
    </Form>
  );
}