import { useCurrency } from '@/contexts/CurrencyContext';
import { 
  formatMoney, 
  getCurrencyLabel, 
  getAvailableLiquidity, 
  getTotalDueToday, 
  getTotalOverdue,
  getNetCurrencyPosition,
  getCurrentJalaliDate,
  getJalaliWeekday,
  type BankAccount,
  type DueDebt,
  type CurrencyPosition
} from '@/data/mockData';
import { Wallet, AlertTriangle, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface EnhancedKPIBarProps {
  accounts: BankAccount[];
  dueDebts: DueDebt[];
  currencyPositions: CurrencyPosition[];
}

export function EnhancedKPIBar({ accounts, dueDebts, currencyPositions }: EnhancedKPIBarProps) {
  const { currencyMode } = useCurrency();
  const currencyLabel = getCurrencyLabel(currencyMode);
  
  const availableLiquidity = getAvailableLiquidity(accounts);
  const dueToday = getTotalDueToday(dueDebts);
  const overdue = getTotalOverdue(dueDebts);
  const netCurrencyPosition = getNetCurrencyPosition(currencyPositions);
  const isLongPosition = netCurrencyPosition >= 0;

  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{getJalaliWeekday()}</span>
          <span className="text-sm font-medium text-foreground">{getCurrentJalaliDate()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">نقدینگی در دسترس</span>
          </div>
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-300" data-testid="text-available-liquidity">
              {formatMoney(availableLiquidity, currencyMode)}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">{currencyLabel}</span>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-700 dark:text-amber-300">سررسید امروز</span>
          </div>
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-lg sm:text-xl font-bold text-amber-700 dark:text-amber-300" data-testid="text-due-today">
              {formatMoney(dueToday, currencyMode)}
            </span>
            <span className="text-xs text-amber-600 dark:text-amber-400">{currencyLabel}</span>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-xs sm:text-sm text-red-700 dark:text-red-300">سررسید گذشته</span>
          </div>
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-300" data-testid="text-overdue">
              {formatMoney(overdue, currencyMode)}
            </span>
            <span className="text-xs text-red-600 dark:text-red-400">{currencyLabel}</span>
          </div>
        </div>

        <div className={`${isLongPosition ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' : 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800'} border rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-2">
            {isLongPosition ? (
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            )}
            <span className={`text-xs sm:text-sm ${isLongPosition ? 'text-blue-700 dark:text-blue-300' : 'text-purple-700 dark:text-purple-300'}`}>
              موقعیت ارزی ({isLongPosition ? 'Long' : 'Short'})
            </span>
          </div>
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className={`text-lg sm:text-xl font-bold ${isLongPosition ? 'text-blue-700 dark:text-blue-300' : 'text-purple-700 dark:text-purple-300'}`} data-testid="text-currency-position">
              {formatMoney(Math.abs(netCurrencyPosition), currencyMode)}
            </span>
            <span className={`text-xs ${isLongPosition ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`}>{currencyLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
