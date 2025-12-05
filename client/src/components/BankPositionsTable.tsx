import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';
import { 
  formatMoney, 
  getCurrencyLabel, 
  type BankAccount, 
  getTotalBalance,
  getTransactionsByBank,
  transactions as allTransactions
} from '@/data/mockData';
import { ChevronDown, ChevronUp, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface BankPositionsTableProps {
  accounts: BankAccount[];
}

export function BankPositionsTable({ accounts }: BankPositionsTableProps) {
  const { currencyMode } = useCurrency();
  const currencyLabel = getCurrencyLabel(currencyMode);
  const totalBalance = getTotalBalance(accounts);
  const [expandedBank, setExpandedBank] = useState<string | null>(null);

  const toggleExpand = (bankId: string) => {
    setExpandedBank(expandedBank === bankId ? null : bankId);
  };

  const renderRows = () => {
    const rows: JSX.Element[] = [];
    
    accounts.forEach((account, index) => {
      const sharePercent = (account.balanceRial / totalBalance) * 100;
      const bankTransactions = getTransactionsByBank(allTransactions, account.id);
      const isExpanded = expandedBank === account.id;
      
      rows.push(
        <tr 
          key={account.id}
          className={`border-b border-border cursor-pointer hover-elevate ${
            index % 2 === 1 ? 'bg-muted/30' : ''
          }`}
          onClick={() => toggleExpand(account.id)}
          data-testid={`row-bank-${account.id}`}
        >
          <td className="py-2 sm:py-3 px-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6"
              data-testid={`button-expand-bank-${account.id}`}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </td>
          <td className="py-2 sm:py-3 px-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${account.logoColor}`} />
              <span className="text-xs sm:text-sm font-medium text-foreground">{account.bankName}</span>
            </div>
          </td>
          <td className="py-2 sm:py-3 px-2 hidden sm:table-cell">
            <span className="text-xs sm:text-sm text-muted-foreground font-mono" dir="ltr">
              {account.accountNumber}
            </span>
          </td>
          <td className="py-2 sm:py-3 px-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
              <span className="text-xs sm:text-sm font-medium text-foreground" data-testid={`text-balance-bank-${account.id}`}>
                {formatMoney(account.balanceRial, currencyMode)}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">{currencyLabel}</span>
            </div>
          </td>
          <td className="py-2 sm:py-3 px-2 hidden md:table-cell">
            {account.blockedRial > 0 ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                <span className="text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400">
                  {formatMoney(account.blockedRial, currencyMode)}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">{currencyLabel}</span>
              </div>
            ) : (
              <span className="text-xs sm:text-sm text-muted-foreground">-</span>
            )}
          </td>
          <td className="py-2 sm:py-3 px-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Progress value={sharePercent} className="h-1.5 sm:h-2 flex-1" />
              <span className="text-[10px] sm:text-xs text-muted-foreground w-8 sm:w-10 text-left" dir="ltr">
                {sharePercent.toFixed(0)}%
              </span>
            </div>
          </td>
        </tr>
      );
      
      if (isExpanded) {
        rows.push(
          <tr key={`${account.id}-details`} className="bg-muted/50">
            <td colSpan={6} className="p-0">
              <div className="p-3 sm:p-4" data-testid={`details-bank-${account.id}`}>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">تراکنش‌های اخیر</div>
                {bankTransactions.length > 0 ? (
                  <div className="space-y-2">
                    {bankTransactions.slice(0, 5).map((tx) => (
                      <div 
                        key={tx.id} 
                        className="flex items-center justify-between gap-2 p-2 bg-card rounded-md border border-border"
                        data-testid={`transaction-row-${tx.id}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-full ${
                            tx.type === 'CREDIT' 
                              ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                              : 'bg-red-100 dark:bg-red-900/30'
                          }`}>
                            {tx.type === 'CREDIT' ? (
                              <ArrowDownLeft className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <ArrowUpRight className="w-3 h-3 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-foreground">{tx.description}</div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground">{tx.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {tx.category}
                          </Badge>
                          <span className={`text-xs sm:text-sm font-medium ${
                            tx.type === 'CREDIT' 
                              ? 'text-emerald-600 dark:text-emerald-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`} data-testid={`text-amount-tx-${tx.id}`}>
                            {tx.type === 'CREDIT' ? '+' : '-'}
                            {formatMoney(tx.amountRial, currencyMode)} {currencyLabel}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm text-muted-foreground text-center py-4">
                    تراکنشی ثبت نشده است
                  </div>
                )}
              </div>
            </td>
          </tr>
        );
      }
    });
    
    return rows;
  };

  return (
    <Card className="border border-card-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg font-semibold">موقعیت بانک‌ها</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full min-w-[500px]" data-testid="table-bank-positions">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-2 sm:py-3 px-2 w-8"></th>
                <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-2 sm:py-3 px-2">بانک</th>
                <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-2 sm:py-3 px-2 hidden sm:table-cell">شماره حساب</th>
                <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-2 sm:py-3 px-2">موجودی</th>
                <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-2 sm:py-3 px-2 hidden md:table-cell">مبلغ مسدود</th>
                <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-2 sm:py-3 px-2 min-w-[100px] sm:min-w-[150px]">سهم از کل</th>
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
