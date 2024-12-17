import { CircleDollarSign } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { CurrencySelector, type CurrencyCode } from "./currency-selector";

interface HeaderProps {
  onCurrencyChange: (currency: CurrencyCode) => void;
}

export function Header({ onCurrencyChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <CircleDollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="text-xl font-bold hidden sm:inline-block bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
                Budget Expectation Tracker
              </span>
              <span className="text-xl font-bold sm:hidden bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
                Budget Tracker
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/50 dark:bg-gray-950/50 rounded-lg">
              <CurrencySelector onCurrencyChange={onCurrencyChange} />
            </div>
            <div className="bg-white/50 dark:bg-gray-950/50 rounded-lg">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 