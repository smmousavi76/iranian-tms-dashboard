import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatMoney, getCurrencyLabel, type Transaction } from '@/data/mockData';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const { currencyMode } = useCurrency();
  const currencyLabel = getCurrencyLabel(currencyMode);

  return (
    <Card className="border border-card-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg font-semibold">تراکنش‌های اخیر</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="space-y-2 sm:space-y-3">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between gap-2 sm:gap-4 p-2 sm:p-3 rounded-md bg-muted/30 border border-border"
              data-testid={`row-transaction-${transaction.id}`}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className={`p-1.5 sm:p-2 rounded-full shrink-0 ${
                  transaction.type === 'CREDIT' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                    : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {transaction.type === 'CREDIT' ? (
                    <ArrowDownLeft className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                    {transaction.description}
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 flex-wrap">
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{transaction.date}</span>
                    <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 py-0">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-left shrink-0">
                <div className="flex flex-col items-end">
                  <span className={`text-xs sm:text-sm font-bold ${
                    transaction.type === 'CREDIT' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'CREDIT' ? '+' : '-'}
                    {formatMoney(transaction.amountRial, currencyMode)}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{currencyLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
